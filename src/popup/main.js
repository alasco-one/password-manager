import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

/*var WebDB = require('webdb');
var db = new WebDB("passwords");

if(!db.users){
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

import md5 from 'md5';

import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find'
PouchDB.plugin(find);


var db = {
  user :  new PouchDB('user'), 
  register : new PouchDB('register')
}

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)  

/* eslint-disable no-new */

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

new Vue({
  el: '#app',
  render: h => h(App),
  data(){
    return {
      id : "",
      passwordHash : "",
      db : db,
      md5 : md5,
      authenticated : false,
      host : "",
      salt : 0,
      hasToBeChange : false,
      date : null,
      password : "",
      mapTable : new Map([
        ["a" , "d" ],
        ["b" , "s" ],
        ["c" , "j" ],
        ["d" , "z" ],
        ["e" , "l" ],
        ["f" , "a" ],
        ["g" , "v" ],
      ["h" , "x" ],
        ["i" , "o" ],
        ["j" , "y" ],
        ["k" , "e" ],
        ["l" , "p" ],
        ["m" , "g" ],
        ["n" , "t"] ,
        ["o" , "b" ],
        ["p" , "n"] ,
        ["q" , "f"] ,
        ["r" , "k" ],
        ["s" , "c" ],
        ["t" , "h"] ,
        ["u" , "m"] ,
        ["v" , "r"] ,
        ["w" , "q" ],
        ["x" , "w" ],
        ["y" , "u"] ,
        ["z" , "i"] ,                
      ]),
    }

  },
  methods : {
        /**
       * On  applique une transformation en fonction du map 
       */
      applyTransformation(text, mapTable ){
        let res = ""
        for (const char of text) {
            if(mapTable.has(char.toLowerCase())){
                if(char === char.toLowerCase()){
                    res+=mapTable.get(char)

                }else{
                    res+=mapTable.get(char).toUpperCase()
                }
            }else{
                res+=char
            }

        }
        return res

    }, 
    /**
     * Methode qui permet de permuter deux caractères
     */
    transpose(text, source, destination){
        let inter="";
        for (let index = 0; index<text.length; index++) {
            if(index === source){
                inter+=text[destination]
            }else if (index === destination) {
                inter+=text[source]

            }else{
                inter+=text[index]
            }
        }
        return inter;
    },

    /**
     * On applique une transposition en fonction du salt qui est un nombre entier
     */
    
    applyTransposition(text, salt){
        let i = 1
        let offset = 0
        while(salt>0){
            text = this.transpose(text, 0, i)
            i+=1+offset;
            if(i==text.length) {
                i=1;
                offset=(offset+1)%2;
            }
            salt--;
        }
        return text
    },
    /**
     * Methode qui permet d'appliquer plusieurs couche de sécurité pour que le mot de passe soit le plus robuste possible
     */
    mix (passwordHash, host, salt, mapTable){
        let text = host+passwordHash
        text =  this.applyTransformation(text, mapTable);
        text = this.applyTransposition(text, salt)
        return this.$root.md5(text)
    },

  }
})
