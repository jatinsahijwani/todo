const express = require('express');
const app = express();
const port = 4500;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const secret = '1029384756';

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://khush102938:Raj2raaj@cluster0.wymkiud.mongodb.net/?retryWrites=true&w=majority');

const userSchema = new mongoose.Schema({
    gmail: String,
    username: String,
    password: String
});

const todoSchema = new mongoose.Schema({
    title: String,
    description: String
});

const User = mongoose.model('User550',userSchema);
const Todo = mongoose.model('Todo',todoSchema);


let verify = (req,res,next) => {
    try
    {
    let auth = req.headers.authorization;
    if(!auth)
    {
        return res.json({message: 'Invalid authorization'});
    }
    let token = auth.replace("Bearer ",'');
    let user = jwt.verify(token,secret);
    req.user = user;
    next();
    }catch(error)
    {
        return res.json({message: 'Invalid token',error: error.message});    
    }
}

app.post('/register',async(req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const gmail = req.body.gmail;
    let json = {username: username, password: password, gmail: gmail};
    let existingUser = await User.findOne({username: username});
    if(existingUser)
    {
        return res.json({message: 'User already registered'});
    }
    existingUser = await User.findOne({gmail: gmail});
    if(existingUser)
    {
        return res.json({message: 'gmail already registered'});
    }
    let newUser = new User(json);
    await newUser.save();
    let token  = jwt.sign(json,secret);
    return res.json({token: token});
})

app.post('/login',async(req,res)=> {
    let username = req.body.username;
    let password = req.body.password;
    let existignUser = await User.findOne({ username: username});
    if(!existignUser)
    {
        return res.json({message: 'User does not exist'});
    }
    if(existignUser.password == password) {
        let json = {
            username: existignUser.username,
            password: existignUser.password,
            gmail: existignUser.gmail
        };
        let token  = jwt.sign(json,secret);
        return res.json({token: token});
    }
    else
    {
        return res.json({message: 'Incorrect password'});
    }
});

app.post('/create',verify,async(req,res)=> {
    let title = req.body.title;
    let description = req.body.description;
    let newTodo = new Todo({title: title, description: description});
    await newTodo.save();
    return res.json({message: 'New todo has been saved'});
});

app.post('/update',verify,async(req,res)=> {
    let title = req.body.title;
    let description = req.body.description;
    let existingTodo = await Todo.findOne({title});
    if(!existingTodo)
    {
        return res.json({message: 'Todo not found'});
    }
    existingTodo.description = description;
    await existingTodo.save();
    return res.json({message: 'Updated Todo successfully'});
});

app.post('/delete',verify,async(req,res)=> {
    let title = req.body.title;
    let existingTodo = await Todo.findOneAndDelete({title});
    if(!existingTodo)
    {
        return res.json({message: 'Todo not found'});
    }
    return res.json({message: 'Todo deleted successfully'});
});

app.get('/getAll',verify,async(req,res) => {
    let data = await Todo.find({});
    return res.json(data);
});

app.get('getByTitle',verify,async(req,res) => {
    let title = req.body.title;
    let existingTodo = Todo.findOne({title});
    if(!existingTodo) return res.json({message: 'Todo not found'});
    return res.json({existingTodo: existingTodo});
})


app.listen(port,()=> {
    console.log('listening on port ' + port);
})