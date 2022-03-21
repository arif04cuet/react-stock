import React, { useEffect, useState } from 'react'
import emailjs, { init } from 'emailjs-com';

const SendVolumnEmail = () => {

    const [instruments, setInstruments] = useState([]);
    const [grouth, setGrouth] = useState([]);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const MULTIPLIER = 5;

    const send = (html) => {

        init("gmXm1UPOeKvHz68p-");
        const templateParams = {
            name: 'Institute Holdings',
            html: html
        };

        emailjs.send('service_w8wobhf', 'template_koujb38', templateParams)
            .then(function (response) {
                setIsEmailSent(true);
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    }

    const fectStockData = async () => {

        const apiBase = 'https://api.stocknow.com.bd/v1';
        const instrumentApi = apiBase + '/instruments';

        fetch(instrumentApi)
            .then(res => res.json())
            .then(res => {
                setInstruments(res);
            });

    }

    const filterStock = async () => {

        let items = [];

        if (grouth.length == 0) {
            let i = 0;
            for (const stock in instruments) {

                const url = 'https://stocknow.com.bd/api/v1/instruments/' + stock + '/history?resolution=D';
                const response = await fetch(url);
                const volumn = await response.json();

                items.push({
                    name: stock,
                    today: volumn[4][399],
                    yesterday: volumn[4][398],
                });

                i++;
            }
        }

        items = items.filter(volumn => {
            return parseInt(volumn.today) > parseInt(volumn.yesterday) * MULTIPLIER;
        });

        items.sort(function (a, b) {
            return parseFloat(b.today) - parseFloat(a.today);
        });


        if (items.length > 0) {

            let html = `<table style="width:100%">
            <tr>
            <th style="text-align:left">Stock</th>
            <th style="text-align:left">Today</th>
            <th style="text-align:left">Yesterday</th>
            </tr>
            `;
            for (const i in items) {
                html += `
                <tr>
                <td><a target="__blank" href="https://stocknow.com.bd/favorites?symbol=${items[i].name}">${items[i].name}</a></td>
                <td>${items[i].today}</td>
                <td>${items[i].yesterday}</td>
                </tr>
            `;
            }

            html += '</table>';

            send(html);
        }

    }



    useEffect(() => {

        if (instruments.length == 0)
            fectStockData();
        else {
            filterStock();
        }

    }, [instruments])

    return (
        <div>
            {!isEmailSent && 'Working.....'}
            {isEmailSent && 'Email sent!'}
        </div>
    )
}

export default SendVolumnEmail