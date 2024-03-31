
export function Price({ price, locale, currency }) {
  const formatPrice = () =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(price);

  return <span className= "text-green-500" >{formatPrice()}</span>;
}

Price.defaultProps = {
  locale: 'en-US',
  currency: 'USD',
};