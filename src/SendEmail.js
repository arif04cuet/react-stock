import React, { useEffect, useState } from 'react'
import emailjs, { init } from 'emailjs-com';

const SendEmail = () => {

    const [instruments, setInstruments] = useState([]);
    const [grouth, setGrouth] = useState([]);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const send = (html) => {

        init("gmXm1UPOeKvHz68p-");
        const templateParams = {
            name: 'Institute Holdings',
            html: html
        };

        emailjs.send('service_w8wobhf', 'template_nuirghb', templateParams)
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
        //console.log(instruments);
        let items = [];

        if (grouth.length == 0) {
            let i = 0;
            for (const stock in instruments) {

                const url = 'https://stocknow.com.bd/api/v1/fundamentals/' + stock + '/growth';
                const response = await fetch(url);
                const growth = await response.json();

                if (growth.institute > 0)
                    items.push({
                        name: stock,
                        holdings: growth.institute
                    });

                i++;
            }
            //setGrouth(items);
        }

        items.sort(function (a, b) {
            return parseFloat(b.holdings) - parseFloat(a.holdings);
        });

        let html = '<table style="width:100%">';
        for (const i in items) {
            html += `
                <tr>
                <td><a target="__blank" href="https://stocknow.com.bd/favorites?symbol=${items[i].name}">${items[i].name}</a></td>
                <td>${items[i].holdings}</td>
                </tr>
            `;
        }

        html += '</table>';

        send(html);


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

export default SendEmail