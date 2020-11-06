<template>
  <div class="container">
      <b-tabs content-class="mt-3" align="center">
            <b-tab title="Création" active>
                <div class="d-inline-block m-auto">
                    <div class="container">

                        <b-row class="mt-2 mb-2">
                            <b-col>
                                <b-form-group label="Nom de domaine" >
                                    <b-input :value="host" disabled></b-input>
                                </b-form-group>
                            </b-col>

                        </b-row>
                        <b-row>

                            <b-col>
                                <b-form-group label="Mot de passe" >
                                    <b-input-group>

                                        <b-form-input type ="text" :value="password" disabled></b-form-input>

                                        <b-input-group-append>
                                            <b-button @click="copy" variant="outline-light"><b-icon class="text-dark" icon="files"></b-icon></b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            
                            
                        </b-row>

                       <b-row >
                            <b-col>
                                <b-alert v-if="showAlert" :variant="variant" >{{message}}</b-alert>
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </b-tab>

             <b-tab title="Mes mots de passe" >
                <div class="container">
                    <b-row v-for="(item, index) in items" :key="index" class="pt-2 pb-2 m-1 bg-light ">
                        <b-col >
                            <b-input-group>

                                <b-input v-model="item.host" disabled type="text"></b-input>
                                <b-input v-model="item.password" disabled :type="item.type" ></b-input>

                                <b-input-group-append>
                                    <b-button @click="item.type='text'" variant="light"><b-icon-eye class="text-dark" ></b-icon-eye></b-button>

                                </b-input-group-append>
                            </b-input-group>
                        </b-col>
                        
                    </b-row>
                </div>
            </b-tab>
      </b-tabs>
                
  </div>
</template>

<script>
import  browser from "webextension-polyfill";


export default {

     

    computed : {
        passwordHash () {
            //let a = this.$root.passwordHash;
            
            //console.log("In computed method :  "+this.$root.passwordHash);
            return this.$root.passwordHash;
        }, 
        host(){
            return this.$root.host;
        },
        
        password(){
            let a = this.$root.md5(this.host+this.passwordHash);
            //this.$emit("save-password");
            
            return a;
        }
    },

    methods: {
        copy(){
            var that = this;
            browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
                browser.tabs
                .sendMessage(tabs[0].id, { msg: { event: "copy" , value : that.password} })
                .then(() => {
                    that.copied()

                });
            });
        },
        /**
         * Methode qui séxécute après la copie termine
         */
        copied(){
            console.log("Copy terminé !");
            this.alert({
                variant : "success", 
                message : "Mot de passe Copié ! "
            })
        },
         alert(o){
            this.message = o.message
            this.variant = o.variant
            this.showAlert=true
        },
    },


    mounted(){
        console.log("Password component Mounted !!!");
        var that = this;

    
        
        this.$root.db.passwords.find({
            selector : {}
        }).then(res=>{
            that.items= res.docs
        }, err=>{
            if(err) console.log(err);
        })
    },
    data(){
        return {
            showAlert : false,
            variant : "", 
            message : "",
            
            items: [
                /*{
                    host : "juzafgjaegfvb",
                    password : "Jrgre shkrerzegolhdzjlvbhjzdlb",
                    type : "password"
                },
                {
                    host : "juzafgjaefvevbfegfvb",
                    password : "Je shkolhdzjlvbhjzdlb",
                    type : "password"
                },
                {
                    host : "juzafgjaebfebefgfvb",
                    password : "Jfreseb shkolhdzjlvbhjzdlb",
                    type : "password"
                },*/
            ],
        }
    }

}
</script>

<style>

</style>