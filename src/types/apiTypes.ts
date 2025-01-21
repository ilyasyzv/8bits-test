export interface CurrencyConfig {
  code: string
  sort_order: number
  ticker: string
  type: string
  decimals_places: number
  icon: string
}

export interface MarketPair {
  primary: string
  secondary: string
}

export interface MarketPriceChange {
  direction: 'Up' | 'Down'
  percent: string
  amount: string
}

export interface MarketPrice {
  last: string
  bestBid: string
  bestOffer: string
  change: MarketPriceChange
}

export interface MarketVolume {
  primary: string
  secondary: string
}

export interface MarketDataItem {
  pair: MarketPair
  price: MarketPrice
  volume: MarketVolume
  priceHistory: string[]
}
