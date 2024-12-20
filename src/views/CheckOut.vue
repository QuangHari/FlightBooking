<template>
    <div class="min-h-screen bg-gray-100">
          <Navbar />
          <div class="container mx-auto px-4 py-8 mt-16">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">Check Out</h1>
            <CustomerDetailsCard />
            <FlightCheckoutCard
                :departureCity= flightDetails.departureCity
                :arrivalCity=flightDetails.arrivalCity
                :departureTime=flightDetails.departureTime
                :arrivalTime=flightDetails.arrivalTime
                :departureAirport=flightDetails.departureAirport
                :arrivalAirport=flightDetails.arrivalAirport
                :flightNumber=flightDetails.flightNumber
                :plane=flightDetails.aircraft
                :operator=flightDetails.operator
                :flightDate=flightDetails.date
                :price=flightDetails.price
                :duration=flightDetails.duration
            />
          </div>
        </div>
        <FooterBar/>
    </template>
    
    <script setup lang = "ts">
    import FlightCheckoutCard from '../components/Checkoutpage/FlightCheckoutCard.vue';
    import CustomerDetailsCard from '../components/Checkoutpage/CustomerDetailsCard.vue'
    import Navbar from '../components/shared/Navbar.vue';
    import FooterBar from '../components/shared/FooterBar.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const flightDetails = route.query as { [key: string]: string };

    // console.log(flightDetails.Price);

 

    </script>
    
    <script lang = "ts">
    export default {
        name: 'CheckOut',
    };
    </script>