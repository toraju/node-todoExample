var express = require('express');
var bodyParser= require('body-parser');

var {User} = require('./models/user');
var {Todo} = require('./models/todo');
var {product} = require('./models/Product');
var {mongoose}= require('./db/mongoose');
const {ObjectID}= require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res)=>{
    var todo = new Todo({
      text:req.body.text,
      completed:req.body.completed,
      completedAt:req.body.completedAt
    });
    todo.save().then((doc)=>{
      res.send(doc);
    },(e)=>{
      res.status(400).send(e);
    });
});

app.post('/product',(req,res)=>{
  var aprod = new product({
    name:req.body.name,
    price:req.body.price,
    description:req.body.desc
  });
  aprod.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req,res)=>{
  //res.send('Hello how are you bud');
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send()
    }
    res.send({name:'raju',todo});
  }).catch((e)=> res.status(404).send(e));

});

app.get('/todos',(req,res)=>{
	Todo.find().then((todos)=>{
		res.send({todos});
	},(e)=>{
		res.status(400).send(e);
	});
});



app.listen(3000,()=>{
  console.log("Started on port 3000");
});

module.exports = {app};
