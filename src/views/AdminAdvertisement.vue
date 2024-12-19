<template>
<div class="min-h-screen bg-gray-100">
    <AdminNavbar />
    <div class="container mx-auto px-4 py-8 mt-16">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Publish Advertisement</h1>
        <PublishAdForm/>
    </div>
</div>
</template>

<script setup lang = "ts">
import AdminNavbar from '@/components/Adminpage/AdminNavbar.vue';
import PublishAdForm from '@/components/Adminpage/PublishAdForm.vue';
</script>

<script lang = "ts">
export default {
  name: 'AdminAdvertisement',
};
</script>