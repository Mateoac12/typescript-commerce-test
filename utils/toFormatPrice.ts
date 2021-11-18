export const toFormatPrice = (numPrice: number): string => {
  return numPrice.toLocaleString('es-UY', {
    style: 'currency',
    currency: 'UYU',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
}
