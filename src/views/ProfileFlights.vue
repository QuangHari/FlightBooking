<template>
    <div class="min-h-screen bg-gray-100">
        <ProfileNavbar />
        <div class="container mx-auto px-4 py-8 mt-16">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">My Flights</h1>
            <div class="grid grid-cols-1 gap-6">
                <ProfileFlightCard
                    v-for="flight in flights"
                    :bookingId = "flight.BookingID"
                    :departureTime = "flight.Flight.DepartureDateTime"
                    :arrivalTime = "flight.Flight.ArrivalDateTime"
                    :departureAirport="flight.Flight.OriginAirport.AirportCode"
                    :arrivalAirport="flight.Flight.DestinationAirport.AirportCode"
                    :departureCity="flight.Flight.OriginAirport.Location"
                    :arrivalCity="flight.Flight.DestinationAirport.Location"
                    :departureAirportFull="flight.Flight.OriginAirport.AirportName"
                    :arrivalAirportFull="flight.Flight.DestinationAirport.AirportName"
                    :duration = "'not done yet'"
                    :date ="flight.Flight.DepartureDateTime"
                    :flightNumber = "flight.Flight.FlightNumber"
                    :aircraft = "flight.Flight.Aircraft.Name"
                    :operator = "'QAirline'"
                    :gender = "flight.Gender"
                    :firstName = "flight.FirstName"
                    :lastName = "flight.LastName"
                    :dateOfBirth = "'1999-01-01'"
                    :nationality = "flight.National"
                    :passportNumber = "flight.PassportNumber"
                    :phoneNumber = "flight.PhoneNumber"
                    :address = "flight.Address"
                    @booking-cancelled = "handleCancellation"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang = "ts">
    import ProfileNavbar from '../components/Profilepage/ProfileNavbar.vue';
    import ProfileFlightCard from '../components/Profilepage/ProfileFlightCard.vue';
    import {getAllBookingByUserId} from '../api/booking'
    import { onMounted, ref } from 'vue'

  
  // const flights = ref<Flight[]>([
  //   {
  //     departureTime: "01:20",
  //     arrivalTime: "08:00",
  //     departureAirport: "DOH",
  //     arrivalAirport: "JFK",
  //     departureCity: "Doha",
  //     arrivalCity: "New York",
  //     departureAirportFull: "Hamad International Airport (DOH)",
  //     arrivalAirportFull: "John F Kennedy Airport (JFK)",
  //     duration: "14h 40m",
  //     date: "2024-12-20",
  //     flightNumber: "QR703",
  //     aircraft: "Boeing 777-300ER",
  //     operator: "QAirline",
  //     economyPrice: 3960000,
  //     businessPrice: 13290000,
  //     gender: "Male",
  //     firstName: "John",
  //     lastName: "Smith",
  //     dateOfBirth: "1990-01-01",
  //     nationality: "USA",
  //     passportNumber: "08084583453",
  //     phoneNumber: "47593745937457934",
  //     address: "555Avengers Tower"
  //   },
  //   {
  //     departureTime: "09:15",
  //     arrivalTime: "14:30",
  //     departureAirport: "DOH",
  //     arrivalAirport: "LHR",
  //     departureCity: "Doha",
  //     arrivalCity: "London",
  //     departureAirportFull: "Hamad International Airport (DOH)",
  //     arrivalAirportFull: "London Heathrow Airport (LHR)",
  //     duration: "7h 15m",
  //     date: "2024-12-21",
  //     flightNumber: "QR001",
  //     aircraft: "Airbus A350-1000",
  //     operator: "QAirline",
  //     economyPrice: 2800000,
  //     businessPrice: 9500000,
  //     gender: "Male",
  //     firstName: "John",
  //     lastName: "Doe",
  //     dateOfBirth: "1990-01-01",
  //     nationality: "UK",
  //     passportNumber: "08084583453",
  //     phoneNumber: "47593745937457934",
  //     address: "555Avengers Tower"
  //   },
  //   {
  //     departureTime: "22:40",
  //     arrivalTime: "06:10",
  //     departureAirport: "DOH",
  //     arrivalAirport: "SYD",
  //     departureCity: "Doha",
  //     arrivalCity: "Sydney",
  //     departureAirportFull: "Hamad International Airport (DOH)",
  //     arrivalAirportFull: "Sydney Kingsford Smith Airport (SYD)",
  //     duration: "13h 30m",
  //     date: "2024-12-22",
  //     flightNumber: "QR908",
  //     aircraft: "Boeing 777-300ER",
  //     operator: "QAirline",
  //     economyPrice: 4200000,
  //     businessPrice: 14500000,
  //     gender: "Male",
  //     firstName: "John",
  //     lastName: "Nig",
  //     dateOfBirth: "1990-01-01",
  //     nationality: "USA",
  //     passportNumber: "08084583453",
  //     phoneNumber: "47593745937457934",
  //     address: "555Avengers Tower"
  //   }
  // ])
  const flights = ref<any[]>([])
  const passengerId = Number(localStorage.getItem("passengerId"))

  const fetchAllData = async () => {
    try {
      const response = await getAllBookingByUserId(passengerId);
      const cancelledFlights = response.filter((booking: { PaymentStatus: string; }) => booking.PaymentStatus !== 'Cancelled');
    
    // Cập nhật lại flights.value với các chuyến bay đã hủy
    flights.value = cancelledFlights;
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  }

  const handleCancellation = async () => {
    fetchAllData()
  }
  onMounted(() => {
    fetchAllData()
  })
</script>

<script lang = "ts">
export default {
    name: 'ProfileFlights',
};
</script>