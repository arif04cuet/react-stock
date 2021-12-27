import React from 'react'

const TotalStock = ({ row, cell }) => {


    if (!cell)
        return;

    const total = cell.split('|')
    return (
        <>
            <div className="row">
                <div className="col">Total</div>
                <div className="col">{total[0]}</div>
            </div>
            <div className="row">
                <div className="col">F</div>
                <div className="col">{total[1]}</div>
            </div>
            <div className="row">
                <div className="col">G</div>
                <div className="col">{total[2]}</div>
            </div>
            <div className="row">
                <div className="col">I</div>
                <div className="col">{total[3]}</div>
            </div>

            <div className="row">
                <div className="col">P</div>
                <div className="col">{total[4]}</div>
            </div>
        </>
    )
}

export default TotalStock
