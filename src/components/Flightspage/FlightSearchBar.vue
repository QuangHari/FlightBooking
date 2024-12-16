<template>
  <div class="w-full">
    <!-- Compact Search Bar -->
    <div class="bg-white rounded-full shadow-sm border p-2 flex items-center">
      <!-- From/To -->
      <div class="flex items-center gap-2 px-4 py-2 flex-1">
        <div class="font-medium text-lg">{{ form.from.city }}</div>
        <Plane class="w-5 h-5 text-[#4f4939] rotate-90" />
        <div class="font-medium text-lg">{{ form.to.city }}</div>
      </div>

      <!-- Dates -->
      <div class="px-4 py-2 flex-1 border-l">
        {{ formattedDateRange }}
      </div>

      <!-- Passengers -->
      <div class="px-4 py-2 flex-1 border-l flex items-center gap-2">
        <Users2 class="w-5 h-5 text-gray-500" />
        <span>
          {{ totalPassengers }} Passenger(s)
        </span>
      </div>

      <!-- Modify Search Button -->
      <button
        @click="isExpanded = !isExpanded"
        class="bg-[#4f4939] hover:bg-[#d0c5a4] text-white px-6 py-3 rounded-full flex items-center gap-2"
      >
        <Search class="w-5 h-5" />
        Modify search
      </button>
    </div>

    <!-- Expanded Search Form -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div v-if="isExpanded" class="absolute left-0 right-0 mt-4 bg-white rounded-2xl shadow-lg p-6">
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-xl font-semibold text-[#4f4939]">Search flight</h2>
          <button @click="isExpanded = false" class="text-gray-400 hover:text-gray-600">
            <X class="w-6 h-6" />
          </button>
        </div>

        <!-- Flight Type Selection -->
        <div class="flex gap-4 mb-6">
          <button
            v-for="type in flightTypes"
            :key="type"
            @click="form.flightType = type"
            class="px-4 py-2 rounded-full"
            :class="[
              form.flightType === type
                ? 'bg-[#d0c5a4] text-[#4f4939] border-2 border-[#4f4939]'
                : 'border border-gray-300 hover:border-[#4f4939]'
            ]"
          >
            {{ type }}
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <!-- From -->
          <div class="space-y-1">
            <label class="text-sm text-[#4f4939]">From</label>
            <div class="relative">
              <input
                type="text"
                v-model="form.from.display"
                @input="updateFromCity"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                placeholder="City or airport"
              />
            </div>
          </div>

          <!-- To -->
          <div class="space-y-1">
            <label class="text-sm text-[#4f4939]">To</label>
            <div class="relative">
              <input
                type="text"
                v-model="form.to.display"
                @input="updateToCity"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                placeholder="City or airport"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <!-- Departure Date -->
          <div class="space-y-1">
            <label class="text-sm text-[#4f4939]">Departure</label>
            <Datepicker
              v-model="form.departureDate"
              :enable-time-picker="false"
              :format="formatDate"
              input-class-name="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <!-- Return Date -->
          <div class="space-y-1" v-if="form.flightType === 'Return'">
            <label class="text-sm text-[#4f4939]">Return</label>
            <Datepicker
              v-model="form.returnDate"
              :enable-time-picker="false"
              :format="formatDate"
              input-class-name="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <!-- Passengers Selection -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div v-for="(type, index) in passengerTypes" :key="index" class="space-y-1">
            <label class="text-sm text-[#4f4939]">{{ type.label }}</label>
            <div class="relative">
              <select
                v-model="form.passengers[type.key]"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4] appearance-none"
              >
                <option v-for="n in type.max" :key="n" :value="n">{{ n }}</option>
              </select>
              <div class="text-xs text-gray-500 mt-1">{{ type.ageRange }}</div>
            </div>
          </div>
        </div>

        <!-- Additional Options -->
        <div class="space-y-4 mb-6">
          <!-- Promo Code -->
          <div class="max-w-xs">
            <label class="text-sm text-[#4f4939]">Promo code (optional)</label>
            <input
              type="text"
              v-model="form.promoCode"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
            />
          </div>

          <!-- Checkboxes -->
          <div class="space-y-2">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="form.showPremiumOnly"
                class="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none cursor-pointer checked:border-[#4f4939] checked:border-8 transition-all"
              />
              <span>Show only Premium Class (Business / First)</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="form.showFlexibleDates"
                class="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none cursor-pointer checked:border-[#4f4939] checked:border-8 transition-all"
              />
              <span>Show flexible dates calendar</span>
            </label>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4">
          <button
            @click="handleSearch"
            class="flex-1 bg-[#4f4939] hover:bg-[#d0c5a4] text-white py-3 rounded-full font-medium"
          >
            Search
          </button>
          <button
            @click="isExpanded = false"
            class="px-6 py-3 text-[#4f4939] hover:text-[#d0c5a4]"
          >
            Cancel search
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang = "ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Plane,
  Users2,
  Search,
  X,
  ChevronUp,
  ArrowRight
} from 'lucide-vue-next'

