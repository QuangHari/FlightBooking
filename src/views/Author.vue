<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover">
      <source src="@/assets/FOOTAGEVIPVIP2.mov" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="relative w-full max-w-[850px] h-[500px] bg-white rounded-[20px] shadow-lg overflow-hidden">
      <!-- Sign In Form -->
      <div class="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        :class="isSignIn ? 'translate-x-0' : '-translate-x-full'">
        <div class="w-1/2 p-12 flex flex-col justify-center">
          <h2 class="text-3xl font-bold mb-8">Sign in</h2>

          <!-- Social Login -->
          <div class="flex justify-center gap-4 mb-4">
            <button
              class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Facebook class="w-5 h-5 text-gray-600" />
            </button>
            <button
              class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Mail class="w-5 h-5 text-gray-600" />
            </button>
            <button
              class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Linkedin class="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <p class="text-center text-gray-600 mb-8">or use your account</p>


          <form @submit.prevent="handleSignIn" class="space-y-4">
            <input type="email" placeholder="Email" v-model="signInEmail" autocomplete="off"
              class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f4939]" />
            <input type="password" placeholder="Password" v-model="signInPassword" autocomplete="off"
              class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f4939]" />
            <a href="#" class="block text-sm text-gray-600 hover:text-[#d0c5a4]">Forgot your password?</a>

            <!-- Hiển thị thông báo lỗi nếu có -->
            <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>

            <button type="submit"
              class="w-full py-3 bg-[#4f4939] text-white rounded-full hover:bg-[#d0c5a4] transition-colors">
              SIGN IN
            </button>
          </form>


        </div>
      </div>

      <!-- Sign Up Form -->
      <div class="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        :class="isSignIn ? 'translate-x-full' : 'translate-x-0'">
        <div class="w-1/2 ml-auto p-12 flex flex-col justify-center">
          <h2 class="text-3xl font-bold mb-8">Create Account</h2>

          <!-- Social Login -->
          <div class="flex justify-center gap-4 mb-4">
            <button
              class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Facebook class="w-5 h-5 text-gray-600" />
            </button>
            <button
              class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Mail class="w-5 h-5 text-gray-600" />
            </button>
            <button
              class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Linkedin class="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <p class="text-center text-gray-600 mb-8">or use your email for registration</p>

          <form @submit.prevent="handleSignUp" class="space-y-4">
            <input type="text" placeholder="Name" v-model="signUpName" autocomplete="off"
              class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f4939]" />
            <input type="email" placeholder="Email" v-model="signUpEmail" autocomplete="off"
              class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f4939]" />
            <input type="password" placeholder="Password" v-model="signUpPassword"
              class="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f4939]" />
              <p v-if="errorMessageRegis" class="text-red-500 text-sm mt-2">{{ errorMessageRegis }}</p>
            <button type="submit"
              class="w-full py-3 bg-[#4f4939] text-white rounded-full hover:bg-[#d0c5a4] transition-colors">
              SIGN UP
            </button>
          </form>
        </div>
      </div>

      <!-- Sliding Overlay -->
      <div class="absolute top-0 w-1/2 h-full bg-[#d0c5a4] transition-transform duration-500 ease-in-out"
        :class="isSignIn ? 'left-1/2' : 'left-0'">
        <div class="relative w-full h-full">
          <!-- Sign In Panel Content -->
          <div
            class="absolute inset-0 flex flex-col items-center justify-center p-12 text-white transition-opacity duration-500"
            :class="isSignIn ? 'opacity-100' : 'opacity-0 pointer-events-none'">
            <h2 class="text-4xl font-bold mb-4">Hello, Friend!</h2>
            <p class="text-center mb-8">Enter your personal details and start journey with us</p>
            <button @click="isSignIn = false"
              class="px-12 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-[#d0c5a4] transition-colors">
              SIGN UP
            </button>
          </div>

          <!-- Sign Up Panel Content -->
          <div
            class="absolute inset-0 flex flex-col items-center justify-center p-12 text-white transition-opacity duration-500"
            :class="isSignIn ? 'opacity-0 pointer-events-none' : 'opacity-100'">
            <h2 class="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p class="text-center mb-8">To keep connected with us please login with your personal info</p>
            <button @click="isSignIn = true"
              class="px-12 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-[#d0c5a4] transition-colors">
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Facebook, Mail, Linkedin } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth.store';
import { useRegisStore } from '../stores/regis.store';
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const router = useRouter();
const authStore = useAuthStore();
const regisStore = useRegisStore();
const isSignIn = ref(true)
const signInEmail = ref('')
const signInPassword = ref('')
const signUpName = ref('')
const signUpEmail = ref('')
const signUpPassword = ref('')
const errorMessage = ref("");
const errorMessageRegis = ref("");

const handleSignIn = async () => {
  try {
    // Reset thông báo lỗi trước khi thực hiện kiểm tra
    errorMessage.value = "";

    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signInEmail.value)) {
      errorMessage.value = "Please enter a valid email address.";
      return; // Ngừng xử lý nếu email không hợp lệ
    }

    // Kiểm tra độ dài mật khẩu
    if (signInPassword.value.length < 5) {
      errorMessage.value = "Password must be at least 5 characters long.";
      return; // Ngừng xử lý nếu mật khẩu quá ngắn
    }

    // Kiểm tra mật khẩu phải chứa số hoặc ký tự đặc biệt
    const passwordRegex = /[0-9!@#$%^&*(),.?":{}|<>]/;
    if (!passwordRegex.test(signInPassword.value)) {
      errorMessage.value = "Password must contain at least one number or special character.";
      return; // Ngừng xử lý nếu mật khẩu không hợp lệ
    }

    // Nếu tất cả kiểm tra đều hợp lệ, gọi API đăng nhập
    await authStore.login({
      email: signInEmail.value,
      password: signInPassword.value,
    });

    // Hiển thị thông báo thành công
    message.success("Login successful!");

    // Điều hướng đến trang chính
    router.push("/");
  } catch (error: any) {
    // Nếu đăng nhập thất bại, hiển thị lỗi
    errorMessage.value = "Invalid email or password. Please try again.";
  }
};


const handleSignUp = async () => {
  try {
   
    errorMessageRegis.value = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpEmail.value)) {
      errorMessage.value = "Please enter a valid email address.";
      return; 
    }

    // Kiểm tra độ dài mật khẩu
    if (signUpPassword.value.length < 5) {
      errorMessage.value = "Password must be at least 5 characters long.";
      return; // Ngừng xử lý nếu mật khẩu quá ngắn
    }

    // Kiểm tra mật khẩu phải chứa số hoặc ký tự đặc biệt
    const passwordRegex = /[0-9!@#$%^&*(),.?":{}|<>]/;
    if (!passwordRegex.test(signUpPassword.value)) {
      errorMessage.value = "Password must contain at least one number or special character.";
      return; // Ngừng xử lý nếu mật khẩu không hợp lệ
    }

    // Nếu tất cả kiểm tra đều hợp lệ, gọi API đăng nhập
    await regisStore.register({
      email: signUpEmail.value,
      password: signUpPassword.value,
      username: signUpName.value,
    });

    // Hiển thị thông báo thành công
    message.success("Login successful!");

    // Điều hướng đến trang chính
    router.push("/");
  } catch (error: any) {
    // Nếu đăng nhập thất bại, hiển thị lỗi
    errorMessageRegis.value = "Invalid email or password. Please try again.";
  }
}
</script>

<script lang="ts">
export default {
  name: 'Author',
}
</script>