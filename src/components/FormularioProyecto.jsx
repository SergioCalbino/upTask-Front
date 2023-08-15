import { useEffect, useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alert from "./Alert";
import { useParams } from "react-router-dom";




const FormularioProyecto = () => {

    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();
    const { id } = useParams();

    useEffect(() => { 
        if (id) {
            //Ojo. Aca lleno el state local con lo que tengo en el global. Por eso no aplico destructoring
            setIdForm(proyecto._id)
            setNombre(proyecto.nombre);
            setDescripcion(proyecto.descripcion);
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
            setCliente(proyecto.cliente);
        } else {
            console.log('Nuevo ');
        }
    }, [id])
    

    const [idForm, setIdForm] = useState(null)
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('');

    const validate = async () => {
        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        await submitProyecto({idForm, nombre, descripcion, fechaEntrega, cliente})
        setIdForm(null)
        setNombre('');
        setDescripcion('')
        setCliente('')
        setFechaEntrega('')
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validate()
    };

    const { msg } = alerta


  return (
    <form 
        onSubmit={handleSubmit}
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow '>

            { msg && <Alert alerta={alerta}/> }
        <div className="mb-5" >
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='nombre'
            >Nombre Proyecto </label>
            <input
                id='nombre'
                type='text'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Nombre del proyecto'
                value={nombre}
                onChange={(e) =>setNombre(e.target.value)}
            />
        </div>
       
        <div className="mb-5" >
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='descripcion'
            >Descripcion </label>
            <textarea
                id='descripcion'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Descripcion del proyecto'
                value={descripcion}
                onChange={(e) =>setDescripcion(e.target.value)}
            />
        </div>
        
        <div className="mb-5" >
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='fecha-entrega'
            >Fecha de entrega </label>
            <input
                id='fecha-entrega'
                type='date'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={fechaEntrega}
                onChange={(e) =>setFechaEntrega(e.target.value)}
            />
        </div>
        <div className="mb-5" >
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='cliente'
            >Cliente </label>
            <input
                id='cliente'
                type='text'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Nombre del proyecto'
                value={cliente}
                onChange={(e) =>setCliente(e.target.value)}
            />
        </div>
        <input
            type="submit"
            value={idForm ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            className="bg-sky-600 p-3 rounded-lg w-full text-white cursor-pointer uppercase font-bold hover:bg-sky-700 "
        
        />
    </form>
  )
}

export default FormularioProyecto