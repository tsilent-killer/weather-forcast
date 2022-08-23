const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aditya Sharma'
    })
})


//Weather end point
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'provide a location'
        })
    }
    else{ 
        geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
            if(error)
                return res.send({error})
            forcast(latitude,longitude,(error,forcast_data)=>{
                if(error)
                    return res.send({error})
                //console.log(location)
                //console.log('Forcast: ',forcast_data)
                res.send({
                    forecast: forcast_data,location,
                    //location: 'Imphal'
                    address: location
                })
            })
        }) 
    }

    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aditya Sharma',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port+'.')
})