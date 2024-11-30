<template>
    <div class="min-h-screen bg-gray-100">
      <Navbar />
      <div class="container mx-auto px-4 py-8 mt-16">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Available Flights</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FlightCard
            v-for="flight in flights"
            :key="flight.flightNumber"
            v-bind="flight"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import Navbar from '../components/shared/Navbar.vue'
  import FlightCard from '../components/Flightspage/FlightCard.vue'
  
  interface Flight {
    departureTime: string
    arrivalTime: string
    departureAirport: string
    arrivalAirport: string
    departureCity: string
    arrivalCity: string
    departureAirportFull: string
    arrivalAirportFull: string
    duration: string
    date: string
    flightNumber: string
    aircraft: string
    operator: string
    economyPrice: number
    businessPrice: number
  }
  
  const flights = ref<Flight[]>([
    {
      departureTime: "01:20",
      arrivalTime: "08:00",
      departureAirport: "DOH",
      arrivalAirport: "JFK",
      departureCity: "Doha",
      arrivalCity: "New York",
      departureAirportFull: "Hamad International Airport (DOH)",
      arrivalAirportFull: "John F Kennedy Airport (JFK)",
      duration: "14h 40m",
      date: "2024-12-20",
      flightNumber: "QR703",
      aircraft: "Boeing 777-300ER",
      operator: "QAirline",
      economyPrice: 3960,
      businessPrice: 13290
    },
    {
      departureTime: "09:15",
      arrivalTime: "14:30",
      departureAirport: "DOH",
      arrivalAirport: "LHR",
      departureCity: "Doha",
      arrivalCity: "London",
      departureAirportFull: "Hamad International Airport (DOH)",
      arrivalAirportFull: "London Heathrow Airport (LHR)",
      duration: "7h 15m",
      date: "2024-12-21",
      flightNumber: "QR001",
      aircraft: "Airbus A350-1000",
      operator: "QAirline",
      economyPrice: 2800,
      businessPrice: 9500
    },
    {
      departureTime: "22:40",
      arrivalTime: "06:10",
      departureAirport: "DOH",
      arrivalAirport: "SYD",
      departureCity: "Doha",
      arrivalCity: "Sydney",
      departureAirportFull: "Hamad International Airport (DOH)",
      arrivalAirportFull: "Sydney Kingsford Smith Airport (SYD)",
      duration: "13h 30m",
      date: "2024-12-22",
      flightNumber: "QR908",
      aircraft: "Boeing 777-300ER",
      operator: "QAirline",
      economyPrice: 4200,
      businessPrice: 14500
    }
  ])
  </script>
  
  <script lang="ts">
  export default {
    name: 'Flights',
  }
  </script>
  
  