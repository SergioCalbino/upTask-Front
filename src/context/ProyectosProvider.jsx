import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";




const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
      const obtenerProyectos = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios('/proyectos', config);
            setProyectos(data);

        } catch (error) {
            console.log(error);
            
        }
      }
      obtenerProyectos()
      
    }, [])
    

   

    const mostrarAlerta = (alerta) => {
        setAlerta(alerta);

        setTimeout(() => {
            setAlerta({})
        }, 5000);

    };

    const submitProyecto = async (proyecto) => {
       if (proyecto.idForm) {
            await editarProyecto(proyecto)
       } else {
            await nuevoProyecto(proyecto)
       }
       
       
    };

    const editarProyecto = async (proyecto) => {
        console.log(proyecto);
           try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return
                };

                const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
                const { data } = await clienteAxios.put(`/proyectos/${proyecto.idForm}`, proyecto, config)
                
                //Sincronizar el state
                const proyectosActualizados = proyectos.map(proyetoState => proyetoState._id === data._id ? data : proyetoState)
                console.log(proyectosActualizados);
                setProyectos(proyectosActualizados)
                //Mostar la alerta
                setAlerta({
                    msg: 'Proyecto Actualizado correctamente',
                    error: false
                });
                //Redireccionar
                setTimeout(() => {
                    setAlerta({})
                    navigate('/proyectos')
                }, 3000);
           } catch (error) {
                console.log(error);
           }
    };

    const nuevoProyecto = async (proyecto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios.post('/proyectos', proyecto, config);

            setProyectos([...proyectos, data])

            setAlerta({
                msg: 'Proyecto creado correctamente',
                error: false
            });

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            
        }
    }


    const obtenerProyecto = async (id) => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios(`/proyectos/${id}`, config);
            setProyecto(data);
        } catch (error) {
            console.log(error);
        }
        setCargando(false)
    };


    const eliminarProyecto = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
            setAlerta({
                msg: data.msg,
                error: false
            });
            setTimeout(() => {
                navigate('/proyectos')
            }, 3000);

            //Sincronizar el state
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto
            }}
        
        > { children }

        </ProyectosContext.Provider>

    )
};

export { 
    ProyectosProvider 
};

export default ProyectosContext;