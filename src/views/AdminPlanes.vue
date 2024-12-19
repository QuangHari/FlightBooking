<template>
<div class="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div class="container mx-auto px-4 py-8 mt-16">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">All Planes Available</h1>
          <button
            @click="openAddPlaneModal"
            class="bg-[#4f4939] hover:bg-[#d0c5a4] text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            Add Plane
          </button>
        </div>
        <div class="grid grid-cols-1 gap-6">
          <AdminPlaneCard
            v-for="plane in planes"
            :key="plane.planeName"
            v-bind="plane"
          />
        </div>
      </div>
  
      <!-- Add Flight Modal -->
      <Teleport to="body">
        <div
          v-if="showAddPlaneModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden"
          @click.self="closeAddPlaneModal"
        >
          <div class="bg-white rounded-lg overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col">
            <div class="flex justify-between items-center p-4 border-b">
              <h2 class="text-xl font-semibold text-[#4f4939]">Add New Plane</h2>
              <button @click="closeAddPlaneModal" class="text-gray-500 hover:text-gray-700">
                <XIcon class="w-6 h-6" />
              </button>
            </div>
            <div class="p-4 overflow-y-auto flex-grow">
              <PlaneInfoForm @plane-added="handlePlaneAdded" />
            </div>
          </div>
        </div>
      </Teleport>
    </div>
</template>

<script setup lang = "ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AdminNavbar from '@/components/Adminpage/AdminNavbar.vue';
import AdminPlaneCard from '@/components/Adminpage/AdminPlaneCard.vue';
import PlaneInfoForm from '@/components/Adminpage/PlaneInfoForm.vue';

interface Plane {
    planeName: string
    numberOfSeats: number
    planeDescription: string
  }

const planes = ref<Plane[]>([
    {
        planeName: "Boeing 777-300ER",
        numberOfSeats: 396,
        planeDescription: "The Boeing 777 is a wide-body airliner developed and manufactured by Boeing Commercial Airplanes. It is the world's largest twinjet. The 777 was designed to bridge the gap between Boeing's other wide-body airliners and Airbus's A340 and A380. The 777-300ER, which first entered service in 2004, is the most successful variant of the 777 family and is the world's largest long-range twin-engine jetliner. It has a maximum takeoff weight of 775,000 pounds (351,534 kg) and a range of 7,370 nautical miles (13,650 km)."
    },
    {
        planeName: "Airbus A380-800",
        numberOfSeats: 853,
        planeDescription: "The Airbus"
    },
    {
        planeName: "Boeing 777-300ER", 
        numberOfSeats: 396,
        planeDescription: "The Boeing 777 is a wide-body airliner developed and manufactured by Boeing Commercial Airplanes. It is the world's largest twinjet. The 777 was designed to bridge the gap between Boeing's other wide-body airliners and Airbus's A340 and A380. The 777-300ER, which first entered service in 2004, is the most successful variant of the 777 family and is the world's largest long-range twin-engine jetliner. It has a maximum takeoff weight of 775,000 pounds (351,534 kg) and a range of 7,370 nautical miles (13,650 km)."
    },
  ])

  const showAddPlaneModal = ref(false)
  
  const openAddPlaneModal = () => {
    showAddPlaneModal.value = true
    document.body.style.overflow = 'hidden'
  }
  
  const closeAddPlaneModal = () => {
    showAddPlaneModal.value = false
    document.body.style.overflow = ''
  }
  
  const handlePlaneAdded = (newPlane: Plane) => {
    planes.value.push(newPlane)
    closeAddPlaneModal()
  }
  
  onMounted(() => {
    if (showAddPlaneModal.value) {
      document.body.style.overflow = 'hidden'
    }
  })
  
  onUnmounted(() => {
    document.body.style.overflow = ''
  })
</script>

<script lang = "ts">
export default {
    name: 'AdminPlanes',
}
</script>
