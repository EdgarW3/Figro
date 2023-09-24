/**
 * Este archivo esteblece comunicación con Twilio
 */
import twilio from 'twilio'
import DialogFlowCommunicator from './DialogFlowCommunicator.js'

const MessagingResponse = twilio.twiml.MessagingResponse

/**
 * Esta clase contiene funciones para comunicarse con Twilio
 */
class TwilioCommunicator {
    
    /**
     * Esta clase responde los mensajes que hayan sido enviados desde Whatsapp a Twilio
     * @param {*} req 
     * @param {*} res 
     */
    static async respondMessage(req, res) {

        const twiml = new MessagingResponse();        
        // Access the message body and the number it was sent from.
        let numberId = req.body.From
        let message = req.body.Body
        let messageResponse = ''

        let responses = await DialogFlowCommunicator.sendMessageToDialogFlowChatbot(numberId, message)
        console.log(`Incoming message from ${numberId}: ${message}`);

        let i = 0
        for (const message of responses) {
            if (message.text) {
                if (i > 0) 
                    messageResponse += '\n'
                messageResponse += message.text.text 
              console.log(`Agent Response: ${message.text.text}`)
            }
            i++;
          }
        twiml.message(messageResponse);
    
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }
}

export default TwilioCommunicator