import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const route = useRoute()
const isExpanded = ref(false)

const flightTypes = ['Return', 'One-way', 'Multi-city']

interface PassengerType {
  key: keyof Passengers;
  label: string;
  max: number;
  ageRange: string;
}

const passengerTypes: PassengerType[] = [
  { key: 'adult', label: 'Adult', max: 10, ageRange: '12+ years' },
  { key: 'child', label: 'Child', max: 10, ageRange: '2-11 years' },
  { key: 'infant', label: 'Infant', max: 10, ageRange: 'Under 2 years' }
]

const form = reactive({
  flightType: route.query.returnDate ? 'Return' : 'One-way',
  from: {
    code: '',
    city: route.query.from as string || 'Doha',
    display: route.query.from as string || 'Doha'
  },
  to: {
    code: '',
    city: route.query.to as string || 'New York',
    display: route.query.to as string || 'New York'
  },
  departureDate: route.query.departureDate ? new Date(route.query.departureDate as string) : new Date(),
  returnDate: route.query.returnDate ? new Date(route.query.returnDate as string) : new Date(),
  passengers: {
    adult: 1,
    child: 0,
    infant: 0
  },
  promoCode: '',
  showPremiumOnly: false,
  showFlexibleDates: false
})

onMounted(() => {
  updateFromCity()
  updateToCity()
})

interface City {
  code: string;
  city: string;
  display: string;
}

interface Passengers {
  adult: number;
  child: number;
  infant: number;
}

interface Form {
  flightType: string;
  from: City;
  to: City;
  departureDate: Date;
  returnDate: Date;
  passengers: Passengers;
  promoCode: string;
  showPremiumOnly: boolean;
  showFlexibleDates: boolean;
}

const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const formattedDateRange = computed(() => {
  if (form.flightType === 'One-way') {
    return formatDate(form.departureDate)
  }
  return `${formatDate(form.departureDate)} - ${formatDate(form.returnDate)}`
})

const totalPassengers = computed(() => {
  return Object.values(form.passengers).reduce((sum, count) => sum + Number(count), 0)
})

const updateFromCity = () => {
  const match = form.from.display.match(/^(.+?)\s*$$([^)]+)$$/)
  if (match) {
    form.from.city = match[1].trim()
    form.from.code = match[2]
  } else {
    form.from.city = form.from.display
    form.from.code = ''
  }
}

const updateToCity = () => {
  const match = form.to.display.match(/^(.+?)\s*$$([^)]+)$$/)
  if (match) {
    form.to.city = match[1].trim()
    form.to.code = match[2]
  } else {
    form.to.city = form.to.display
    form.to.code = ''
  }
}

const handleSearch = () => {
  console.log('Search with form data:', form)
  isExpanded.value = false
}
</script>  

<script lang = "ts">
export default {
name: "FlightSearchBar",
};
</script>

