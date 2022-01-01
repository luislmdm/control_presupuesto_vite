import { useState, useEffect } from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export const ControlPresupuesto = ({
    presupuesto,
    setPresupuesto, 
    gastos,
    setGastos,
    setIsValidPresupuesto

}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible,setDisponible] = useState(0)
    const [gastado,setGastado] = useState(0)

    useEffect(() => {
      const totalGastado = gastos.reduce ( (total, gasto) => gasto.cantidad + total, 0 )
      
      const totalDisponible = presupuesto - totalGastado

      //calculo porcentaje gastado

      const nuevoPorcentaje = (( (presupuesto - totalDisponible)/presupuesto)*100).toFixed(2)
        
      setDisponible(totalDisponible)
      setGastado(totalGastado)
      setTimeout(() => {
        setPorcentaje(nuevoPorcentaje)   
      }, 1000);
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US' , {
            style: 'currency',
            currency: 'USD'
        })
   
    }
    
    const handleResetApp = ()=> {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos');

        if (resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        } 
    }

    const handleModificarPresupuesto = ()=> {
        const resultado = confirm('¿Deseas modificar presupuesto');

        if (resultado){
            setPresupuesto(presupuesto)
            setIsValidPresupuesto(false)
        } 
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-colmnas'>
           <div>
               <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje >100 ? '#DC2626' : '#3B82f6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje >100 ? '#DC2626' : '#3B82f6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}%`}
               ></CircularProgressbar> 
            </div> 
            <div className='contenido-presupuesto'>
                <button
                className='reset-app'
                type='button'
                onClick={handleResetApp}
                >
                    Restear App
                </button>
                <button
                className='reset-presupuesto'
                type='button'
                onClick={handleModificarPresupuesto}
                >
                    Modificar Presupuesto
                </button>
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                                                        
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span>{formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}
                </p>

            </div>
        </div>
    )
}

export default ControlPresupuesto
