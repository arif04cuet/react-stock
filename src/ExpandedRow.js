import React, { useEffect, useState } from 'react'
import EpsBarChart from './EpsBarChart'

const ExpandedRow = ({ row }) => {


    useEffect(() => {

    }, [])
    return (
        <div>
            <EpsBarChart code={row.code} yearLimit={5} />
        </div>
    )
}

export default ExpandedRow
