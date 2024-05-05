import React, { useState } from 'react'
import { useMutate } from '../../hooks'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()
  const [ identifier, setIdentifier ] = useState('')
  const [ password, setPassword ] = useState('')
  const login = useMutate<{ token: string }>()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    await login.mutate({
      endpoint: 'user/login',
      data: { identifier, password },
      method: 'POST'
    })

    if (login.status === 'SUCCESS' && login.data?.token){
      console.log('has been successful')
      localStorage.setItem('token', login.data.token)
      navigate('/admin')
    }
  }

  return (
    <div className="login-container">
      <h1>Inicie sesión en el sistema de gestión</h1>
      <div className="login-box">
        <form id="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            placeholder="Nombre de usuario"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" id="submitLogin" title="Enviar" style={{ alignSelf: 'center' }} />
        </form>
      </div>
      <a href="/register.html">No tenes cuenta? crea una aca</a>
      {login.status === 'ERROR' && <p id="stateText">{'Ocurrio un error al ingresar el usuario'}</p>}
    </div>
  )
}