import React from 'react';
import { changeIt } from '../../utils/helpers';
import EditExpense from './editExpense';

function IndividualWrapper({item, ranchId}) {
    const newState = item.sort(changeIt);

    return(<>
        {newState.map((item) => {
            return <>
            <EditExpense item={item} ranchId={ranchId}></EditExpense>
            </>
        })}
    </>
    )
};

export default IndividualWrapper