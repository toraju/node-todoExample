const {mongoose} = require('./../server/db/mongoose');
const {Todo}= require('./../server/models/todo');
const {User}= require('./../server/models/user');
const {ObjectID} = require('mongodb');
var id='59c8adcc59085ba5b986abfd9999';
//var id='59cc07111d089f285658203c';
if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}
Todo.findById(id).then((todo)=>{
  if(!todo){
    return console.log('Id not found');
  }
  console.log("Todo find id:",todo);
}).catch((e)=> console.log(e));
Todo.findOne({
  _id:id
}).then((todo)=>{
  console.log('Todo One',todo);
});

Todo.find({_id:id}).then((todos)=>{
  console.log("Todo id key:",todos);
});

Todo.find().then((todos)=>{
  console.log("List Todo:",todos);
});
