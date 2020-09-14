import React, {useState} from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { obtenerDiferencia, calcularMarca, obtenerPlan } from '../helper'

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`

const Label = styled.label`
    flex: 0 0 100px;
`

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`

const InputRadio = styled.input`
    margin: 0 1rem;
`

const Button = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform:uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover {
        background-color: #26C6DA;
        cursor: pointer;
    }
`

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`

const Formulario = ({guardarResumen, guardarCargando}) => {

    const [datos, guardarDatos] = useState({
        marca: '',
        año: '',
        plan: ''
    })

    const [error, guardarError] = useState(false)

    //Object destructuring de datos
    const {marca, año, plan} = datos

    //Obtener datos del form y guardarlos en el state
    const obtenerInformacion = e => {
        guardarDatos({...datos, [e.target.name]: e.target.value})
    }

    const cotizarSeguro = e => {
        e.preventDefault()

        if(marca.trim() === '' || año.trim() === '' || plan.trim() === true) {
            guardarError(true)
            return
        }

        guardarError(false)
        
        //valor base
        let resultado = 2000
        
        //obtener diferencia de años con un helper importado
        const diferencia = obtenerDiferencia(año)

        //cada año se le resta el 3%
        resultado -= ((diferencia * 3) * resultado) / 100

        //cáclulo según la marca
        resultado = calcularMarca(marca) * resultado

        //incremento según el plan
        const incrementoPlan = obtenerPlan(plan)

        resultado = parseFloat(incrementoPlan * resultado).toFixed(2)

        guardarCargando(true)

        setTimeout(() => {
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            })

            guardarCargando(false)
        }, 3000)
    }

    return (
        <form onSubmit={cotizarSeguro}>
 
            { error ? <Error>Todos los campos son obligatorios</Error> : null }

            <Campo>
                <Label>Marca</Label>
                <Select name='marca' value={marca} onChange={obtenerInformacion}>
                    <option value=''>-- Seleccione --</option>
                    <option value='americano'>Americano</option>
                    <option value='europeo'>Europeo</option>
                    <option value='asiático'>Asiático</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select name='año' value={año} onChange={obtenerInformacion}>
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio type='radio' name='plan' value='basico' onChange={obtenerInformacion} checked={plan === 'basico'} /> Basico
                <InputRadio type='radio' name='plan' value='completo' onChange={obtenerInformacion} checked={plan === 'completo'} /> Completo
            </Campo>

            <Button type='submit'>Cotizar</Button>
        </form>
    )
}

Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}
 
export default Formulario
