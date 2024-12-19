<template>
    <AdminNavbar/>
    <div class="w-full px-4 py-8 mt-16 bg-gray-50">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Admin settings</h1>
        <FlightInfoForm id="add-flight"/>
        <PlaneInfoForm id="add-plane"/>
        <PublishAdForm id="publish-ad"/>
        <EditForm id="edit-flight-info"/>
    </div>
</template>

<script setup lang = "ts">
import FlightInfoForm from '../components/Adminpage/FlightInfoForm.vue';
import PlaneInfoForm from '../components/Adminpage/PlaneInfoForm.vue';
import PublishAdForm from '../components/Adminpage/PublishAdForm.vue'
import EditForm from '../components/Adminpage/EditForm.vue';
import AdminNavbar from '../components/Adminpage/AdminNavbar.vue';
</script>

<script lang = "ts">
export default {
  name: 'Admin',
};
</script>

