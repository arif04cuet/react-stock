import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const EpsBarChart = ({ code, yearLimit }) => {

    const apiBase = 'https://api.stocknow.com.bd/v1';
    const epsEndpoint = apiBase + '/instruments/' + code + '/fundamentals/earning_per_share,q1_eps_cont_op,q2_eps_cont_op,q3_eps_cont_op?groupBy=meta_date&yearLimit=' + yearLimit;

    const [epses, setEpses] = useState([]);

    useEffect(() => {

        fetch(epsEndpoint)
            .then(res => res.json())
            .then(eps => {

                const data = [];
                Object.keys(eps).forEach(x => {
                    const item = eps[x][0];

                    data.push({
                        name: x,
                        value: Number(item.meta_value)
                    })

                })

                console.log(data);
                setEpses(data)
            });



    }, [])


    return (
        <div>
            eps
        </div>
    )
}

export default EpsBarChart
