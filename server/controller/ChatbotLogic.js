/**
 * Este archivo contiene la funcionalidad del Chatbot
 */
//import ExternalServices from '../external_api/ExternalServices.js'

/**
 * Esta clase contiene las funciones que contienen la logica de los webhooks
 * que consume Dialogflow
 */
class ChatbotLogic {

    /**
     * Esta función verifica que los datos ingresados sean correctos
     * @param {*} req 
     * @param {*} res 
     */
        static async confirmarCredito(req, res) {

            const webhookRequest = req.body
            const session = webhookRequest.sessionInfo.session
            const datos=webhookRequest.text.split("\n")
            console.log(webhookRequest)
            const webhookResponse = {
                fulfillment_response: {
                    messages: [
                        {
                            text: {
                                text: [
                                `Perfecto, \n*Nombre ✍️:* ${datos[0]}\n*Dirección🏡:* ${datos[1]}\n*RFC 📄:* ${datos[2]}\n*Nombre de la empresa 🏢:* ${datos[4]}\n*Dirección de la empresa*📍:${datos[5]}\n*Estimación de ingreso anual💰:* $${datos[6]}\n*Cantidad que deseas solicitar💵:* $${datos[7]}\n¿Es correcto?`]
                            }
                        }
                    ]
                }
            }

            return res.json(webhookResponse)
        }

        /**
     * Esta función crea el registro en el sistema de que se creo una solicitud de credito
     * @param {*} req 
     * @param {*} res 
     */
        static async enviarCredito(req, res) {

            const webhookRequest = req.body
            const session = webhookRequest.sessionInfo.session
            const datos=webhookRequest.text.split("\n")
            console.log(webhookRequest)
            const webhookResponse = {
                fulfillment_response: {
                    messages: [
                        {
                            text: {
                                text: [`¡Perfecto! Hemos recopilado toda la información necesaria para tu solicitud de crédito con Figro. Nuestro equipo de expertos la revisará cuidadosamente y se comunicará contigo una vez que tengamos una respuesta en un plazo de 1 a 3 días hábiles. ¡Gracias por confiar en nosotros! 🌱🚜\n\n¿Hay algo mas que pueda hacer por ti?`]
                            }
                        }
                    ]
                }
            }

            return res.json(webhookResponse)
        }

        /**
         * Esta función verifica que el número de teléfono esté tenga un credito registrado en el sistema
         * @param {*} req 
         * @param {*} res 
         */
        static async consultarCredito(req, res) {

            const webhookRequest = req.body
            const session = webhookRequest.sessionInfo.session

            let telefonoUsuario = session.slice(-10, session.length)
            const creditoActivo=true //Consultar a API

            let text;

            if(creditoActivo)
                text="¡Encontré tu crédito activo!\n\nAquí tienes los detalles:\n*Cantidad total del préstamo:* $138,000 💵\n*Cantidad pendiente de pago:* $20,000 📉\n*Plazo de pago:* 12 meses 📆\n\n¿Hay algo mas que pueda hacer por ti?"
            else
                text="Lo siento, pero no encontré ningún crédito activo vinculado a tu número de teléfono 📱. Si consideras que esto es un error o necesitas más información, ¡házmelo saber!"

            console.log(webhookRequest)
            const webhookResponse = {
                fulfillment_response: {
                    messages: [
                        {
                            text: {
                                text: [text]}
                        }
                    ]
                }
            }

            return res.json(webhookResponse)
        }




}

export default ChatbotLogic