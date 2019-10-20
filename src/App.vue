<template>
    <div id="app" class="bg-gray-200">
        <div>
            <h1 class="text-5xl text-center">Test App</h1>

            <div class="text-right px-10 text-2xl">
                <router-link class="px-2" :to="{ name: 'Home' }">Home</router-link> |
                <router-link class="px-2" :to="{ name: 'Pricing' }">Pricing</router-link> |
                <router-link class="px-2" :to="{ name: 'PaymentInfo' }">Payment Information</router-link>
            </div>

            <div class="container mx-auto py-4 px-8 text-left">
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

<style scoped lang="scss">
    .router-link-exact-active {
        &.active-route {
            @apply border-b-4 border-indigo-500 text-indigo-600;
        }
    }
</style>
