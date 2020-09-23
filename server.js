const express = require('express');
const axios = require('axios');
const bParser = require('body-parser');
const app = express();

app.use(bParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) =>{
    let url= 'https://api.coindesk.com/v1/bpi/currentprice/eur.json';
    let currency = req.body.currency;

    axios.get(url)
    .then(function(response){
        var rate;
        let code;
        if(currency === 'EUR')
        {
            rate = response.data.bpi.EUR.rate;
            code = response.data.bpi.EUR.code;
        }
        else{
            rate = response.data.bpi.USD.rate;
            code = response.data.bpi.USD.code;
        }
        let disclaimer = response.data.disclaimer;
        res.write(`<p> ${rate} ${code} </p>`);
        res.write(`<p> ${disclaimer} </p>`);
        res.send();
    })
    .catch(function(error){
        console.log(error)
    });
});

/*app.get('/eCoin', (req, res) =>{
    let url= 'https://api.coindesk.com/v1/bpi/currentprice/eur.json';
    let rate = "";
    let code = "";
    let disclaimer = "";

    axios.get(url)
    .then(function(response){
        rate = response.data.bpi.EUR.rate;
        code = response.data.bpi.EUR.code;
        disclaimer = response.data.disclaimer;

        res.write(rate, code);
    res.write(disclaimer);
    res.send();
        //console.log(rate + " - " + code + " - " disclaimer);
    })
    .catch(function(error){
        console.log(error);
    });

    
});*/

app.listen(3000, () => {
    console.log("Server is running on port: 3000")
});