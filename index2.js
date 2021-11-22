const { nextISSTimesForMyLocation } = require('./iss_promised'); 

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passtimes);
  })
  .catch((error) => {
    console.log("it didn't work: ", error.message);
  }); 
  