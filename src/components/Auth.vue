<template>
  <div class="container m-3">
      

      <b-row>
          <b-col>
                <div>
                    <b-tabs content-class="mt-3" align="center">
                        <b-tab :disabled="!hasUser" title="Connexion" :active="hasUser">
                            <div class="container">
                                <b-row >
                                    <b-col>
                                        <b-alert v-if="showAlert" :variant="variant" >{{message}}</b-alert>
                                    </b-col>
                                </b-row>
                                <b-form @submit.prevent="auth" >
                                    <b-form-row>
                                        <b-form-group label-for="user-name" label="Nom d'utilisateur">
                                            <b-form-input 
                                                id="user-name"
                                                placeholder="Alassane"
                                                v-model="userName"

                                            ></b-form-input>
                                        </b-form-group>
                                    </b-form-row>

                                    <b-form-row>
                                        <b-form-group label-for="user-password" label="Mot de passe">
                                            <b-form-input 
                                                id="user-password"
                                                placeholder="Alassane"
                                                type="password"

                                                v-model="userPassword"
                                                
                                            ></b-form-input>
                                        </b-form-group>
                                    </b-form-row>

                                    <b-form-row class="mb-2"> 
                                        <router-link @click.prevent class="text-primary text-link" > Mot de passe oublié !</router-link>
                                    </b-form-row>

                                    <b-form-row align-h="around" >
                                        <b-col>
                                            <b-button variant="success" type="submit" >Connexion</b-button>
                                        </b-col>
                                    </b-form-row>
                                </b-form>
                            </div>
                                
                                
                        </b-tab>
                        <b-tab :disabled="hasUser" :active="!hasUser" title="Inscription">
                            
                                <div class="container m-auto">
                                        <b-form @submit="signUp" >
                                            <b-form-row>
                                                <b-form-group label-for="user-name" label="Nom d'utilisateur">
                                                    <b-form-input 
                                                        id="user-name"
                                                        aria-placeholder="Alassane"
                                                        v-model="form.userName"
                                                    ></b-form-input>
                                                </b-form-group>
                                            </b-form-row>

                                            <b-form-row>

                                                <b-form-group label-for="example-datepicker" label="Date de Naissance">
                                                    <b-form-datepicker v-model="form.birthDate" id="example-datepicker" class="mb-2"></b-form-datepicker>

                                                </b-form-group>

                                            </b-form-row>
                                            

                                            <b-form-row>
                                                <b-form-group label-for="user-password" label="Mot de passe">
                                                    <b-form-input 
                                                        id="user-password"
                                                        aria-placeholder="Alassane"
                                                        type="password"
                                                        v-model="form.password"
                                                        
                                                    ></b-form-input>
                                                </b-form-group>
                                            </b-form-row>
                                            

                                            <b-form-row>
                                                <b-form-group label-for="user-password-confirmed" label= "Confirmer mot de passe">
                                                    <b-form-input 
                                                        id="user-password-confirmed"
                                                        aria-placeholder="Alassane"
                                                        type="password"
                                                        v-model="form.passwordConfirmed"

                                                        
                                                    ></b-form-input>
                                                </b-form-group>
                                            </b-form-row>

                                            


                                           
                                            <b-form-row align-h="around" >
                                                <b-col> 
                                                    <div class="d-inline-block ml-4">
                                                        <b-button variant="primary" type="submit" >S'inscrire</b-button>

                                                    </div>
                                                </b-col>
                                            </b-form-row>
                                        </b-form>
                                    </div>
                                
                        </b-tab>
                    </b-tabs>
                </div>
          </b-col>
      </b-row>
  </div>
</template>

<script>
export default {

    data(){
        return {
            userName : "", 
            userPassword : "",
            hasUser : false,
            showAlert : false,
            variant : "", 
            message : "",
            form : {
                userName : "",
                password : "", 
                birthDate : null,
                passwordConfirmed : "",
            }
        }
    },
    mounted(){
        console.log("Auth Mounted !!");
        console.log( this.$root.db);
        this.$root.db.user.find({
            selector : {}
        })
            .then(res=>{
                console.log("Find did !");
                if(res.docs.length!=0){
                    this.hasUser=true
                }else{
                    this.hasUser= false
                }
            })
    },
    methods : {

        signUp(){

            this.$root.db.user.post({
                userName : this.form.userName,
                password : this.$root.md5( this.form.password),
                birthDate : this.form.birthDate
            }).then(()=>{
                this.hasUser = true;
            }, err=>{
                if(err) console.log(err);
            })

        },

        alert(o){
            this.message = o.message
            this.variant = o.variant
            this.showAlert=true
        },
        /**
         * La mehtode qui permet d'authentifier l'utilisateur 
         */
        auth(){
            var that =  this
            console.log(that);

            let passwordHashed =  this.$root.md5( this.userPassword)
            console.log("MDP H : "+passwordHashed);
            that.$root.db.user.find({
                selector : {
                    "password" : passwordHashed
                }
            }).then(res=>{
                browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
                    browser.tabs
                    .sendMessage(tabs[0].id, { msg: { event: "host" } })
                    .then((value) => {
                        that.$root.host =value
                        if(res.docs.length!==0){
                            that.$root.authenticated=true
                            that.$root.passwordHash= passwordHashed;
                            console.log("Mot de passe hashé : ");
                            console.log(that.$root.passwordHash);

                            that.$root.db.passwords.put({
                                _id : that.$root.host+passwordHashed,
                                host : that.$root.host, 
                                password :passwordHashed,  
                            }).then(()=>{
                                console.log("Mot de passe sauvegardé avec succes ");
                            }, err=>{
                                if(err) console.log("Mot de passe déjà existant !!!");
                            })

                        }else{
                            that.alert({
                                message : "Nom d'utilisateur ou Mot de passe incorrect", 
                                variant : "danger",
                            })
                        }

                    });
                });

               
            }, err=>{
                if(err) console.log(err);
            })
        }
                    
    }
}
</script>

<style>

</style>