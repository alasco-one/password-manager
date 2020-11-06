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
  passwords : new PouchDB('passwords')
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
      passwordHash : "",
      db : db,
      md5 : md5,
      authenticated : false,
      host : "",
    }
  }
})
