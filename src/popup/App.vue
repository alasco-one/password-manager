<template>
 <div class="container">
    <b-row class="mb-2 mt-2">
          <b-col>
              <div class="d-inline-block shadow-lg m-auto" >
                  <b-avatar square rounded-lg class="rounded-lg" size="50px"></b-avatar>
              </div>
          </b-col>
    </b-row>
    <auth v-if="!authenticated" ></auth>
    <password v-else></password>
 </div>
</template>

<script>
import Auth from '@/components/Auth.vue'
//import HelloWorld from '@/components/HelloWorld.vue'
import Password from '@/components/Password.vue'

export default {
  name: 'App',
  components: { 
    "auth" : Auth, 
    "password" : Password,
  }, 
  mounted(){
    console.log("je suis Alasco");
  }, 
  computed : {
    authenticated(){
      return this.$root.authenticated;
    }
  }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
