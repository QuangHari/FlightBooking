<template>
    <div class="bg-white rounded-lg p-4 md:p-6 shadow-md flex flex-row">
      <!-- Flight Header -->
      <div class="flex items-center gap-2 mb-4">
        <span class="font-medium" style="color: #4f4939;">Qsuite</span>
        <InfoIcon class="w-4 h-4 text-gray-400" />
      </div>
  
      <!-- Flight Times and Route -->
      <div class="flex items-center justify-between mb-6 ml-9 self-center">
        <div class="space-y-1">
          <div class="text-2xl md:text-4xl font-light">{{ departureTime }}</div>
          <div class="text-sm text-gray-600">{{ departureAirport }}</div>
        </div>
  
        <div class="flex flex-col items-center px-2 md:px-4">
          <img 
            src="../../assets/MainLogo_shadow.png" 
            alt="QAirline" 
            class="h-6 mb-2"
          />
          <span class="text-xs md:text-sm text-gray-600 whitespace-nowrap">Non-stop, {{ duration }}</span>
        </div>
  
        <div class="space-y-1">
          <div class="text-2xl md:text-4xl font-light">{{ arrivalTime }}</div>
          <div class="text-sm text-gray-600">{{ arrivalAirport }}</div>
        </div>
      </div>
  
      <!-- Flight Details Button -->
    <button 
      @click="showDetails = true"
      class="text-sm text-gray-900 hover:text-[#d0c5a4] font-medium mb-6 underline ml-auto mr-8"
    >
      Flight details
    </button>
  
      <!-- Fare Options -->
      <div class="ml-auto grid grid-cols-2 gap-4">
        <button 
          @click="showFareDetails('economy')"
          class="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div class="text-sm text-gray-600 mb-1">Economy</div>
          <div class="text-lg md:text-2xl font-semibold">
            VND {{ economyPrice.toLocaleString() }}
          </div>
        </button>
        <button 
          @click="showFareDetails('business')"
          class="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div class="text-sm text-gray-600 mb-1">Business</div>
          <div class="text-lg md:text-2xl font-semibold">
            VND {{ businessPrice.toLocaleString() }}
          </div>
        </button>
      </div>
  
      <!-- Flight Details Modal -->
      <Teleport to="body">
        <div 
          v-if="showDetails"
          class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end"
          @click.self="showDetails = false"
        >
          <div class="bg-white w-full max-w-md h-full overflow-y-auto">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 md:p-6 border-b">
              <h2 class="text-xl font-semibold">Flight details</h2>
              <button 
                @click="showDetails = false"
                class="text-gray-400 hover:text-gray-600"
              >
                <X class="w-6 h-6" />
              </button>
            </div>
  
            <!-- Modal Content -->
            <div class="p-4 md:p-6">
              <h3 class="text-xl font-semibold mb-2">
                {{ departureCity }} to {{ arrivalCity }}
              </h3>
              <div class="text-gray-600 mb-6">{{ formattedDate }}</div>
  
              <!-- Timeline -->
              <div class="relative pl-8 border-l-2 border-gray-200">
                <!-- Departure -->
                <div class="mb-8 relative">
                  <div class="absolute -left-[41px] top-0 w-5 h-5 bg-white border-4 border-[#4f4939] rounded-full"></div>
                  <div class="text-lg font-medium">{{ departureTime }}</div>
                  <div class="font-medium">{{ departureCity }}</div>
                  <div class="text-gray-600">{{ departureAirportFull }}</div>
                </div>
  
                <!-- Flight Info -->
                <div class="mb-8 -ml-8">
                  <div class="flex items-center gap-2 mb-1">
                    <img 
                      src="../../assets/MainLogo_shadow.png" 
                      alt="QAirline" 
                      class="h-6"
                    />
                    <span class="text-gray-900">{{ duration }}</span>
                  </div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-medium">{{ flightNumber }}</span>
                    <span class="text-gray-600">- {{ aircraft }}</span>
                    <span class="text-[#4f4939]">- Qsuite</span>
                  </div>
                  <div class="text-gray-600">Operated by {{ operator }}</div>
                </div>
  
                <!-- Arrival -->
                <div class="relative">
                  <div class="absolute -left-[41px] top-0 w-5 h-5 bg-white border-4 border-[#4f4939] rounded-full"></div>
                  <div class="text-lg font-medium">{{ arrivalTime }}</div>
                  <div class="font-medium">{{ arrivalCity }}</div>
                  <div class="text-gray-600">{{ arrivalAirportFull }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
  
      <!-- Fare Details Modal -->
      <Teleport to="body">
        <div 
          v-if="selectedFare"
          class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          @click.self="selectedFare = null"
        >
          <div class="bg-white rounded-lg w-full max-w-xl overflow-hidden p-6">
            <div class="mb-6">
              <div class="text-sm text-gray-600">{{ getCurrentFare.flexibility }}</div>
              <h3 class="text-3xl font-light mb-4">{{ getCurrentFare.name }}</h3>
              <div class="flex justify-between items-baseline">
                <div class="text-sm text-gray-600">Total for all passengers</div>
                <div class="flex items-baseline gap-2">
                  <span class="text-lg text-gray-600">VND</span>
                  <span class="text-4xl font-light">{{ getCurrentFare.price.toLocaleString() }}</span>
                </div>
              </div>
            </div>
  
            <button 
              @click="$router.push('/checkout')"
              class="w-full bg-[#4f4939] hover:bg-[#d0c5a4] text-white rounded-full py-4 mb-6 transition-colors text-lg font-medium"
            >
              Select fare
            </button>
  
            <div class="flex items-center gap-2 mb-6">
              <Plane class="w-5 h-5" />
              <span>Earn {{ getCurrentFare.avios.toLocaleString() }} Avios</span>
            </div>
  
            <div class="text-lg mb-4">Benefits and fees per adult passenger</div>
            <div class="space-y-4">
              <div v-for="(benefit, index) in getCurrentFare.benefits" :key="index" class="flex items-center gap-3">
                <component :is="benefit.icon" class="w-6 h-6 text-gray-600" />
                <span class="text-gray-700">{{ benefit.text }}</span>
                <InfoIcon v-if="benefit.hasInfo" class="w-5 h-5 text-gray-400" />
              </div>
            </div>
  
            <div class="mt-8 pt-6 border-t text-center">
              <a href="#" class="text-[#4f4939] hover:text-[#d0c5a4] font-medium text-lg">
                Online-exclusive benefits
              </a>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { InfoIcon, X, Plane, Calendar, Ban, Briefcase, Luggage, Armchair, CreditCard } from 'lucide-vue-next'
  
  // Props definition
  const props = defineProps({
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    departureAirport: { type: String, required: true },
    arrivalAirport: { type: String, required: true },
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    departureAirportFull: { type: String, required: true },
    arrivalAirportFull: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: String, required: true },
    flightNumber: { type: String, required: true },
    aircraft: { type: String, required: true },
    operator: { type: String, required: true },
    economyPrice: { type: Number, required: true },
    businessPrice: { type: Number, required: true }
  })
  
  // Modal states
  const showDetails = ref(false)
  const selectedFare = ref(null)
  const selectedFareTab = ref('economy_convenience')
  
  // Computed date format
  const formattedDate = computed(() => {
    return new Date(props.date).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  })
  
  const fareOptions = [
    {
      type: 'economy_convenience',
      name: 'Economy Convenience',
      flexibility: 'Great flexibility',
      price: props.economyPrice,
      avios: Math.round(props.economyPrice * 1.268),
      benefits: [
        { icon: Calendar, text: 'Flexibility to make 2 changes', hasInfo: true },
        { icon: Ban, text: 'Cancellation within 24hrs of booking without fees', hasInfo: true },
        { icon: Briefcase, text: 'Checked baggage: 2 pieces, 23 kg each' },
        { icon: Luggage, text: 'Hand baggage: 1 piece, 7 kg' },
        { icon: Armchair, text: 'Standard Seat selection included', hasInfo: true },
        { icon: Armchair, text: 'Preferred Seat selection for a fee', hasInfo: true },
        { icon: CreditCard, text: 'Upgrade with Avios' }
      ]
    },
    {
      type: 'economy_comfort',
      name: 'Economy Comfort',
      flexibility: 'Unlimited flexibility',
      price: Math.round(props.economyPrice * 1.1162),
      avios: Math.round(props.economyPrice * 1.691),
      benefits: [
        { icon: Calendar, text: 'Flexibility to make unlimited changes', hasInfo: true },
        { icon: Ban, text: 'Cancel at anytime without fees' },
        { icon: Briefcase, text: 'Checked baggage: 2 pieces, 23 kg each' },
        { icon: Luggage, text: 'Hand baggage: 1 piece, 7 kg' },
        { icon: Armchair, text: 'Standard Seat selection included', hasInfo: true },
        { icon: Armchair, text: 'Preferred Seat selection included', hasInfo: true },
        { icon: CreditCard, text: 'Upgrade with Avios' }
      ]
    },
    {
      type: 'business',
      name: 'Business Comfort',
      flexibility: 'Ultimate comfort',
      price: props.businessPrice,
      avios: Math.round(props.businessPrice * 0.882),
      benefits: [
        { icon: Calendar, text: 'Flexibility to make unlimited changes', hasInfo: true },
        { icon: Ban, text: 'Cancel at anytime without fees' },
        { icon: Briefcase, text: 'Checked baggage: 2 pieces, 32 kg each' },
        { icon: Luggage, text: 'Hand baggage: 2 pieces, 7 kg each' },
        { icon: Armchair, text: 'Business Class seat selection included' },
        { icon: CreditCard, text: 'Upgrade with Avios to First Class where available' }
      ]
    }
  ]
  
  const getCurrentFare = computed(() => {
    const fareType = selectedFare.value === 'business' ? 'business' : 'economy_convenience'
    return fareOptions.find(fare => fare.type === fareType)
  })
  
  const showFareDetails = (type) => {
    selectedFare.value = type
    selectedFareTab.value = type === 'business' ? 'business' : 'economy_convenience'
  }
  </script>  
 
<script >
export default {
  name: "FlightCard",
};
</script>