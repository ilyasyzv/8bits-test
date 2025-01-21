<template>
  <div class="space-y-4">
    <div class="flex flex-col space-y-2 md:flex-row md:items-center md:justify-end md:space-x-2 md:space-y-0">
      <input v-model="searchQuery" type="text" placeholder="Search by Pair"
        class="border p-2 rounded w-full md:w-auto h-[40px]" />

      <select v-model="selectedDirection" class="border p-2 rounded w-full md:w-auto h-[40px]">
        <option value="">All</option>
        <option value="Up">Gainers</option>
        <option value="Down">Losers</option>
      </select>
    </div>


    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-sm">
        <thead class="border-b bg-gray-50">
          <tr>
            <th scope="col" class="px-4 py-2 cursor-pointer" @click="setSort('pair')">
              Pair
              <span v-if="sortField === 'pair'">
                {{ sortDirection === 'asc' ? '▲' : '▼' }}
              </span>
            </th>

            <th scope="col" class="px-4 py-2 cursor-pointer" @click="setSort('lastPrice')">
              Last Price
              <span v-if="sortField === 'lastPrice'">
                {{ sortDirection === 'asc' ? '▲' : '▼' }}
              </span>
            </th>

            <th scope="col" class="px-4 py-2">24h Change</th>

            <th scope="col" class="px-4 py-2 cursor-pointer" @click="setSort('volume')">
              Volume
              <span v-if="sortField === 'volume'">
                {{ sortDirection === 'asc' ? '▲' : '▼' }}
              </span>
            </th>

            <th scope="col" class="px-4 py-2">Price History</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in displayedData" :key="index" class="border-b hover:bg-gray-50">
            <td class="px-4 py-2">
              {{ item.pair.primary }}/{{ item.pair.secondary }}
            </td>

            <td class="px-4 py-2">
              {{ formatPrice(item.price.last) }}
            </td>

            <td class="px-4 py-2" :class="{
              'text-green-600': item.price.change.direction === 'Up',
              'text-red-600': item.price.change.direction === 'Down'
            }">
              {{ item.price.change.amount }} ({{ item.price.change.percent }}%)
            </td>

            <td class="px-4 py-2">
              {{ item.volume.primary }} {{ item.pair.primary }}
            </td>

            <td class="px-4 py-2">
              <price-history-chart :data="item.priceHistory" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { MarketDataItem, CurrencyConfig } from '@/types/apiTypes'
import PriceHistoryChart from '@/components/PriceHistoryChart.vue'

import { formatPrice } from '@/utils/formatPrice'
import { filterByPair, filterByDirection } from '@/utils/filter'
import { sortByPair, sortByLastPrice, sortByVolume } from '@/utils/sort'

interface Props {
  marketData: MarketDataItem[]
  currencies: CurrencyConfig[]
}

const props = defineProps<Props>()

const searchQuery = ref('')
const selectedDirection = ref('')

const sortField = ref('')
const sortDirection = ref<'asc' | 'desc'>('asc')

function setSort(field: string) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const displayedData = computed(() => {
  let data = filterByPair(props.marketData, searchQuery.value)
  data = filterByDirection(data, selectedDirection.value)

  if (sortField.value === 'pair') {
    data.sort((a, b) => sortByPair(a, b, sortDirection.value))
  } else if (sortField.value === 'lastPrice') {
    data.sort((a, b) => sortByLastPrice(a, b, sortDirection.value))
  } else if (sortField.value === 'volume') {
    data.sort((a, b) => sortByVolume(a, b, sortDirection.value))
  }

  return data
})
</script>
