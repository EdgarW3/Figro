/**
 * Este archivo se conecta a DialogFlow CX para establecer comunicación
 */
const projectId = 'figroagentes-bqlj'
const location = 'us-central1'
const agentId = 'ab5410c8-6546-4bec-bee0-d3a011711f17' // BOLETOS
const languageCode = 'es'

// Imports the Google Cloud Some API library
import {SessionsClient} from '@google-cloud/dialogflow-cx'
const client = new SessionsClient({apiEndpoint: 'us-central1-dialogflow.googleapis.com'})

/**
 * Esta clase contiene las funciones para comunicarse con el chatbot en DialogFlow CX
 */
class DialogFlowCommunicator {
  
  /**
   * Esta función envia el mensaje al chatbot de DialogFlow y regresa la respuesta del bot
   * @param {*} sessionNumber Es el número de télefono del usuario que se usará para generar el sessionId
   * @param {*} query Mensaje que se consulta al intent del chat
   */
  static async sendMessageToDialogFlowChatbot(sessionNumber, query) {
    // const sessionId = Math.random().toString(36).substring(7);
    const sessionId = sessionNumber
    const sessionPath = client.projectLocationAgentSessionPath(
      projectId,
      location,
      agentId,
      sessionId
    )
    console.info(sessionPath)
  
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
        },
        languageCode,
      },
    }
    // Haciendo la petición para detectar el intent y obtener respuesta
    const [response] = await client.detectIntent(request);
    console.log(`User Query: ${query}`)
    
    if (response.queryResult.match.intent) {
      console.log(
        `Matched Intent: ${response.queryResult.match.intent.displayName}`
      )
    }
    console.log(
      `Current Page: ${response.queryResult.currentPage.displayName}`
    )

    return response.queryResult.responseMessages        
  }

}

export default DialogFlowCommunicator