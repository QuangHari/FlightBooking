<template>
    <div class="min-h-screen bg-gray-100">
        <ProfileNavbar />
        <div class="container mx-auto px-4 py-8 mt-16">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">My Personal Information</h1>
            <ProfileCard
                v-model:username="username"
                v-model:email="email"
                v-model:firstName="firstName"
                v-model:lastName="lastName"
            />
        </div>
    </div>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import ProfileCard from '../components/Profilepage/ProfileCard.vue'
  import ProfileNavbar from '../components/Profilepage/ProfileNavbar.vue';
  
  const username = ref<string>('Vipnigga')
  const email = ref<string>('john@vip.com')
  const firstName = ref<string>('vip')
  const lastName = ref<string>('Nigga')
  </script>

<script lang = "ts">
export default {
    name: 'ProfileInformation',
};
</script>