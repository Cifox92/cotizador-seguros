import React from 'react'
import styled from '@emotion/styled'
import { primerMayuscula } from '../helper'
import PropTypes from 'prop-types'

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`

const Resumen = ({datos}) => {

    const {marca, año, plan} = datos

    if(marca === '' || año === '' || plan=== '') return null

    return (
        <ContenedorResumen>
            <h2>Resumen de Cotización</h2>
            <ul>
                <li>Marca: {primerMayuscula(marca)} </li>
                <li>Plan: {primerMayuscula(plan)} </li>
                <li>Año del auto: {año} </li>
            </ul>
        </ContenedorResumen>
    )
}

Resumen.propTypes = {
    datos:PropTypes.object.isRequired
}

 
export default Resumen