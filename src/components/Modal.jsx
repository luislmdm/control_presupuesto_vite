import React from 'react'
import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
}) => {

        const [mensaje, setMensaje] = useState('');
        const [nombre, setNombre] = useState('');
        const [cantidad, setCantidad] = useState('');
        const [categoria, setCategoria] = useState('');
        const [fecha, setFecha] = useState ('');
        const [id,setId] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
           setNombre(gastoEditar.nombre)
           setCantidad(gastoEditar.cantidad)
           setCategoria(gastoEditar.categoria)
           setId(gastoEditar.id)
           setFecha(gastoEditar.fecha)
        }
    }, []);

    const ocultarModal= () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);

    
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje("")
            }, 3000);

            return
        }
    
    
        guardarGasto({nombre,cantidad,categoria,id, fecha})
    }
    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={CerrarBtn}
                    alt="Cerrar Modal"
                    onClick={ocultarModal}
                    />
            </div>
            
            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
                
                <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className='campo'>
                    <label htmlFor='nombre'>Nombre Gasto</label>

                    <input
                        id="nombre"
                        type="text"
                        placeholder="Añade el Nombre del Gasto"
                        value={nombre}
                        onChange={e => setNombre (e.target.value)}
                    />

                </div>

                 <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad</label>

                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Introduce la Cantidad: ej. 300"
                        value={cantidad}
                        onChange={e => setCantidad (Number(e.target.value))}
                    />

                </div>

                <div className='campo'>
                    <label htmlFor='categoria'>Categoria</label>

                   <select 
                   id="categoria"
                   value={categoria}
                        onChange={e => setCategoria (e.target.value)}
                   >
                       <option value="">-- Seleccione --</option>
                       <option value="ahorro">Ahorro</option>
                       <option value="Comida">Comida</option>
                       <option value="Casa">Casa</option>
                       <option value="Gastos">Gastos Varios</option>
                       <option value="Ocio">Ocio</option>
                       <option value="Salud">Salud</option>
                       <option value="Suscripciones">Suscripciones</option>
                   </select>

                </div>

                <input 
                    type="submit"
                    value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
                    />
                
            </form>

        </div>
    )
}

export default Modal
