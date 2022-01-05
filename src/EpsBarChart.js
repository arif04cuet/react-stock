import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';


const EpsBarChart = ({ code, yearLimit }) => {

    const [epses, setEpses] = useState([]);
    const [yLimit, setYLimit] = useState(yearLimit)

    const apiBase = 'https://api.stocknow.com.bd/v1';
    const epsEndpoint = apiBase + '/instruments/' + code + '/fundamentals/earning_per_share,q1_eps_cont_op,q2_eps_cont_op,q3_eps_cont_op?groupBy=meta_date&yearLimit=' + yLimit;


    const quarterName = (item) => {
        const { meta_date, meta_key } = item;
        const q_name = meta_key.split('_')[0];
        const name = meta_date.split('-')[0] + '-' + (q_name == 'earning' ? 'q4' : q_name);
        return meta_date;
    }
    const color = { red: '#46DF75', green: '#4DF561', purple: '#6A64FF' }

    useEffect(() => {

        fetch(epsEndpoint)
            .then(res => res.json())
            .then(eps => {

                const data = [];
                Object.keys(eps).forEach(x => {
                    const item = eps[x][0];

                    data.push({
                        name: quarterName(item),
                        value: Number(item.meta_value)
                    })

                })

                console.log(data);
                setEpses(data)
            });



    }, [yLimit])


    return (
        <div>
            <div className="text-center">
                Historic EPS of last <input type="number" value={yLimit} onChange={e => setYLimit(e.target.value)} /> Years.
            </div>
            <BarChart
                width={1000}
                height={300}
                data={epses}
                margin={{ bottom: 30, left: 30 }}
            >
                <XAxis interval={0} angle={-45} textAnchor="end" dataKey="name" style={{ fontSize: '80%', fill: 'rgba(0, 0, 0, 0.87)' }} />
                <Bar barCategoryGap={50} dataKey="value" >
                    <LabelList dataKey="value" position="top" style={{ textAnchor: 'middle', fontSize: '90%', fill: 'rgba(0, 0, 0, 0.87)' }} />
                    {
                        epses.map((entry, index) => {
                            let barColor = color.green;
                            if (index > 0) {
                                const currentValue = epses[index].value;
                                const previousValue = epses[index - 1].value;
                                console.log(currentValue - previousValue);
                                if ((currentValue - previousValue) < 0) {
                                    barColor = color.red;
                                }
                                else if (currentValue == previousValue) {
                                    barColor = color.purple;
                                }
                            }
                            return <Cell key={`cell-${index}`} fill={barColor} />
                        })
                    }
                </Bar>
            </BarChart>

        </div>
    )
}

export default EpsBarChart
