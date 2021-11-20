const { nextISSTimesForMyLocation, fetchISSFlyOverTimes, fetchMyIP, fetchCoordsByIP } = require('./iss');


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    console.log(datetime)
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`); 
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error); 
  }
  printPassTimes(passTimes); 
});

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  console.log(passTimes); 
  return passTimes;
})

const myCoordinates = { latitude: '49.2663', longitude: '-122.8739'};

fetchISSFlyOverTimes(myCoordinates, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error); 
    return; 
  }
  console.log("It worked! Returned pass-times: ", passTimes)
})

fetchCoordsByIP('24.85.138.56', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error); 
    return; 
  }
  console.log("It worked! Returned coordinates: ", coordinates)
})

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});