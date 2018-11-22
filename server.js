const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`

    fs.appendFile('middlewarelog.txt', log, (err) => {
        if (err) {
            fs.appendFile('middlewareErrorlog.txt', err, (err2) => {
                if (err2) {
                    console.log(`Error 1: ${err}`);
                    console.log(`Error 2: ${err2}`);
                }
            });
        }
    });

    // console.log(now, req.method, req.url);
    next();
});

// app.use((req, res, next) => {
//     res.render('error.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('scream', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', { pageTitle: 'HOME', currentYear: new Date().getFullYear(), welcomeMessage: 'Hola bitches' })
});

app.get('/about', (req, res) => {
    // res.send('<h1>hello express</h1>');
    res.render('about.hbs', {
        pageTitle: 'ABOUT',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    // res.send('<h1>hello express</h1>');
    res.send({ errorMessage: 'Unable to fulfill request' });
});

app.listen(8080, () => {
    console.log('server is up on port 3000');
});
