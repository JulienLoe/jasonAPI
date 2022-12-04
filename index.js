const express = require('express');

const app = express();

require('dotenv').config();

const cors = require('cors')

const mongoose = require('mongoose')

const LOG = process.env.LOGINDB;

const url_db = `mongodb+srv://JulienLoe:${LOG}@cluster0.vlw1bje.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url_db)

mongoose.connection.on('open', () => console.log('DB connectée !'))

const memberSchema = mongoose.Schema({
    name: {type: String, required: true},
    adjective: {type: String, required: true}
},{timestamps: true});

const Member = mongoose.model('members', memberSchema)

const PORT= 8080;

app.use(cors({origin: 'http://localhost:3000'}))

app.use(express.json());

app.get('/', (req,res) =>{
    Member.find()
    .then((result) => res.json(result))
});

app.post('/create', (req,res) =>{
    const member = new Member(req.body);
    member.save(() => console.log("Member créé !"))
    res.send();
})

app.put('/:id', (req,res) =>{
    Member.updateOne({_id: req.params.id}, req.body).exec()
    res.send();
})

app.delete('/:id', (req,res) =>{
    Member.deleteOne({_id: req.params.id}).exec();
    res.send()
})

app.listen(PORT, console.log(`Le serveur est démarrée au port ${PORT}`));