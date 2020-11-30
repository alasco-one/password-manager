<template>
  <div class="container">
      

      <b-tabs content-class="mt-3" align="center">
            <b-tab title="Création" active>
                <div class="d-inline-block m-auto">
                    <div class="container">

                        <b-row>
                            <b-col>
                                <b-alert :show="$root.hasToBeChange" variant="danger">Votre mot de passe a fait plus de 2 mois! Vous devez le changer.</b-alert>

                            </b-col>
                        </b-row>

                        <b-row class="mt-2 mb-2">
                            <b-col>
                                <b-form-group label="Nom de domaine" >
                                    <b-input :value="host" disabled></b-input>
                                </b-form-group>
                            </b-col>

                        </b-row>
                        <b-row class="mt-2 mb-2">

                            <b-col>
                                <b-form-group label="Mot de passe" >
                                    <b-input-group>

                                        <b-form-input type ="text" :value="password" disabled></b-form-input>

                                        <b-input-group-append>
                                            <b-button v-b-tooltip.hover :title="textPassword" @click="copy(password, 'old')" 
                                                variant="outline-dark"><b-icon class="text-primary" icon="files"></b-icon></b-button>

                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            
                            
                        </b-row>
                        <b-row class="mt-2 mb-2" v-if="changing" >

                            <b-col>
                                <b-form-group label="Nouveau mot de passe" >
                                    <b-input-group>

                                        <b-form-input type ="text" :value="newPassword" disabled></b-form-input>

                                        <b-input-group-append>
                                            <b-button v-b-tooltip.hover  :title="textNewPassword" @click="copy(newPassword, 'new')" 
                                                variant="outline-dark"><b-icon class="text-primary" icon="files"></b-icon></b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            
                            
                        </b-row>
                        <b-row class="mt-2 mb-4" v-else>
                            <b-col>
                                <b-button @click="changePassword" block variant="outline-dark">Changer de mot de passe</b-button>
                            </b-col>
                        </b-row>

                        <b-row v-if="changing" v-show="changing" class="mt-2 mb-4" >
                            <b-col>
                                <b-button @click="cancel" block variant="outline-primary">Annuler</b-button>
                            </b-col>
                            <b-col>
                                <b-button @click="validate" block variant="outline-success">Valider</b-button>
                            </b-col>
                        </b-row>

                    </div>
                </div>
            </b-tab>

      </b-tabs>
    

                
  </div>
</template>

<script>

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
            //let a =this.sort( this.$root.md5(this.host+this.passwordHash));
            //this.$emit("save-password");
            
            return this.$root.password
        }
    },

    methods: {

        /**
         * Methode qui permet d'annuler un changement de mot de passe 
         * donc la valeur courante est conservée
         */
        cancel(){
            this.newSalt = 0,
            this.newPassword = ""
            this.changing = false
        },

        /**
         * Methode qui permet de valider un changement de mot de passe 
         * donc la nouvelle valeur remplace la valeur courante
         */
        validate(){

            this.$root.password = this.newPassword;
            this.$root.salt = this.newSalt
            this.$root.date = Date.now()

            let that = this
            that.$root.db.register.get(that.$root.id).then(function(doc) {
                return that.$root.db.register.put({
                    _id: that.$root.id,
                    _rev: doc._rev,
                    date : that.$root.date,
                    salt : that.$root.salt,
                });
            }).then(()=> {
            // handle response
                that.newSalt = 0,
                that.newPassword = ""
                that.changing = false
                console.log("Mot de passe changé avec succès");
                that.$root.hasToBeChange = false

            }).catch(function (err) {
                console.log(err);
            });

            

        },

        changePassword(){
            this.changing=true;
            this.newSalt = Math.ceil(Math.random()* 10^4)
            this.newPassword = this.$root.mix(this.$root.passwordHash, this.$root.host, this.newSalt, this.$root.mapTable);
        },

        copy(text, cas){
            var that = this
            navigator.clipboard.writeText(text)
                .then(()=>{
                    console.log("Message Copié");
                    if(cas === "new"){
                        that.textNewPassword="Copié"
                        setInterval(()=>that.textNewPassword="Copie", 2000)
                    }else{
                        that.textPassword="Copié"
                        setInterval(()=>that.textPassword="Copie", 2000)
                    }
                }).catch(err=>{
                    if(err) console.log(err);
                })

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
    
        
        /*this.$root.db.passwords.find({
            selector : {}
        }).then(res=>{
            that.items= res.docs
        }, err=>{
            if(err) console.log(err);
        })*/
    },
    data(){
        return {
            showAlert : false,
            variant : "", 
            message : "",
            changing : false,
            newPassword : "",
            newSalt : "",
            textPassword : "Copie",
            textNewPassword : "Copie"
           
            
        }
    }

}
</script>

<style>

</style>