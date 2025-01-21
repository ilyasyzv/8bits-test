import { setActivePinia, createPinia } from 'pinia'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useMarketStore } from '@/stores/useMarketStore'

describe('useMarketStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('initializes with default state', () => {
    const store = useMarketStore()
    expect(store.marketData).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.pollIntervalId).toBeNull()
  })

  it('fetches market data successfully', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ([
        {
          pair: { primary: 'BTC', secondary: 'USD' },
          price: {
            last: '30000',
            bestBid: '29950',
            bestOffer: '30010',
            change: {
              direction: 'Up',
              percent: '5',
              amount: '1500',
            },
          },
          volume: { primary: '50', secondary: '1500000' },
          priceHistory: ['29000', '29500', '30000'],
        },
      ]),
    } as Response)

    const store = useMarketStore()
    await store.fetchMarketData()

    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.marketData).toHaveLength(1)
    expect(store.marketData[0].pair.primary).toBe('BTC')
  })

  it('handles error during fetchMarketData', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: async () => [],
    } as Response)

    const store = useMarketStore()
    await store.fetchMarketData()

    expect(store.isLoading).toBe(false)
    expect(store.error).toBe('Error fetching market data')
    expect(store.marketData).toEqual([])
  })

  it('starts and stops polling without triggering real network calls', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ([
        {
          pair: { primary: 'ETH', secondary: 'USD' },
          price: {
            last: '2000',
            bestBid: '1990',
            bestOffer: '2010',
            change: {
              direction: 'Up',
              percent: '2',
              amount: '40',
            },
          },
          volume: { primary: '100', secondary: '200000' },
          priceHistory: ['1800', '1900', '2000'],
        },
      ]),
    } as Response)

    const store = useMarketStore()
    store.startPolling(5000)

    await new Promise((r) => setTimeout(r, 50))

    expect(store.pollIntervalId).not.toBeNull()

    store.stopPolling()
    expect(store.pollIntervalId).toBeNull()
  })
})
