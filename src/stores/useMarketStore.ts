import { defineStore } from 'pinia'
import type { MarketDataItem } from '@/types/apiTypes'

export const useMarketStore = defineStore('marketStore', {
  state: () => ({
    marketData: [] as MarketDataItem[],
    isLoading: false as boolean,
    error: null as string | null,
    pollIntervalId: null as number | null,
  }),
  actions: {
    async fetchMarketData() {
      try {
        this.isLoading = true
        this.error = null

        const response = await fetch('/api/market')
        if (!response.ok) {
          throw new Error(`Error fetching market data`)
        }
        const data = (await response.json()) as MarketDataItem[]
        this.marketData = data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },

    startPolling(intervalMs = 15000) {
      this.stopPolling()

      this.fetchMarketData()
      this.pollIntervalId = window.setInterval(() => {
        this.fetchMarketData()
      }, intervalMs)
    },

    stopPolling() {
      if (this.pollIntervalId) {
        clearInterval(this.pollIntervalId)
        this.pollIntervalId = null
      }
    },
  },
})
