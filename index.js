// imports requerido
import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config.js'
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// imports de features
//import WhatsappBot from './server/controller/WhatsappBot.js'
import TwilioCommunicator from './server/controller/TwilioCommunicator.js'
import ChatbotLogic from './server/controller/ChatbotLogic.js'

// declaracion de variables y constantes
const PORT = process.env.PORT || 3000

// endpoint webhook para comunicación de Twilio con Whatsapp
app.post('/twilio/webhook', TwilioCommunicator.respondMessage)

// endpoints de los webhooks para DialogFlow

app.post('/dialogflow/confirmarCredito', express.json(), ChatbotLogic.confirmarCredito)

app.post('/dialogflow/enviarCredito', express.json(), ChatbotLogic.enviarCredito)

app.post('/dialogflow/consultarCredito', express.json(), ChatbotLogic.consultarCredito)

app.listen(PORT,() => { 
    console.log(`Server running on http://localhost:${PORT}`)


})