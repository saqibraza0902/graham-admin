export function formatCurrency(price: number, currencyCode = "EUR") {
  return price.toLocaleString(undefined, {
    style: "currency",
    currency: currencyCode,
  });
}
