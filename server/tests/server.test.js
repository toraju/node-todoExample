const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {product} = require('./../models/Product');
const todos = [
  {_id: new ObjectID(),
    text:'This is for test1 folks'
  }
  ,
  {_id: new ObjectID(),
    text:'This is test2 child'
  }
];
//done has to be called only ones
beforeEach((done)=>{
  product.remove({}).then(()=> {
    Todo.remove({}).then(()=>{
      return Todo.insertMany(todos);
    }).then(()=>done());
  });
});

//Describe a test suite that contains only one test. describe+it
describe('POST /product',()=>{
   it("Adding a product test",(done)=>{
     var item={
       name:'Display',
       price:30
     };
     request(app)
     .post('/product')
     .send(item)
     .expect(200)
     .expect((res)=>{
       //console.log("res.body.name",res.body.name);
       //console.log("item.name=",item.name)
       expect(res.body.name).toBe(item.name);
       expect(res.body.price).toBe(item.price);
     })
     //.end(done());
     .end((err,res)=>{
       if(err){ return done(err);}
       product.find().then((prods)=>{
         expect(prods.length).toBe(1);
         expect(prods[0].name).toBe(item.name);
         done();
       }).catch((e)=>done(e))
     });
   });
 });

describe('POST /todos',()=>{
  it('Should create a new todo',(done)=>{
     var text='lunch time todo test';
     request(app)
     .post('/todos')
     .send({text})
     .expect(200)
     .expect((res)=>{
       expect(res.body.text).toBe(text);
     })
     .end((err,res)=>{
       if(err){
         return done(err);
       }
       Todo.find({text}).then((todos)=>{
         expect(todos.length).toBe(1);
         expect(todos[0].text).toBe(text);
         done();
       }).catch((e)=>done(e))
     });
  });
  it('Should not create entry in todo',(done)=>{
    request(app)
    .post('/todos')
    .send({text:""})
    .expect(400)
    .end((err,res)=>{
      if(err){return done(err);}
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      }).catch((e)=>done(e));
    });
  });
});

describe("GET /todos", ()=>{
  it("Check on the list length with get",(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done())
  });
});

describe('GET /todo/:id',()=>{
  it("Should return todo doc", (done)=>{
   request(app)
   .end(done)
  //   .get(`todo/${todo[0]._id.toHexString()}`)
  //   .expect(200)
  //   .expect((res)=>{
  //     expect(res.body.todo.text).toBe(todo[0].text);
  //   })
  //   .end(done);
  });
});
