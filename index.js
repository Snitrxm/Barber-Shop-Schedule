const express = require('express');
const path = require('path')
const app = express();
const Client = require('./src/models/client');
const Dono = require('./src/models/dono');
const methodOverride = require('method-override');
const res = require('express/lib/response');
const port = 3000;
let clientsCounter = 0;

require('./config/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Rotas do Cliente
app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/agendar' , (req, res) => {
    res.status(200).render('pages/agendar');
})

app.post('/agendar', async (req, res) => {
    const { name, day, hour } = req.body;
    let client = new Client({name, day, hour});
    let clients = await Client.findOne({day:day, hour: hour});

    if(!name || !day || !hour) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }else{
        if(clients){
            res.write("<h1>Ja existe um agendamento para esse horario</h1>");
        }else{
            await client.save();
            res.redirect('/obrigado');
        }
    }

    
    

})

app.get('/obrigado', (req, res) => {
    res.status(200).render('pages/obrigado');
})


//Rotas do Dono
app.get('/entrar', (req, res) => {
    res.render('pages/entrar');
})

app.post('/entrar', (req, res) => {
    if(req.body.name == "snitram" && req.body.password == "123"){
        res.redirect('/todos');
    }else{
        res.status(400).json({ error: 'Usuário ou senha incorretos' });
    }

})

app.get('/todos', async (req, res) => {
    let clients = await Client.find({});
    res.render('pages/todosClientes', {clients: clients, clientsCounter: clientsCounter});
})


app.delete('/feito/:id', async (req, res) => {
    try {
        await Client.findByIdAndRemove(req.params.id);
        clientsCounter++;
        res.redirect('/todos', {clientsCounter: clientsCounter});
    } catch(error){
        res.status(500).send(error);
    }
})


app.listen(port, () => console.log(`app listening on port ${port}!`));