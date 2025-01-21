import type { MarketDataItem } from '@/types/apiTypes'

export function sortByPair(a: MarketDataItem, b: MarketDataItem, direction: 'asc' | 'desc'): number {
  const pairA = `${a.pair.primary}/${a.pair.secondary}`
  const pairB = `${b.pair.primary}/${b.pair.secondary}`
  const comparison = pairA.localeCompare(pairB)
  return direction === 'asc' ? comparison : -comparison
}

export function sortByLastPrice(a: MarketDataItem, b: MarketDataItem, direction: 'asc' | 'desc'): number {
  const priceA = parseFloat(a.price.last)
  const priceB = parseFloat(b.price.last)
  return direction === 'asc' ? priceA - priceB : priceB - priceA
}

export function sortByVolume(a: MarketDataItem, b: MarketDataItem, direction: 'asc' | 'desc'): number {
  const volumeA = parseFloat(a.volume.primary)
  const volumeB = parseFloat(b.volume.primary)
  return direction === 'asc' ? volumeA - volumeB : volumeB - volumeA
}
