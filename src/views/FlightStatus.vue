<template>
<Navbar />
<div>
    <div class="flex justify-center overflow-hidden mb-4">
        <img src="../assets/bannerVIP.jpg" alt="mainbanner" class="w-full transform transition-transform duration-500 hover:scale-110" />
    </div>
    <StatusSearch />
</div>
<div class="mb-4">
    <FooterBar/>
</div>
</template>

<script setup lang = "ts">
    import StatusSearch from '@/components/Statuspage/StatusSearch.vue';
    import StatusCard from '@/components/Statuspage/StatusCard.vue';
    import Navbar from '@/components/shared/Navbar.vue';
    import FooterBar from '@/components/shared/FooterBar.vue';
</script>

<script lang = "ts">
    export default {
        name: 'FlightStatus',
    };
</script>

