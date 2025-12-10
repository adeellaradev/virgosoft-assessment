<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Navigation Bar -->
    <nav class="bg-white border-b border-slate-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div class="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <span class="text-xl font-bold text-slate-900">Crypto Exchange</span>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <span class="text-slate-700">{{ user?.name }}</span>
            <button
              @click="handleLogout"
              class="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Welcome, {{ user?.name }}!</h1>
        <p class="text-slate-600">Manage your crypto portfolio and trade assets</p>
      </div>

      <!-- Balance Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- USD Balance Card -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span class="text-slate-600 text-sm">USD Balance</span>
            </div>
          </div>
          <p class="text-3xl font-bold text-slate-900">${{ formatNumber(user?.balance || 0) }}</p>
        </div>

        <!-- Assets Card -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <span class="text-slate-600 text-sm">Total Assets</span>
            </div>
          </div>
          <p class="text-3xl font-bold text-slate-900">{{ user?.assets?.length || 0 }}</p>
        </div>

        <!-- Quick Action Card -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <span class="text-slate-600 text-sm">Quick Actions</span>
            </div>
          </div>
          <button class="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition">
            Place Order
          </button>
        </div>
      </div>

      <!-- Assets List -->
      <div v-if="user?.assets && user.assets.length > 0" class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Your Assets</h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-200">
                <th class="text-left py-3 px-4 text-slate-600 font-semibold">Symbol</th>
                <th class="text-right py-3 px-4 text-slate-600 font-semibold">Available</th>
                <th class="text-right py-3 px-4 text-slate-600 font-semibold">Locked</th>
                <th class="text-right py-3 px-4 text-slate-600 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="asset in user.assets" :key="asset.id" class="border-b border-slate-100 hover:bg-slate-50 transition">
                <td class="py-4 px-4">
                  <span class="text-slate-900 font-semibold">{{ asset.symbol }}</span>
                </td>
                <td class="py-4 px-4 text-right text-slate-700">
                  {{ formatNumber(asset.amount, 8) }}
                </td>
                <td class="py-4 px-4 text-right text-slate-700">
                  {{ formatNumber(asset.locked_amount, 8) }}
                </td>
                <td class="py-4 px-4 text-right text-slate-900 font-semibold">
                  {{ formatNumber(asset.total, 8) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
        <svg class="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <h3 class="text-xl font-semibold text-slate-900 mb-2">No Assets Yet</h3>
        <p class="text-slate-600">Start trading to build your crypto portfolio</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { user, logout, fetchProfile } = useAuth();

onMounted(async () => {
  await fetchProfile();
});

const handleLogout = async () => {
  await logout();
};

const formatNumber = (value, decimals = 2) => {
  const num = parseFloat(value);
  return isNaN(num) ? '0.00' : num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
</script>
