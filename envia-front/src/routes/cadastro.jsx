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

export default function Cadastro(){

    const navigate = useNavigate()
    const [infoboxMSG, setInfobox] = useState()

    const registrar = async function(){
        
        let nome = document.querySelector('#nome').value
        let sobrenome = document.querySelector('#sobrenome').value
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
                const result = await axios.post('http://localhost:5500/api/login/',
                
                {
                    "nome": `${nome + ' ' + sobrenome}`,
                    "email": `${email}`,
                    "senha": `${senha}`
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
                                <h1>Cadastro realizado com sucesso <br /> Sua matricula: {result.data.insertId}</h1>
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
                            <h2>Cadastro</h2>

                            <form onSubmit={(event) =>{
                                event.preventDefault()
                                registrar()
                            }}>
                                <label htmlFor="nome">Nome:</label>
                                <input type="text" id="nome" name="nome" required/>

                                <label htmlFor="sobrenome">Sobrenome:</label>
                                <input type="text" id="sobrenome" name="sobrenome" required/>

                                <label htmlFor="email">E-mail:</label>
                                <input type="email" id="email" name="email" required/>

                                <label htmlFor="senha">Senha:</label>
                                <input type="senha" id="senha" name="senha" autoComplete="off" required/>

                                <button type="submit">Cadastrar</button>
                            </form>

                            <p className="login-link">Já tem uma conta? <a onClick={() => {
                                navigate('/')
                            }}>Faça login</a></p>
                        </section>
                    </main>
                </center>

        </section>
    )
}