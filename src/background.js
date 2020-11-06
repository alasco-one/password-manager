browser.runtime.onMessage.addListener(function (/*request, sender, sendResponse*/) {
  console.log('Hello from the background')

  browser.tabs.executeScript({
    file: 'content-script.js',
  });

  
})

console.log("Hi i'm Alassane");



/*if(!db.users){
  db.createTable("users", {
    id : { type : String, }, 
    userName : { type : String},

    password : {type : String},

    birthDate : {type : Date}

  })
}

if(!db.records){
  db.createTable("records", {
    id : { type : String, }, 
    userId : { type : String, }, 
    
    password : {type : String},

    createdAt : {type : Date}

  })
}*/

/*/import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find'
PouchDB.plugin(find);

/*var db = {
  user :  new PouchDB('user'), 
  passwords : new PouchDB('passwords')
}
var db =  new PouchDB('passwords')
db.post({
  //_id : "2", 
  password : "ALASCO"
})



db.allDocs({include_docs: true, descending: true}, function(err, doc) {
  console.log("all datas");

  console.log(doc.rows);
});

db.find({selector : {}})
  .then(res=>{
    console.log("Je suis Alasxo");

    console.log(res);
  }, err=>{
    if(err) console.log(err);
  })

*/

