import express, {json} from 'express'
import { Liquid } from 'liquidjs'


const apiKlassen = 'https://api.frd-delta.nl/klassen.json'
const apiStatistieken = 'https://api.frd-delta.nl/statistieken.json'


// fetched de data beide api's
const klassenResponse = await fetch(apiKlassen)
const statistiekenResponse = await fetch(apiStatistieken)

const klassenData = await klassenResponse.json()
const statistiekenData = await statistiekenResponse.json()

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// liquid als template
const engine = new Liquid()
app.engine('liquid', engine.express())
app.set('views', './views')
app.set('view engine', 'liquid')


// get route 
app.get('/', async function (req, res) {
    const klassenRes = await fetch(apiKlassen);
    const statistiekenRes = await fetch(apiStatistieken);
  
    const klassenJson = await klassenRes.json();
    const statistiekenJSON = await statistiekenRes.json();
  
    res.render('index.liquid', {
      klassen: klassenJson,
      statistieken: statistiekenJSON
    });
  });
  


app.listen(3000, () => {
    console.log('De server draait op: http://localhost:3000');
})