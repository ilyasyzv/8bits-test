<template>
  <div class="p-4">
    <h1 class="text-xl md:text-2xl font-bold mb-4">Crypto Market Summary</h1>

    <div
      v-if="currencyStore.isLoading || marketStore.isLoading"
      class="mb-2 flex items-center space-x-2"
    >
      <div class="h-5 w-5 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
      <span class="text-gray-600">Loading data...</span>
    </div>

    <div
      v-else-if="currencyStore.error || marketStore.error"
      class="text-red-500 mb-2"
    >
      Error: {{ currencyStore.error || marketStore.error }}
    </div>

    <market-table
      :market-data="marketStore.marketData"
      :currencies="currencyStore.currencies"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useCurrencyStore } from '@/stores/useCurrencyStore'
import { useMarketStore } from '@/stores/useMarketStore'
import MarketTable from '@/components/MarketTable.vue'

const currencyStore = useCurrencyStore()
const marketStore = useMarketStore()

onMounted(() => {
  currencyStore.fetchCurrencies()
  marketStore.startPolling(10000)
})

onBeforeUnmount(() => {
  marketStore.stopPolling()
})
</script>
