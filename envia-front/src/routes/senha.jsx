// Biblioteca
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// CSS
import '../assets/css/Cadastro.css'

// images
import success from '../assets/images/success.png'
import loading from '../assets/images/loading.gif'
import error from '../assets/images/error.png'
import axios from 'axios'

export default function Senha(){

    const navigate = useNavigate()
    const [infoboxMSG, setInfobox] = useState()

    const recuperar = async function(){
        
        let matricula = document.querySelector('#matricula').value
        let email = document.querySelector('#email').value
        let senha = document.querySelector('#senha').value
        
        setInfobox(() => {
            return (
                <>
                    <div className="infobox">
                
                        <div className="infobox-content">
                            <img src={loading} alt="" />
                            <h1>Aguarde...</h1>
                        </div>

                    </div>
                </>
            )
        })

        setTimeout(async () => {
            try {
                const result = await axios.patch('http://localhost:5500/api/login/',
                
                {
                    "matricula": matricula,
                    "email": email,
                    "senha": senha
                },   
                {
                    headers: {
                        "x-api-key": 'CYBER022',
                        'Content-Type': 'application/json'
                    }
                })
    
                setInfobox(() => {
                    return(
                        <div className="infobox">
                    
                            <div className="infobox-content">
                                <img src={success} alt="" />
                                <h1>Senha alterada com sucesso <br /> Realize seu login</h1>
                                <button onClick={(event) => {
                                    setInfobox()
                                    navigate('/')
                                }}>Continuar</button>
                            </div>
                        
                        </div>
                    )
                })
    
            } catch(err) {
                if (err.response.data){
                    setInfobox(() => {
                        return(
                            <div className="infobox">
                        
                                <div className="infobox-content">
                                    <img src={error} alt="" />
                                    <h1>{err.response.data.mensagem}</h1>
                                    <button onClick={(event) => {
                                        setInfobox()
                                    }}>Continuar</button>
                                </div>
                            
                            </div>
                        )
                    })
                }else{
                    console.log('erro ', err)
                }
            }
        }, 1000)

    }
    
    return (
        <section id="Cadastro">

            {/* <div className="infobox">
                
                <div className="infobox-content">
                    <img src={loading} alt="" />
                    <h1>Cadastro realizado com sucesso</h1>
                    <button>Continuar</button>
                </div>
            
            </div> */}

            {infoboxMSG}
            
            <center>
                <img src="/logo.png" className="logo"/>

                    <main>
                        <section className="cadastro-container">
                            <h2>Recuperar Conta</h2>

                            <form onSubmit={(event) =>{
                                event.preventDefault()
                                recuperar()
                            }}>
                                <label htmlFor="matricula">Matricula:</label>
                                <input type="text" id="matricula" name="matricula" required/>

                                <label htmlFor="email">E-mail:</label>
                                <input type="email" id="email" name="email" required/>

                                <label htmlFor="senha">Nova senha:</label>
                                <input type="senha" id="senha" name="senha" autoComplete="off" required/>

                                <button type="submit">Cadastrar</button>
                            </form>

                            <p className="login-link"><a onClick={() => {
                                navigate('/')
                            }}>Voltar</a></p>
                        </section>
                    </main>
                </center>

        </section>
    )
}