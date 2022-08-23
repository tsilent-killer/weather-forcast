const request = require('request')

const geocode = (address,callback) => {
   const url = 'http://api.positionstack.com/v1/forward?access_key=be8ca573f43fe413dee2b565df178144&query='+address+'&limit=1'
   
   request({url: url,json:true}, (error,{body} = {})=>{ 
        if(error){
            callback('Unable to connect to locaion services!',undefined)
        }else if(body.data.length === 0){
            callback('Unable to find location, try another search!',undefined)
        }else{
            callback(undefined,
                {latitude:body.data[0].latitude,
                 longitude:body.data[0].longitude,
                 location:body.data[0].name})
        }
   }) 
}

const forcast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a51694ece9650c3c4a90dee847f7cc9e&query='+latitude+','+longitude+'&limit=1'
 
    request({url: url,json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to locaion services!',undefined)
        }else if(body.error){
            callback('Unable to find location, try another search!',undefined)
        }else{
            callback(undefined,'The temperature at '+body.location.region+' is '+body.current.temperature+' and it feels like '+body.current.feelslike+', the overall weather description is '+body.current.weather_descriptions+'.')
        }
    }) 
}

function weather_forcast(address){
    if (!address) {
         return console.log('Please provide an address')
    } else {
        geocode(address, (error, { latitude, longitude, location }) => {
            if (error) {
                return console.log(error)
            }
    
            forcast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                }
                console.log((forecastData))
                console.log((location))
                //alert(location);
                //alert(forecastData)
            })
  
        })
    }
}


module.exports = weather_forcast