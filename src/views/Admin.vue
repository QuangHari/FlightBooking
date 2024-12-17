<template>
    <AdminNavbar/>
    <div class="content">
        <FlightInfoForm/>
        <PlaneInfoForm/>
        <PublishAdForm/>
        <EditForm/>
    </div>
</template>

<style scoped>
.content {
    margin-top: 80px; /* Adjust this value based on the height of your navbar */
}
</style>

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