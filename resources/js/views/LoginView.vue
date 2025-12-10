<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 p-4">
    <!-- Login Card -->
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <!-- Logo/Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p class="text-slate-600">Sign in to your crypto trading account</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p class="text-red-400 text-sm">{{ error }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="success" class="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
          <p class="text-green-400 text-sm">{{ success }}</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2" for="email">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              <input
                v-model="form.email"
                id="email"
                type="email"
                required
                :disabled="loading"
                class="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email[0] }}</p>
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2" for="password">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                v-model="form.password"
                id="password"
                type="password"
                required
                :disabled="loading"
                class="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password[0] }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full relative py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">Sign In</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing In...
            </span>
          </button>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-slate-600">
            Don't have an account?
            <router-link to="/register" class="text-blue-600 hover:text-blue-700 font-semibold transition">
              Create Account
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { login } = useAuth();

const form = ref({
  email: '',
  password: '',
});

const loading = ref(false);
const error = ref('');
const success = ref('');
const errors = ref({});

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';
  errors.value = {};

  try {
    const result = await login(form.value);

    if (result.success) {
      success.value = result.message;
      setTimeout(() => {
        router.push({ name: 'Dashboard' });
      }, 500);
    } else {
      error.value = result.message;
      errors.value = result.errors;
    }
  } catch (err) {
    error.value = 'An unexpected error occurred. Please try again.';
    console.error('Login error:', err);
  } finally {
    loading.value = false;
  }
};
</script>
