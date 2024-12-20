<template>
    <div class="min-h-screen bg-gray-100">
      <ProfileNavbar />
      <div class="container mx-auto px-4 py-8 mt-16">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">My Personal Information</h1>
        <ProfileCard 
          :title="profileData.title"
          :gender="profileData.gender"
          :firstName="profileData.firstName"
          :lastName="profileData.lastName"
          :birthDay="profileData.birthDay"
          :birthMonth="profileData.birthMonth"
          :birthYear="profileData.birthYear"
          :nationality="profileData.nationality"
          :passportNumber="profileData.passportNumber"
          :expiryDay="profileData.expiryDay"
          :expiryMonth="profileData.expiryMonth"
          :expiryYear="profileData.expiryYear"
          @edit="handleEdit"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import ProfileCard from '../components/Profilepage/ProfileCard.vue'
  import ProfileNavbar from '../components/Profilepage/ProfileNavbar.vue'
  
  interface ProfileData {
    title: string;
    gender: string;
    firstName: string;
    lastName: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    nationality: string;
    passportNumber: string;
    expiryDay: string;
    expiryMonth: string;
    expiryYear: string;
  }
  
  const profileData = reactive<ProfileData>({
    title: '',
    gender: '',
    firstName: '',
    lastName: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    nationality: '',
    passportNumber: '',
    expiryDay: '',
    expiryMonth: '',
    expiryYear: ''
  })
  
  const handleEdit = (newData: ProfileData) => {
    Object.assign(profileData, newData)
  }
  </script>
  
  <script lang="ts">
  export default {
    name: 'ProfileInformation',
  };
  </script>
  
  