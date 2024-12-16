<template>
  <div class="min-h-screen bg-gray-50 p-4 relative">
    <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover">
      <source src="../../assets/HNfootage2.mov" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl relative">
      <!-- Navigation Tabs -->
      <nav class="grid grid-cols-4 border-b">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index"
          class="flex items-center justify-center gap-2 py-6 px-4 text-lg transition-colors"
          :class="[
            activeTab === index 
              ? 'bg-[#d0c5a4] text-[#4f4939]' 
              : 'hover:bg-gray-50 text-gray-700',
            index === 0 ? 'rounded-tl-3xl' : '',
            index === tabs.length - 1 ? 'rounded-tr-3xl' : ''
          ]"
          @click="activeTab = index"
        >
          <component :is="tab.icon" class="w-5 h-5" />
          {{ tab.label }}
        </button>
      </nav>

      <!-- Book a Flight Tab -->
      <div v-if="activeTab === 0" class="p-8">
        <div class="flex gap-8 mb-6">
          <label 
        v-for="(type, index) in flightTypes" 
        :key="index" 
        class="flex items-center gap-2 cursor-pointer"
          >
        <div class="relative flex items-center">
            <input
            type="radio"
            :value="type"
            v-model="selectedFlightType"
            class="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none cursor-pointer checked:border-[#4f4939] checked:border-8 transition-all"
          />
        </div>
        <span class="text-lg text-gray-700">{{ type }}</span>
          </label>
        </div>

        <!-- Flight Search Form -->
        <div class="grid grid-cols-[1fr,auto,1fr,1fr,1fr] gap-4 items-center mb-6">
          <div class="space-y-1 relative">
        <label class="text-sm text-gray-500">From</label>
        <input 
          v-model="fromInput"
          type="text" 
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
          placeholder="City or airport"
          @focus="showFromDropdown = true"
          @blur="hideFromDropdown"
        />
        <div v-if="showFromDropdown" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div 
            v-for="(option, index) in fromOptions" 
            :key="index" 
            @mousedown="selectFromOption(option)"
            class="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ option }}
          </div>
        </div>
          </div>

          <button class="p-2 hover:bg-gray-100 rounded-full">
        <ArrowLeftRight class="w-5 h-5 text-gray-400" />
          </button>

          <div class="space-y-1 relative">
        <label class="text-sm text-gray-500">To</label>
        <input 
          v-model="toInput"
          type="text" 
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
          placeholder="City or airport"
          @focus="showToDropdown = true"
          @blur="hideToDropdown"
        />
        <div v-if="showToDropdown" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div 
            v-for="(option, index) in toOptions" 
            :key="index" 
            @mousedown="selectToOption(option)"
            class="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ option }}
          </div>
        </div>
          </div>

        <div class="space-y-1">
        <label class="text-sm text-gray-500">{{ selectedFlightType === 'Return' ? 'Departure' : 'Date' }}</label>
        <Datepicker 
          v-model="departureDate"
          :enable-time-picker="false"
          placeholder="Select date"
          input-class-name="w-full p-3 text-lg border-0 focus:ring-0"
        />
        </div>

        <div v-if="selectedFlightType === 'Return'" class="space-y-1">
        <label class="text-sm text-gray-500">Return</label>
        <Datepicker 
          v-model="returnDate"
          :enable-time-picker="false"
          placeholder="Select date"
          input-class-name="w-full p-3 text-lg border-0 focus:ring-0"
        />
        </div>
        </div>

        <!-- Passengers Selection -->
        <div class="flex items-center justify-between">
          <div class="relative">
        <button 
          ref="passengerRef"
          @click.stop="isPassengersOpen = !isPassengersOpen"
          class="flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-50"
        >
          <Users2 class="w-5 h-5 text-gray-500" />
          <span class="text-lg">{{ passengers }} Passenger{{ passengers !== 1 ? 's' : '' }} {{ cabinClass }}</span>
          <!-- <ChevronDown class="w-5 h-5 text-gray-400" :class="{ 'rotate-180': isPassengersOpen }" /> -->
        </button>

        <!-- Passengers Dropdown -->
        <div 
          v-if="isPassengersOpen"
          class="fixed inset-x-0 top-auto bottom-0 md:absolute md:top-full md:left-0 md:bottom-auto mt-2 w-full md:w-80 bg-white rounded-lg shadow-lg border p-4 z-50"
        @click.stop>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
          <span>Passengers</span>
          <div class="flex items-center gap-3">
            <button 
              @click="passengers = Math.max(1, passengers - 1)"
              class="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
            >
              <Minus class="w-4 h-4" />
            </button>
            <span class="w-8 text-center">{{ passengers }}</span>
            <button 
              @click="passengers++"
              class="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
            >
              <Plus class="w-4 h-4" />
            </button>
          </div>
            </div>
            <div class="space-y-2">
          <label class="text-sm text-gray-500">Cabin class</label>
          <select 
            v-model="cabinClass"
            class="w-full p-2 border rounded-lg"
          >
            <option>Economy</option>
            <option>Business</option>
            <option>First Class</option>
          </select>
            </div>
          </div>
        </div>
          </div>

          <div class="flex items-center gap-4">
        <button class="text-[#4f4939] hover:text-[#d0c5a4] font-medium">
          + Add promo code
        </button>
        <router-link 
          :to="{
          path: '/flights',
          query: {
            from: fromInput,
            to: toInput,
            departureDate: departureDate,
            returnDate: selectedFlightType === 'Return' ? returnDate : null,
            passengers: passengers,
            cabinClass: cabinClass
          }
          }" 
          class="bg-[#4f4939] hover:bg-[#d0c5a4] text-white px-8 py-3 rounded-full font-medium"
          @click="console.log({
          from: fromInput,
          to: toInput,
          departureDate: departureDate,
          returnDate: selectedFlightType === 'Return' ? returnDate : null,
          passengers: passengers,
          cabinClass: cabinClass
          })"
        >
          Search flights
        </router-link>
          </div>
        </div>
      </div>

      <!-- Stopover / Packages Tab -->
      <div v-if="activeTab === 1" class="p-8">
        <!-- Sub Navigation -->
        <div class="border-b mb-6">
          <div class="flex gap-8">
            <button 
              v-for="(option, index) in ['Ha Noi stopover', 'Flights + Hotels']"
              :key="index"
              class="px-1 py-4 border-b-2 transition-colors"
              :class="[
                stopoverTab === index 
                  ? 'border-[#4f4939] text-[#4f4939]' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              ]"
              @click="stopoverTab = index"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <div v-if="stopoverTab === 0">
          <p class="text-gray-600 mb-6">
            Explore Ha Noi with just $25 a day staying in the best hotels.
          </p>

          <!-- Stopover Search Form -->
          <div class="grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-6">
            <div class="space-y-1">
              <label class="text-sm text-gray-500">From</label>
              <input 
                type="text" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                placeholder="City or airport"
              />
            </div>

            <button class="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeftRight class="w-5 h-5 text-gray-400" />
            </button>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">To</label>
              <input 
                type="text" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                placeholder="City or airport"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="space-y-1">
              <label class="text-sm text-gray-500">Departure</label>
              <Datepicker 
              :enable-time-picker="false"
              placeholder="Select date"
              input-class-name="w-full p-3 text-lg border-0 focus:ring-0"
            />
            </div>
            <div class="space-y-1">
              <label class="text-sm text-gray-500">Return</label>
               <Datepicker 
               :enable-time-picker="false"
               placeholder="Select date"
               input-class-name="w-full p-3 text-lg border-0 focus:ring-0"
               />
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-lg mb-4">When would you like to add a stop in Ha Noi during your journey?</h3>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="departure"
                  v-model="stopoverType"
                  class="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none cursor-pointer checked:border-[#4f4939] checked:border-8 transition-all"
                />
                <span>Departure</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="return"
                  v-model="stopoverType"
                  class="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none cursor-pointer checked:border-[#4f4939] checked:border-8 transition-all"
                />
                <span>Return</span>
              </label>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-lg mb-4">How many days would you like to stay in Ha Noi?</h3>
            <div class="flex items-center gap-4">
              <button 
                @click="stopoverDays = Math.max(1, stopoverDays - 1)"
                class="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-gray-50"
              >
                <Minus class="w-5 h-5" />
              </button>
              <span class="w-10 text-center text-lg">{{ stopoverDays }}</span>
              <button 
                @click="stopoverDays++"
                class="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-gray-50"
              >
                <Plus class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-end gap-4">
            <button class="text-[#4f4939] hover:text-[#d0c5a4] font-medium">
              + Add promo code
            </button>
            <router-link to="/flights" class="bg-[#4f4939] hover:bg-[#d0c5a4] text-white px-8 py-3 rounded-full font-medium">
              Search flights
            </router-link>
          </div>
        </div>
      </div>

      <!-- Manage / Check in Tab -->
      <div v-if="activeTab === 2" class="p-8">
        <!-- Sub Navigation -->
        <div class="border-b mb-6">
          <div class="flex gap-8">
            <button 
              v-for="(option, index) in ['Manage booking', 'Check in']"
              :key="index"
              class="px-1 py-4 border-b-2 transition-colors"
              :class="[
                manageTab === index 
                  ? 'border-[#4f4939] text-[#4f4939]' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              ]"
              @click="manageTab = index"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-[1fr,1fr] gap-4 items-center">
          <div class="space-y-1">
            <label class="text-sm text-gray-500">Booking reference</label>
            <input 
              type="text" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
              placeholder="Enter booking reference"
            />
          </div>
          <div class="space-y-1">
            <label class="text-sm text-gray-500">Last name</label>
            <input 
              type="text" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button class="bg-[#4f4939] hover:bg-[#d0c5a4] text-white px-8 py-3 rounded-full font-medium">
            Retrieve booking
          </button>
        </div>
      </div>

      <!-- Flight Status Tab -->
      <div v-if="activeTab === 3" class="p-8">
        <!-- Sub Navigation -->
        <div class="border-b mb-6">
          <div class="flex gap-8">
            <button 
              v-for="(option, index) in ['By route', 'By flight number']"
              :key="index"
              class="px-1 py-4 border-b-2 transition-colors"
              :class="[
                statusTab === index 
                  ? 'border-[#4f4939] text-[#4f4939]' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              ]"
              @click="statusTab = index"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <div v-if="statusTab === 0" class="grid grid-cols-3 gap-4 items-end">
          <div class="space-y-1">
            <label class="text-sm text-gray-500">From</label>
            <input 
              type="text" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
              placeholder="City or airport"
            />
          </div>
          <div class="space-y-1">
            <label class="text-sm text-gray-500">To</label>
            <input 
              type="text" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
              placeholder="City or airport"
            />
          </div>
          <div class="space-y-1">
            <label class="text-sm text-gray-500">Date</label>
            <Datepicker 
              :enable-time-picker="false"
              placeholder="Select date"
              input-class-name="w-full p-3 text-lg border-0 focus:ring-0"
            />
          </div>
        </div>

        <div v-else class="grid grid-cols-2 gap-4 items-end">
          <div class="space-y-1">
            <label class="text-sm text-gray-500">Flight number</label>
            <input 
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
              placeholder="Enter flight number"
            />
          </div>
          <div class="space-y-1">
            <label class="text-sm text-gray-500">Date</label>
            <Datepicker 
              :enable-time-picker="false"
              placeholder="Select date"
              input-class-name="w-full p-3 text-lg border-0 focus:ring-0"
            />
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button class="bg-[#4f4939] hover:bg-[#d0c5a4] text-white px-8 py-3 rounded-full font-medium">
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang = "ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  Plane, 
  Building2, 
  CalendarCheck, 
  MapPin,
  ArrowLeftRight,
  Users2,
  // ChevronDown,
  Plus,
  Minus
} from 'lucide-vue-next'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const tabs = [
  { label: 'Book a flight', icon: Plane },
  { label: 'Stopover / Packages', icon: Building2 },
  { label: 'Manage / Check in', icon: CalendarCheck },
  { label: 'Flight status', icon: MapPin }
]

