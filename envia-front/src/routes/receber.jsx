// Bibliotecas
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

// CSS
import '../assets/css/Receber.css'

// Images
import documento from '../assets/images/documento.png'
import successIMG from '../assets/images/success.png'
import errorIMG from '../assets/images/error.png'
import loadingIMG from '../assets/images/loading.gif'

export default function Receber(){

    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW'])
    const [recents, setDocuments] = useState([])
    const [chatbox, setChatBox] = useState()

    useEffect(() => {
        if (!cookies['Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW'] || cookies['Um1QkW1ci8kMYXerwcxeZwlQQIFRSjWpPOTWwFbjGXUx6y3FOBcgdgsOIyKBfrIW']['type'] === 1){
            return navigate('/')
        }

        const carregar = async function() {
            try {
                const result = await axios.get('http://localhost:5500/api/send/', {
                    headers: {
                        "x-api-key": "CYBER022"
                    }
                })
                
                setDocuments(result.data.arquivos)
            } catch (error) {
                console.log(error)
            }
        }
        carregar()
        console.log(recents)

    }, [])

    return(
        <section id="documento">
            {/* <div className="chatbox">
                <form>
                    <h1>Digite o motivo de o arquivo ser recusado</h1>
                    <input type="text" name="chatbox" id="chatbox" placeholder='Digite aqui' required/>
                    <input type="submit" value="Enviar" />
                </form>
            </div> */}

            {chatbox}
            <header>
                <h1>Administração de Documentos</h1>
            </header>
            <main>
                <button id="trash-btn" className="comment-btn" onClick={() => {
                    const trashList = document.getElementById('trash-list');
                    const trashBtn = document.getElementById('trash-btn');
                    trashList.style.display = trashList.style.display === 'none' ? 'block' : 'none';
                    trashBtn.textContent = trashList.style.display === 'block' ? 'Fechar Lixeira' : 'Lixeira';
                }}>Lixeira</button>
                <div className="container">
                    <section className="document-list">
                        <h2>Documentos Recebidos</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome do Aluno</th>
                                    <th>Documento</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            {recents && recents.map((item) => (
                                item.status === 0 ? (
                                    <tr key={item.id}>
                                        <td>{item.authorname}</td>
                                        <td><a href='' target='_blank'>{item.filename}</a></td>
                                        <td>
                                            <form onSubmit={(event) => {
                                                event.preventDefault()
                                            }}>
                                                <input type='hidden' name='id' value=''/>
                                                <button type='btn' name='acao' value='aceitar' className='accept-btn'
                                                    onClick={async () => {
                                                        try {
                                                            const result = await axios.patch('http://localhost:5500/api/send/', {
                                                                "id": item.id,
	                                                            "status": 1
                                                            },
                                                            {
                                                                headers: {
                                                                    "x-api-key": "CYBER022"
                                                                }
                                                            })

                                                            navigate(0)
                                                        } catch (error) {
                                                            console.log(error)
                                                        }
                                                    }}
                                                >Aceitar</button>
                                                <button type='btn' name='acao' value='rejeitar' className='reject-btn'
                                                    onClick={() => {
                                                        console.log('Recusado')

                                                        setChatBox(() => {
                                                            return (
                                                                <div className="chatbox">
                                                                    <form onSubmit={async (event) => {
                                                                        event.preventDefault()

                                                                        try {
                                                                            const result = await axios.patch('http://localhost:5500/api/send/', {
                                                                                "id": item.id,
                                                                                "status": 2,
                                                                                "comment": document.querySelector('#chatbox').value
                                                                            },
                                                                            {
                                                                                headers: {
                                                                                    "x-api-key": "CYBER022"
                                                                                }
                                                                            })

                                                                            navigate(0)
                                                                        } catch (error) {
                                                                            console.log(error)
                                                                        }
                                                                    }}>
                                                                        <h1>Digite o motivo de o arquivo ser recusado</h1>
                                                                        <input type="text" name="chatbox" id="chatbox" placeholder='Digite aqui' required/>
                                                                        <input type="submit" value="Enviar" />
                                                                        <button style={{marginTop: '20px'}} onClick={() => {
                                                                            setChatBox()
                                                                        }}>Fechar</button>
                                                                    </form>
                                                                </div>
                                                            )
                                                        })
                                                    }}
                                                >Rejeitar</button>
                                            </form>
                                        </td>
                                    </tr>
                                ) : item.status === 1 ? (
                                    <tr key={item.id}>
                                        <td>{item.authorname}</td>
                                        <td><a href='' target='_blank'>{item.filename}</a></td>
                                        <td>
                                            <form method='post' action='processa_documentos.php'>
                                                <input type='hidden' name='id' value=''/>
                                                <img className='statusIMG' src={successIMG} alt="" />
                                            </form>
                                        </td>
                                    </tr>
                                ) : null
                            ))}
                            </tbody>
                        </table>
                            
                    </section>

                    <section className="trash-list" id="trash-list" style={{display: 'none'}}>
                        <h2>Documentos Rejeitados</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome do Aluno</th>
                                    <th>Documento</th>
                                </tr>
                            </thead>
                            {/* <tbody>
                                <?php
                                $conn = new mysqli('localhost', 'root', '', 'enviafacil');
                                $sql = "SELECT nome_aluno, arquivo FROM documentos WHERE status = 'rejeitado'";
                                $result = $conn->query($sql);

                                if ($result->num_rows > 0) {
                                    while ($row = $result->fetch_assoc()) {
                                        echo "<tr>
                                            <td>{$row['nome_aluno']}</td>
                                            <td><a href='uploads/{$row['arquivo']}' target='_blank'>Visualizar Documento</a></td>
                                        </tr>";
                                    }
                                } else {
                                    echo "<tr><td colspan='2'>Nenhum documento rejeitado.</td></tr>";
                                }

                                $conn->close();
                                ?>
                            </tbody> */}

                            <tbody>
                                {recents && recents.map((item) => (
                                    item.status === 2 ? (
                                        <tr key={item.id}>
                                            <td>{item.authorname}</td>
                                            <td><a href='' target='_blank'>{item.filename}</a></td>
                                        </tr>
                                    ) : null
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </main>
        </section>
    )
}