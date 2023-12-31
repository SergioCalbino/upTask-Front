import {useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import Alert from "../components/Alert";
import clienteAxios from "../config/clienteAxios";



const ConfirmarCuenta = () => {

  const params = useParams()  
  const { id } = params;
  
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/usuarios/confirmar/${id}`;
                const { data } = await clienteAxios(url)
                
                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setCuentaConfirmada(true)
                
            } catch (error) {
                setAlerta({ 
                    msg: error.response.data.msg, 
                    error: true
                })
                setCuentaConfirmada(false)
            }
        };
    confirmarCuenta()
    
  }, [])
  
  const { msg } = alerta
  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize " >Confirma tu cuenta y comienza a crear tus 
                <span className="text-slate-700"> {''}Proyectos</span>
        </h1>
        <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white "  >
            { msg && <Alert
                        alerta={alerta}
            /> 
            }

            { cuentaConfirmada && (
                <Link className="block text-center my-5  uppercase text-sm"
                    to='/'
            >
                Inicia Sesión
            </Link>
            ) }
        </div>

       
        
        
    </>
  )
}

export default ConfirmarCuenta