const flightTypes = ['Return', 'One way', 'Multi-city']

const activeTab = ref(0)
const selectedFlightType = ref('Return')
const passengers = ref(1)
const cabinClass = ref('Economy')
const isPassengersOpen = ref(false)
const passengerRef = ref(null)

const stopoverTab = ref(0)
const stopoverType = ref('departure')
const stopoverDays = ref(1)

const manageTab = ref(0)

const statusTab = ref(0)

const departureDate = ref(null)
const returnDate = ref(null)
const fromInput = ref('')
const showFromDropdown = ref(false)
const fromOptions = ref(['Hanoi', 'Ho Chi Minh City', 'Hue', 'Da Nang', 'Hai Phong', 'Dien Bien', 'Binh Duong', 'Can Tho', 'Da Lat', 'Nha Trang'])

const selectFromOption = (option: string) => {
  fromInput.value = option
  showFromDropdown.value = false
}

const hideFromDropdown = () => {
  setTimeout(() => {
    showFromDropdown.value = false
  }, 100)
}

const toInput = ref('')
const showToDropdown = ref(false)
const toOptions = ref(['Hanoi', 'Ho Chi Minh City', 'Hue', 'Da Nang', 'Hai Phong', 'Dien Bien', 'Binh Duong', 'Can Tho', 'Da Lat', 'Nha Trang'])

const selectToOption = (option: string) => {
  toInput.value = option
  showToDropdown.value = false
}

const hideToDropdown = () => {
  setTimeout(() => {
    showToDropdown.value = false
  }, 100)
}

const handleClickOutside = (event: MouseEvent) => {
  if (passengerRef.value && !(passengerRef.value as HTMLElement).contains(event.target as Node)) {
    isPassengersOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

</script>

<script lang = "ts">
export default {
    name: "FlightSearch",
  };
</script>


<style scoped>
input::placeholder {
  color: theme('colors.gray.400');
}
</style>