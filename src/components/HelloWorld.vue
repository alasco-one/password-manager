<template>
  <div>
    <p>{{ defaultText }}</p>
    <b-button>OK</b-button>
    <p class="text-primary"  > Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam consequuntur tenetur deleniti harum aliquam quas aut maxime placeat? Eius optio dolor ipsa et quia voluptas consequuntur repellat esse ab explicabo.</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted () {
    browser.runtime.sendMessage({})
  },
  computed: {
    defaultText () {
      return browser.i18n.getMessage('extName')
    }
  }
}
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
