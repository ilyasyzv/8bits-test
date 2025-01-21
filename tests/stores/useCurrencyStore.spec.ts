import { setActivePinia, createPinia } from 'pinia'
import { vi } from 'vitest'
import { useCurrencyStore } from '@/stores/useCurrencyStore'

describe('useCurrencyStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('initializes with default state', () => {
    const store = useCurrencyStore()
    expect(store.currencies).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('fetches currencies successfully', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ([
        {
          code: 'USD',
          sort_order: 1,
          ticker: 'usd',
          type: 'fiat',
          decimals_places: 2,
          icon: 'usd.png',
        },
        {
          code: 'EUR',
          sort_order: 2,
          ticker: 'eur',
          type: 'fiat',
          decimals_places: 2,
          icon: 'eur.png',
        },
      ]),
    } as Response)

    const store = useCurrencyStore()
    await store.fetchCurrencies()

    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.currencies).toHaveLength(2)
    expect(store.currencies[0].code).toBe('USD')
    expect(store.currencies[1].code).toBe('EUR')
  })

  it('handles fetch error', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: async () => [],
    } as Response)

    const store = useCurrencyStore()
    await store.fetchCurrencies()

    expect(store.isLoading).toBe(false)
    expect(store.error).toBe('Error fetching currencies')
    expect(store.currencies).toEqual([])
  })
})
