
// Bibliotecas
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

// CSS
import '../assets/css/Envio.css'

// Images
import documento from '../assets/images/documento.png'
import successIMG from '../assets/images/success.png'
import errorIMG from '../assets/images/error.png'
import loadingIMG from '../assets/images/loading.gif'


export default function Envio() {

    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW'])
    const [infoboxMSG, setInfobox] = useState()
    const [recents, setDocuments] = useState([])

    useEffect(() => {
        if (!cookies['Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW'] || cookies['Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW']['type'] === 2){
            return navigate('/')
        }

        const carregar = async function() {
            try {
                const result = await axios.get('http://localhost:5500/api/send/', {
                    params: {
                        "author": cookies['Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW']['id']
                    },

                    headers: {
                        "x-api-key": "CYBER022"
                    }
                })
                
                setDocuments(result.data.arquivos)
                // console.log(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        carregar()
        console.log(recents)

    }, [])
    return (

        <section id="Envio">

            {infoboxMSG}

            <header>
                <h1>Envios e Andamentos</h1>
                <div className="header-content">
                    <nav>
                        <ul>
                            <li><a href="https://www.uninassau.edu.br" target="_blank">Uninassau</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <section id="envio">
                    <h2>Enviar Documento</h2>
                    <form onSubmit={async (event) => {
                        event.preventDefault();

                        let arquivo = document.querySelector('#documento').files[0].name

                        console.log(arquivo)
                        try {
                            const result = await axios.post('http://localhost:5500/api/send/', {
                                "author": cookies['Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW']['id'],
                                "authorname": cookies['Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW']['nome'],
                                "filename": arquivo
                            },
                            {
                                headers: {
                                    "x-api-key": 'CYBER022',
                                    'Content-Type': 'application/json'
                                }
                            })

                            navigate(0)
                        } catch (error) {
                            console.log(error)
                        }
                    }}>
                        
                        <label htmlFor="documento">Selecione o Documento</label>
                        <input type="file" id="documento" name="documento" required/>

                        <button type="submit">Enviar</button>
                    </form>
                </section>
                <section id="enviados">
                    <div className="enviados-title">
                        <h1>Documentos enviados recentemente</h1>
                    </div>

                    <div className="envidos-container">

                    {recents && recents.map((item) => (
                        <div className="enviado-box" key={item.id}>
                            <div className="file-content">
                                <img src={documento} alt="" />
                                {item.status === 2 ? (
                                    <h1><span>{item.filename}</span><br /><span className='comentario' onClick={() => {
                                        setInfobox(() => {
                                            return(
                                                <div className="infobox">
                                            
                                                    <div className="infobox-content">
                                                        <h1 style={{color: "#000000"}}>{item.comment}</h1>
                                                        <button onClick={(event) => {
                                                            setInfobox()
                                                        }}>Continuar</button>
                                                    </div>
                                                    
                                                
                                                </div>
                                            )
                                        })
                                    }}>Ver comentário</span></h1>
                                ) : (
                                    <h1><span>{item.filename}</span></h1>
                                )}
                                {/* <h1><span>{item.filename}</span></h1> */}
                            </div>

                            <div className="file-status">
                                {/* <img src={loadingIMG} alt="Aguardando" />
                                <h1>Pendente</h1> */}

                                    {item.status === 0 ? (
                                        <img src={loadingIMG} alt="Aguardando" />
                                    ) : item.status === 1 ? (
                                        <img src={successIMG} alt="Aceito" />
                                    ) : (
                                        <img src={errorIMG} alt="Erro" />
                                    )}

                                    {item.status === 0 ? (
                                        <h1>Pendente</h1>
                                    ) : item.status === 1 ? (
                                        <h1>Aceito</h1>
                                    ) : (
                                        <h1>Negado</h1>
                                    )}

                                    
                            </div>
                        </div>
                    ))}


                        {/* <div className="enviado-box">
                            
                            <div className="file-content">
                                <img src={documento} alt="" />
                                <h1><span>Planilha</span></h1>
                            </div>

                            <div className="file-status">
                                <img src={loadingIMG} alt="Aguardando" />
                                <h1>Pendente</h1>
                            </div>

                        </div>

                        <div className="enviado-box">
                            
                            <div className="file-content">
                                <img src={documento} alt="" />
                                <h1><span>Trabalho robótica</span></h1>
                            </div>

                            <div className="file-status">
                                <img src={successIMG} alt="Aceito" />
                                <h1>Aceito</h1>
                            </div>

                        </div> */}
                    </div>
                </section>
            </main>

        </section>

    )
}