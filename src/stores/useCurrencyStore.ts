import { defineStore } from 'pinia'
import type { CurrencyConfig } from '@/types/apiTypes'

export const useCurrencyStore = defineStore('currencyStore', {
  state: () => ({
    currencies: [] as CurrencyConfig[],
    isLoading: false as boolean,
    error: null as string | null,
  }),
  actions: {
    async fetchCurrencies() {
      try {
        this.isLoading = true
        this.error = null

        const response = await fetch('/api/currency')
        if (!response.ok) {
          throw new Error(`Error fetching currencies`)
        }
        const data = (await response.json()) as CurrencyConfig[]
        this.currencies = data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
  },
})
