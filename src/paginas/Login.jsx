import { Link, useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios";
import Alert from "../components/Alert";
import { useState } from "react";
import useAuth from "../hooks/useAuth";



const Login = () => {

    const { setAuth } = useAuth()
   
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    

    const loginUser = async () => {
        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
        })
        return
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', {
                email,
                password
            })
            setAlerta({})
            localStorage.setItem('token', data.token);
            console.log(data);
            setAuth(data)
            navigate('/proyectos')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser()
    }

    const { msg } = alerta

  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize " >Inicia Sesion y Administra tus 
            <span className="text-slate-700"> {''}Proyectos</span>
        </h1>

        { msg && <Alert
                    alerta={alerta}
                /> 
        
        }
        <form
            onSubmit={handleSubmit} 
            className="my-10 bg-white shadow rounded p-10">
            <div className="my-5" >
                <label className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                >
                    Email</label>
                <input
                    id='email'
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password"
                >
                    Password</label>
                <input
                    id='password'
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <input
                type="submit"
                value='Iniciar Sesion'
                className="bg-sky-600 mb-5 rounded py-5 w-full text-white uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
            
        </form>
        <nav className="lg:flex lg:justify-between" >
            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to='registrar'
            >
                ¿No tienes una cuenta? Regístrate
            </Link>
            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to='olvide-password'
            >
                Olvide mi Password
            </Link>
        </nav>
    </>
  )
}

export default Login