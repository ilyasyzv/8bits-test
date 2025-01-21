import type { MarketDataItem } from '@/types/apiTypes'

export function filterByPair(data: MarketDataItem[], query: string): MarketDataItem[] {
  if (!query) return data
  const lowerQuery = query.toLowerCase()
  return data.filter((item) => {
    const pairString = `${item.pair.primary}/${item.pair.secondary}`.toLowerCase()
    return pairString.includes(lowerQuery)
  })
}

export function filterByDirection(data: MarketDataItem[], direction: string): MarketDataItem[] {
  if (!direction) return data
  return data.filter((item) => item.price.change.direction === direction)
}
