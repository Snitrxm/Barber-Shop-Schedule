const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/baber-app', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MongoDB conectado com sucesso");
}).catch((err) => {
    console.log("Erro ao conectar no MongoDB: " + err);
})
