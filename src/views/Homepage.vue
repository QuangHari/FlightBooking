<template>
    <Navbar />
    <div>
      <div class="flex justify-center overflow-hidden">
        <img src="../assets/bannerVIP.jpg" alt="mainbanner" class="w-full transform transition-transform duration-500 hover:scale-110" />
      </div>
      <FlightSearch />
    </div>
    <div class="bg-[#f8f8f8] px-6 py-4">
      <div class="text-4xl font-light text-gray-800 mb-2">
        Start planning your next trip
      </div>
      <div class="text-lg text-gray-600">
        Thinking of travelling somewhere soon? Here are some options to help you get started.
      </div>
    </div>
    <div class="flex flex-wrap justify-center items-start gap-4 bg-gray-100 p-6">
      <Card 
      class="w-[300px] h-[300px]"
      :imageSrc="Card1"
      title="Explore our offers"
      subtitle="Find great fares"/>
      <Card 
      class="w-[300px] h-[300px]"
      :imageSrc="Card2"
      title="Stop over in Ha Noi from $25 per person"
      subtitle="Discover more"/>
      <Card 
      class="w-[300px] h-[300px]"
      :imageSrc="Card3"
      title="Get your privilege club credit card"
      subtitle="Learn more"/>
      <Card
      class="w-[300px] h-[300px]"
      :imageSrc="Card4"
      title="Explore more destinations"
      subtitle="See our network"
      />
    </div>
    <FooterBar/>
  </template>

<script lang = "ts">
export default {
  name: 'HomePage',
};
</script>


<script setup lang = "ts" >
  import Navbar from '../components/shared/Navbar.vue';
  import FlightSearch from '../components/Homepage/FlightSearch.vue';
  import Card from '../components/Homepage/CardItem.vue';
  import FooterBar from '../components/shared/FooterBar.vue';

  import Card1 from '@/assets/banner2.jpg';
  import Card2 from '@/assets/Chua1cot.jpg';
  import Card3 from '@/assets/CoHN.jpg';
  import Card4 from '@/assets/CauTheHuc.jpg';
  
</script>
<style scoped>
</style>