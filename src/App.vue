<template>
    <div id="app" class="bg-gray-100">
        <div>
            <h1 class="text-5xl text-center">Test App</h1>

            <div class="text-right px-10 text-2xl">
                <router-link :to="{ name: 'Home' }">Home</router-link> |
                <router-link :to="{ name: 'Pricing' }">Pricing</router-link> |
                <router-link :to="{ name: 'PaymentInfo' }">Payment Information</router-link>
            </div>

            <div class="container max-w-2xl mx-auto bg-white shadow-lg rounded-lg min-h-screen py-4 px-8 text-left">
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
