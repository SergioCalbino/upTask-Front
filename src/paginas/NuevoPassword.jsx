import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Alert from "../components/Alert";
import clienteAxios from "../config/clienteAxios";



const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false)
    const [alerta, setAlerta] = useState({});
    
    const { token } = useParams();

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios.get(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    }, []);
    
    
    const reestablece = async () => {
        try {
            const { data} = await clienteAxios.post(`/usuarios/olvide-password/${token}`,{
                password
            })
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true)
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setAlerta({
                msg: 'El password es muy corto, debe tener minimo 6 caracteres',
                error: true
        })
            return
        }
        reestablece()
    }
    
    const { msg } = alerta
  return (
    <>
		<h1 className="text-sky-600 font-black text-6xl capitalize " >Reestablece tu Password y no Pierdas acceso a tus 
            <span className="text-slate-700"> {''}Proyectos</span>
        </h1>
        {
            msg && <Alert
                    alerta={alerta}
            />
        }
        
        {
            tokenValido && (
            <form 
                onSubmit={handleSubmit}
                className="my-10 bg-white shadow rounded p-10">
        
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="password"
                    >
                        Nuevo Password</label>
                    <input
                        id='password'
                        type="password"
                        placeholder="Escribe tu nuevo Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                

                <input
                    type="submit"
                    value='Guardar Nuevo Password'
                    className="bg-sky-600 mb-5 rounded py-5 w-full text-white uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
            
        </form>
            )}
        { passwordModificado && (
            <Link
                className="block text-center my-5  uppercase text-sm"
                to='/'
            >
                Inicia Sesión
            </Link>
            )}
    </>
  )
}

export default NuevoPassword