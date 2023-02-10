import React from 'react';

function SalidaStat({ item }) {
    return (
        <>
            <td>{item.siniiiga}</td>
            <td>{item.etapa}</td>
            <td>{item.guia}</td>
            <td>{item.remo}</td>
            <td>{item.origen}</td>
            <td>{item.propietario}</td>
            <td>{item.consignado}</td>
        </>
    )
}

export default SalidaStat