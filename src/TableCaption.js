import React from 'react'
import Arithmetic from './Arithmetic'

const TableCaption = ({ items, columns }) => {

    return (
        <div style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>

            <div className="container-fluid">
                <div className="row">
                    <div className="col text-left">
                        {new Date().toDateString()}
                    </div>
                    <div class="col">
                        <Arithmetic columns={columns} />
                    </div>
                    <div className="col text-right">
                        Total Stocks: {items.length}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TableCaption
