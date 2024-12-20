<template>
  <nav class="fixed top-0 left-0 right-0 bg-[#f8f8f8] border-b border-gray-100 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Left section: Logos -->
        <div class="flex items-center gap-6">
          <a href="/" class="flex-shrink-0">
            <img src="../../assets/MainLogo_shadow.png" alt="QAirline" class="h-10" />
          </a>
          <div class="h-8 w-px bg-gray-200"></div>
          <a href="/" class="flex-shrink-0">
            <img src="../../assets/Oneworld_logo.svg.png" alt="OneWorld" class="h-7" />
          </a>
        </div>

        <!-- Middle section: Main navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <button 
            v-for="item in navigationItems" 
            :key="item.name"
            @click="navigateTo(item.path)"
            class="text-gray-700 hover:text-[#d0c5a4] font-medium transition-colors"
          >
            {{ item.name }}
          </button>
        </div>

        <!-- Right section: Actions -->
        <div class="flex items-center gap-6">
          <a href="#" class="text-gray-700 hover:text-[#d0c5a4] font-medium hidden sm:block">
            Help
          </a>
          <button class="text-gray-700 hover:text-[#d0c5a4]">
          </button>
          <div class="flex items-center gap-2 text-gray-700 hover:text-[#d0c5a4] cursor-pointer">
            <img 
              src="../../assets/USflag.png" 
              alt="US Flag" 
              class="h-5 w-7 rounded"
            />
            <span class="font-medium hidden sm:block">EN</span>
          </div>
          <div class="h-8 w-px bg-gray-200 hidden sm:block"></div>
          <div class="flex items-center gap-2 relative">
            <template v-if="authStore.isLoggedIn">
              <img 
                src="../../assets/profile_icon.png" 
                alt="Profile Icon" 
                class="h-6 w-6 rounded-full cursor-pointer"
                @click="toggleDropdown"
              />
              <div 
                v-if="isDropdownOpen" 
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 top-full"
              >
                <a 
                  href="#" 
                  @click.prevent="navigateTo('/profile')"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </a>
                <a 
                  href="#" 
                  @click.prevent="logout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </a>
              </div>
            </template>
            <template v-else>
              <a href="/author" class="text-gray-700 hover:text-[#d0c5a4] font-medium whitespace-nowrap hidden sm:block">
                Sign in | Sign up
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth.store';
import { onMounted, onUnmounted, ref } from 'vue';

const router = useRouter();
const authStore = useAuthStore();

const isLogin = ref(false);
const isDropdownOpen = ref(false);

const navigationItems = [
  { name: 'Personal Information', path: '/profile' },
  { name: 'My Flights', path: '/profile/myflights' },
];

const navigateTo = (path: string) => {
  router.push(path);
  isDropdownOpen.value = false;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const logout = () => {
  authStore.logout();
  router.push('/');
  isDropdownOpen.value = false;
};

onMounted(() => {
  isLogin.value = authStore.isLoggedIn;
});

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<script lang="ts">
export default {
  name: "ProfileNavbar",
};
</script>

