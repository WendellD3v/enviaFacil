import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'

import Root from './routes/root.jsx';
import Cadastro from './routes/cadastro.jsx';
import Envio from './routes/envio.jsx';
import Receber from './routes/receber.jsx';
import Senha from './routes/senha.jsx';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // errorElement: <ErrorPage />
  },

  {
    path: '/cadastro',
    element: <Cadastro />
  },

  {
    path: '/envio',
    element: <Envio />
  },

  {
    path: '/receber',
    element: <Receber />
  },

  {
    path: '/senha',
    element: <Senha />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
