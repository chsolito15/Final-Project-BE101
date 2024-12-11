const express = require('express')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const path = require('path')
const app = express();

const itemRoute = require('./server/routes/inventoryRoutes')

app.engine('ejs', ejsMate)

app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use('/', itemRoute)

app.listen('3005',()=>{
    console.log("Servering on port 3005...")
})