<template>
    <div class="min-h-screen bg-gray-100">
          <Navbar />
          <div class="container mx-auto px-4 py-8 mt-16">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">Check Out</h1>
            <CustomerDetailsCard />
            <FlightCheckoutCard
                departureCity="Doha"
                arrivalCity="New York"
                departureTime="01:20"
                arrivalTime="08:00"
                departureAirport="Hamad International Airport (DOH)"
                arrivalAirport="John F Kennedy Airport (JFK)"
                flightNumber="QR703"
                plane="Boeing 777-300ER"
                operator="Operated by QAirline"
                :flightDate="new Date('2024-12-20')"
                :price="3760"
                duration="14h 40m"
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
    </script>
    
    <script lang = "ts">
    export default {
        name: 'CheckOut',
    };
    </script>