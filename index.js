const express = require('express');
const path = require('path')
const app = express();
const port = 3000;

require('./config/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index');
});


app.listen(port, () => console.log(`app listening on port ${port}!`));