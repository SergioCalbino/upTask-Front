import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert";
import axios from "axios";
import clienteAxios from "../config/clienteAxios";


const OlvidePassword = () => {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});
    const [isValidEmail, setIsValidEmail] = useState(true)

    //Uso una Regex para validar
    
    const recoveryPassword = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsValidEmail(emailRegex.test(email))
        
        if (email === '') {
            setAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return
        }

        if (!isValidEmail) {
            setAlerta({
                msg: 'El email ingresado no es valido',
                error: true
            })
            return
        }

        try {
           const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
                email
            })
            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        recoveryPassword()
       
    }

    const { msg } = alerta

  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize " >Recupera tu acceso y no pierdas tus 
            <span className="text-slate-700"> {''}Proyectos</span>
        </h1>
        {
            msg && <Alert
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

            <input
                type="submit"
                value='Enviar Instrucciones'
                className="bg-sky-600 mb-5 rounded py-5 w-full text-white uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
            
        </form>
        <nav className="lg:flex lg:justify-between" >
            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to='/'
            >
                Inicia Sesión
            </Link>
            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to='registrar'
            >
                ¿No tienes una cuenta? Regístrate
            </Link>
        </nav>
        </>
  )
}

export default OlvidePassword