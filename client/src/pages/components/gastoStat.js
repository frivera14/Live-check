import React from 'react';
import { dateFormat } from '../../utils/dateFormat';
import { changeIt } from '../../utils/helpers';

function GastoStat({ item }) {

    return (
        <>
            {item.sort(changeIt).map((cosa) => {
                return <>
                    <tr>
                        <td>{cosa.name}</td>
                        {cosa.cantidad < 0 ? <td>- ${cosa.cantidad}</td> :
                            <td>+ ${cosa.cantidad}</td>}
                        <td>{dateFormat(cosa.fecha)}</td>
                    </tr>
                </>
            })}
        </>
    )
}

export default GastoStat