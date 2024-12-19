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
            :key="plane.AircraftID "
            :name="plane.Name || ''"
            :capacity="plane.Capacity || 0"
            :details="plane.Details || ''" 
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
import AdminNavbar from '../components/Adminpage/AdminNavbar.vue';
import AdminPlaneCard from '../components/Adminpage/AdminPlaneCard.vue';
import PlaneInfoForm from '../components/Adminpage/PlaneInfoForm.vue';
import {fetchAllPlanes} from '../api/plane';

interface Plane {
  AircraftID: number
  Name: string | null
  Capacity: number | null
  Details?: string

  }

const planes = ref<Plane[]>([])

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
    console.log('New Plane:', newPlane)
    // closeAddPlaneModal()

    
  }
  

  const fetchAllData = async () => {
    try {
      const response = await fetchAllPlanes()
      planes.value = response.planes
    } catch (error) {
      console.error('Error fetching planes:', error)
    }
  }
  onMounted(() => {
    fetchAllData()
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
