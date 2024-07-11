import React, { Component } from 'react';
import  ChatBot  from "react-simple-chatbot";
import { ThemeProvider } from 'styled-components';

const theme = {
    background: '#f5f8fb',
    headerBgColor: '#eb3449',
    headerFontColor: '#fff',
    headerFontSize: '20px',
    botBubbleColor: '#eb3449',
    botFontColor: '#fff',
    userBubbleColor: '#0cb3c9',
    userFontColor: '#fff',
}

class ChatRoboPits extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <ChatBot 
                    steps={[
                        {
                            id: "1",
                            message: "Hola, mi nombre es RoboPits, ¿Cuál es tu nombre?",
                            trigger: "2"
                        },
                        {
                            id: "2",
                            user: true,
                            validator: (value) => {
                                if (/^[A-Z]{1}[a-z]{2,15}$/.test(value)) {
                                    return true;
                                }
                                else {
                                    return 'Porfavor, inserta un nombre válido.';
                                }
                            },
                            trigger: "3"
                        },
                        {
                            id: "3",
                            message: "¡Hola! {previousValue}, será un placer ayudarte :)",
                            trigger: "4"
                        },
                        {
                            id: "4",
                            message: "¿Necesitas algo de mí?",
                            trigger: "5"
                        },
                        {
                            id: "5",
                            options: [
                                {value: "y", label: "Yes", trigger: "6A"},
                                {value: "n", label: "No", trigger: "6B"},
                            ]
                        },
                        {
                            id: "6A",
                            message: "¡Excelente! Dime que estas buscando...",
                            trigger: "seleccion"
                        },
                        {
                            id: "6B",
                            message: "Lo siento si no puedo serte de ayuda. Hasta luego",
                            end: true
                        },
                        {
                            id: "seleccion",
                            options: [
                                {value: "f", label: "Dónde puedo pasar a recoger mi pedido?", trigger: "7A"},
                                {value: "b", label: "Dónde se ubican?", trigger: "7B"},
                                {value: "z", label: "¿Cómo puedo contactarlos?", trigger: "7C"},
                                {value: "y", label: "¿Venden piezas por mayoreo?", trigger: "7D"},
                                {value: "x", label: "Cuál es su horario de servicio?", trigger: "7X"},
                            ]
                        },
                        {
                            id: "7A",
                            message: "Hacemos entregas en el centro de Huejutla y Parque de Poblamiento.",
                            trigger: "9"
                        },
                        {
                            id: "7B",
                            message: "C. Morelos 442, Centro, 43000 Huejutla, Hgo",
                            trigger: "9"
                        },
                        {
                            id: "7C",
                            message: 
                            <ul>
                                <li>Email: Robopits@gmail.com</li>
                                <li>WhatsApp: +52 7713926338 
                                    <br/> 
                                    +52 7711322841
                                </li>
                                <li>Facebook: roboPits</li>
                            </ul>,
                            trigger: "9"
                        },
                        {
                            id: "7D",
                            message: "Disculpa... Por el momento solo manejamos menudeo",
                            trigger: "9"
                        },
                        {
                            id: "7X",
                            message: "Todos los días de 9am-1pm y de 2pm-7pm, Domingo sin servicio :)",
                            trigger: "9"
                        },
                        {
                            id: "9",
                            message: "¿Necesitas saber algo más?",
                            trigger: "respuestaVuelta",
                        }, 
                        {
                            id: "respuestaVuelta",
                            options: [
                                {value: "y", label: "Sí", trigger: "6A"},
                                {value: "n", label: "No", trigger: "6B"},
                            ],
                        }
                    ]}
                />
            </ThemeProvider>
        )
    }
}

export default ChatRoboPits;