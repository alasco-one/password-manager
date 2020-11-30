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
                                        <b-alert :show="showAlert" :variant="variant" >{{message}}</b-alert>
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
                                                        <b-button  variant="primary" type="submit" >S'inscrire</b-button>

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
    computed : {
        valid(){
            return (this.form.userName.length>1) &&
                (this.form.password.length>5)  &&
                (this.form.password === this.form.passwordConfirmed)
        }
    },
    mounted(){
        console.log("Auth Mounted !!");
        console.log( this.$root.db);
        this.$root.db.user.find({
            selector : {}
        })
            .then(res=>{
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
                console.log("User bien enregistré !!")
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


                            return this.$root.db.register.find({
                                selector : { 
                                    host : that.$root.host, 
                                }
                            })
                            

                        }else{
                            that.alert({
                                message : "Nom d'utilisateur ou Mot de passe incorrect", 
                                variant : "danger",
                            })
                            
                        }

                    }).then(res=>{
                        let promise = false
                        if (res.docs.length) {
                            
                            that.$root.id = res.docs[0]._id
                            that.$root.salt = res.docs[0].salt
                            that.$root.date = new Date(res.docs[0].date)
                            let diff = (Date.now() - that.$root.date)
                            console.log("Différence entre  : "+diff);
                            //pour 1 min
                            //let delay = 10^3*60*60*24*60;

                            let delay = 10^3*60;
                            if(diff> delay ){
                                that.$root.hasToBeChange = true;
                                console.log("Oui je rentre !!!");
                            }
                        
                        }else{
                            
                            that.$root.salt = Math.ceil(Math.random() * 10^4)
                            that.$root.id = that.$root.host+Math.ceil(Math.random() * 10000)
                            
                            promise =  that.$root.db.register.put({
                                _id : that.$root.id ,
                                host : that.$root.host, 
                                salt : that.$root.salt,  
                                date : Date.now()
                            
                            })
                        }
                        that.$root.password =  that.$root.mix(that.$root.passwordHash, this.$root.host, this.$root.salt, this.$root.mapTable);
                        if(promise) return promise
                        else {
                            return new Promise(res=>{
                                res();
                            })
                        }
                    }).then(()=>{
                        console.log("Mot de passe sauvegardé avec succes ");
                    }).catch(err=>{
                        if(err) {
                            console.log(err);
                            console.log("Mot de passe déjà existant !!!");
                        }
                    })

                });

               
            }).catch(err=>{
                if(err) console.log(err);
            })
        }
                    
    }
}
</script>

<style>

</style>