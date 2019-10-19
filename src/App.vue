<template>
    <div id="app">
        <div>
            <h1>Demo App</h1>

            <p>
                <router-link :to="{ name: 'AppHome' }">Home</router-link> |
                <router-link :to="{ name: 'PricingHome' }">Pricing</router-link>
            </p>

            <div class="container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'app',
    components: {
    },
  }
</script>

<style scoped>

</style>
