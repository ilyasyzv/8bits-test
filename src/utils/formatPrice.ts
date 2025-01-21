export function formatPrice(
    price: string,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  ): string {
    const numericPrice = parseFloat(price)
    return numericPrice.toLocaleString(undefined, {
      minimumFractionDigits,
      maximumFractionDigits,
    })
  }
  