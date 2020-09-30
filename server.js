const express = require('express');
const axios = require('axios');
const bParser = require('body-parser');
const ejs = require('ejs');
const app = express();

// v3

app.use(express.static("public"));  // external files are used in this folder
app.set('view engine', ejs);

app.get('/date', (req, res) => {
    let today = new Date();
    let day = '';
    let personData= {
        firstName: "John",
        lastName: "Biggus Dickus",
        age: 25,
        job: "Developer"
    };

    if (today.getDay() === 6 || 
        today.getDay() === 0 )
    {
        day = "weekend!";
    }
    else {
        day = "weekday...";
    }

    res.render('index.ejs', {
        kindOfDay: day,
        person: personData
    });
});

app.listen(5050, () => {
    console.log("server is running on port 5050");
});

// v2
/*app.use(bParser.urlencoded({extended: true}));

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
});*/


// v1
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