const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude }); 
    //console.log({ latitude, longitude } )

  });

};
    
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching pass-times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
    console.log(passes);
  })
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    
  fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      
  fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error,null);
        }
        
      callback(null, nextPasses); 
      });
    });
  });
}

module.exports = { 
  nextISSTimesForMyLocation,
  fetchISSFlyOverTimes,
  fetchMyIP,
  fetchCoordsByIP
};

