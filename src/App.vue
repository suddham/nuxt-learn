<template>
    <div id="app" class="bg-gray-200">
        <div>
<!--            <h1 class="text-5xl text-center">1 Cart Reloaded</h1>-->

            <div class="p-2 md:px-8 container mx-auto">
                <!-- page header / nav bar-->
                <div class="text-right text-2xl py-2">
                    <router-link class="px-2" :to="{ name: 'Home' }">Home</router-link> |
                    <router-link class="px-2" :to="{ name: 'Pricing' }">Pricing</router-link> |
                    <router-link class="px-2" :to="{ name: 'PaymentInfo' }">Payment Information</router-link>
                </div>

                <!-- body -->
                <div>
                    <router-view ></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'app'
  }
</script>

<style scoped lang="scss">
    .router-link-exact-active {
        &.active-route {
            @apply border-b-4 border-indigo-500 text-indigo-600;
        }
    }
</style>
