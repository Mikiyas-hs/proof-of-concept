import fs from 'fs/promises'
import path from 'path'
import express, {json} from 'express'
import { Liquid } from 'liquidjs'

const dataPath = path.join(process.cwd(), 'data', 'messages.json')


const apiKlassen = 'https://api.frd-delta.nl/klassen.json'
const apiStatistieken = 'https://api.frd-delta.nl/statistieken.json'


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
  const klassenRes = await fetch(apiKlassen)
  const statistiekenRes = await fetch(apiStatistieken)

  const klassenJson = await klassenRes.json()
  const statistiekenJSON = await statistiekenRes.json()

  const fileData = await fs.readFile(dataPath, 'utf8')
  const localMessages = JSON.parse(fileData)

  res.render('index.liquid', {
    klassen: klassenJson,
    statistieken: statistiekenJSON,
    messages: localMessages    
  })
})

  app.post('/:klasId', async function (req, res) {
    const klasId = req.params.klasId
    const { from, content } = req.body
  
    const newMessage = {
      klas: klasId,
      from,
      content,
      timestamp: new Date().toISOString()
    }
  
    let existingMessages = []
    try {
      const file = await fs.readFile(dataPath, 'utf8')
      existingMessages = JSON.parse(file)
    } catch {
      existingMessages = []
    }
  
    existingMessages.push(newMessage)
    await fs.writeFile(dataPath, JSON.stringify(existingMessages, null, 2))
  
    res.redirect(303, '/')
  })
    
  
app.listen(3000, () => {
    console.log('De server draait op: http://localhost:3000');
})