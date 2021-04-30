var axios = require('axios');
module.exports = async (lat,long,key) => (await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${key}&no_annotations=1&language=en`)).data.results[0].formatted

