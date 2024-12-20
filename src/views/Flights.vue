<template>
    <div class="min-h-screen bg-gray-100">
      <Navbar />
      <div class="container mx-auto px-4 py-8 mt-16">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Available Flights</h1>
        <FlightSearchBar class="mb-8" />
        <div class="grid grid-cols-1 gap-6">
          <FlightCard v-for="flight in flights" 
        :key="flight.FlightID" 
        :departureTime = "flight.DepartureDateTime" 
        :arrivalTime = "flight.ArrivalDateTime"
        :departureAirport = "flight.OriginAirportCode"
        :arrivalAirport = "flight.DestinationAirportCode"
        :departureCity = "flight.OriginAirport.Location"
        :arrivalCity = "flight.DestinationAirport.Location"
        :departureAirportFull = "flight.OriginAirport.AirportName"
        :arrivalAirportFull = "flight.DestinationAirport.AirportName"
        :duration = "flight.Duration"
        :date = "flight.Date"
        :flightNumber = "flight.FlightNumber"
        :aircraft = "flight.Aircraft.Name"
        :operator = "'Airline'"
        :economyPrice = "flight.EconomyPrice"
        :businessPrice = "flight.BusinessPrice"
        />
        </div>
      </div>
    </div>
    <FooterBar/>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import Navbar from '../components/shared/Navbar.vue'
  import FlightCard from '../components/Flightspage/FlightCard.vue'
  import FooterBar from '../components/shared/FooterBar.vue';
  import FlightSearchBar from '../components/Flightspage/FlightSearchBar.vue';
  import { getAllFlight,searchFlights } from '../api/flight';
  import dayjs from 'dayjs';
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const from = route.query.from || ''
  const to = route.query.to || ''
  const departureDate = route.query.departureDate || ''

  const formatTime = (isoString: string): string => {
    return dayjs(isoString).format('HH:mm');
  };


const calculateDuration = (departure: string, arrival: string): string => {
  const departureTime = dayjs(departure);
  const arrivalTime = dayjs(arrival);
  
  let hours = arrivalTime.diff(departureTime, 'hour');
  let minutes = arrivalTime.diff(departureTime, 'minute') % 60;

  return `${hours}h ${minutes}m`;
};
  interface Flight {
  FlightID: number,
  FlightNumber: string,
  DepartureDateTime: string,
  ArrivalDateTime: string,
  OriginAirportCode: string,
  DestinationAirportCode: string,
  Date: string,
  Duration: string,
  AvailableSeats: number,
  AircraftID: number,
  BusinessPrice: number,
  BusinessSeats: number,
  EconomyPrice: number,
  EconomySeats: number,
  OriginAirport: any,
  DestinationAirport: any,
  Aircraft: any,
  Seats: any
}
  const flights = ref<Flight[]>([])


  const fetchAllData = async () => {
    const response: Flight[] = await getAllFlight(); 
    flights.value = response.map((flight: Flight) => ({
      ...flight,
      Date: dayjs(flight.DepartureDateTime).format('YYYY-MM-DD'),  // Định dạng ngày khởi hành
      Duration: calculateDuration(flight.DepartureDateTime, flight.ArrivalDateTime),  // Tính toán thời gian bay
      DepartureDateTime: formatTime(flight.DepartureDateTime),
      ArrivalDateTime: formatTime(flight.ArrivalDateTime),
    }));

    // const response: Flight[] = await searchFlights(from, to, departureDate);
  }

  onMounted(() => {
    fetchAllData()
  })
  </script>
  
  <script lang="ts">
  export default {
    name: 'Flights',
  }
  </script>
  
  