import React from 'react';
import { dateFormat } from '../../utils/dateFormat';

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
            <td>{dateFormat(item.createdAt)}</td>
        </>
    )
}

export default SalidaStat