// Biblioteca
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

// CSS
import '../assets/css/Root.css'

// images
import successIMG from '../assets/images/success.png'
import errorIMG from '../assets/images/error.png'
import loadingIMG from '../assets/images/loading.gif'

export default function Root(){

    const navigate = useNavigate()

    const [infoboxMSG, setInfobox] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW'])

    useEffect(() => {
        if (cookies['Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW']){
            removeCookie('Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW', {path: '/'})
        }
    }, [])

    const login = async () => {
        // setCookie('Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW', {id:1}, {path: '/'})
        // const cookieValue = cookies['Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW']; 
        // alert(`Cookie: ${JSON.stringify(cookieValue)}`);

        const matricula = document.querySelector('#matricula').value
        const senha = document.querySelector('#senha').value

        try {
            const response = await axios.get('http://localhost:5500/api/login/', 
            {
                params:{
                    "matricula": matricula,
                    "senha": senha
                },
                headers: {
                    "x-api-key": 'CYBER022',
                    'Content-Type': 'application/json'
                },
            },
            
            )

            setCookie('Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW', {id: matricula, nome: response.data['nome'], type: response.data['accountType']})

            if (response.data.accountType == 2){
                navigate('/receber')
            } else {
                navigate('/envio')
            }
        } catch (error) {
            if (error.response.data){
                setInfobox(() => {
                    return(
                        <div className="infobox">
                    
                            <div className="infobox-content">
                                <img src={errorIMG} alt="" />
                                <h1>{error.response.data.mensagem}</h1>
                                <button onClick={(event) => {
                                    setInfobox()
                                }}>Continuar</button>
                            </div>
                        
                        </div>
                    )
                })
            }
        }
    }
    
    return (
        <section id="Login">

            {infoboxMSG}
            
            <img src="/logo.png" className="logo"/>

            <main>

                <section className="login-container">

                    <h2>Login</h2>

                    <form onSubmit={(event) => {
                        event.preventDefault();
                        login()

                    }}> 

                        <label htmlFor="matricula">Matrícula:</label>
                        <input type="text" id="matricula" name="matricula" autoComplete='off' required/>
                        
                        <label htmlFor="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" autoComplete='off' required/>
                        
                        <button type="submit">Login</button>

                    </form>
                    

                    <div className="forgot-password">

                        <a onClick={() =>{
                            navigate('/senha')
                        }}> Esqueceu sua senha? </a>
                        
                    </div>

                    
                    <div id="error-message" className="error-message"></div>

                    <p className="register-link"> <a onClick={() =>{
                            navigate('/cadastro')
                        }}> Ainda não tem uma conta? </a></p>

                </section>

            </main>

            
        </section>
    )
}