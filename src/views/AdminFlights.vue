<template>
  <div class="min-h-screen bg-gray-100">
    <AdminNavbar />
    <div class="container mx-auto px-4 py-8 mt-16">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">All Flights Available</h1>
        <button @click="openAddFlightModal"
          class="bg-[#4f4939] hover:bg-[#d0c5a4] text-white px-6 py-2 rounded-full font-medium transition-colors">
          Add Flight
        </button>
      </div>
      <div class="grid grid-cols-1 gap-6">
        <AdminFlightCard v-for="flight in flights" 
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

    <!-- Add Flight Modal -->
    <Teleport to="body">
      <div v-if="showAddFlightModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden"
        @click.self="closeAddFlightModal">
        <div class="bg-white rounded-lg overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col">
          <div class="flex justify-between items-center p-4 border-b">
            <h2 class="text-xl font-semibold text-[#4f4939]">Add New Flight</h2>
            <button @click="closeAddFlightModal" class="text-gray-500 hover:text-gray-700">
              <XIcon class="w-6 h-6" />
            </button>
          </div>
          <div class="p-4 overflow-y-auto flex-grow">
            <FlightInfoForm @flight-added="handleFlightAdded" />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AdminNavbar from '../components/Adminpage/AdminNavbar.vue'
import AdminFlightCard from '../components/Adminpage/AdminFlightCard.vue'
import FlightInfoForm from '../components/Adminpage/FlightInfoForm.vue'
import { XIcon } from 'lucide-vue-next'
import { getAllFlight } from '../api/flight'
import dayjs from 'dayjs';


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

// const flights = ref<Flight[]>([])
const flights = ref<Flight[]>([])

const showAddFlightModal = ref(false)

const openAddFlightModal = () => {
  showAddFlightModal.value = true
  document.body.style.overflow = 'hidden'
}



const closeAddFlightModal = () => {
  showAddFlightModal.value = false
  document.body.style.overflow = ''
}

const handleFlightAdded = () => {
  
  
  getAllData()
}

const getAllData = async () => {
  const response: Flight[] = await getAllFlight(); 
  flights.value = response.map((flight: Flight) => ({
    ...flight,
    Date: dayjs(flight.DepartureDateTime).format('YYYY-MM-DD'),  // Định dạng ngày khởi hành
    Duration: calculateDuration(flight.DepartureDateTime, flight.ArrivalDateTime),  // Tính toán thời gian bay
    DepartureDateTime: formatTime(flight.DepartureDateTime),
    ArrivalDateTime: formatTime(flight.ArrivalDateTime),
  }));

  // flights.value = response
  
}
onMounted(() => {
  getAllData()
  if (showAddFlightModal.value) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<script lang="ts">
export default {
  name: 'AdminFlights',
}
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #4f4939 #f3f4f6;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f3f4f6;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #4f4939;
  border-radius: 20px;
  border: 2px solid #f3f4f6;
}
</style>