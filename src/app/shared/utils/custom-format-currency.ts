export const customFormatCurrency = (amount: number, decimals = 2) => {
  if (amount) {
    if (amount > 999999) {
      return `$${(amount / 1000000).toFixed(decimals)}M`;
    }
    if (amount > 999) {
      return `$${(amount / 1000).toFixed(decimals)}K`;
    }
    return `$${amount.toFixed(decimals)}`;
  } else {
    return '$0';
  }
};

export const customFormatCurrencyRevert = (amount: string) => {
  if (amount && amount.charAt(0) === '$' && amount !== '') {
    let realAmount;
    if (amount.charAt(amount.length - 1) === 'M') {
      realAmount =
        Number.parseFloat(amount.substring(1, amount.length - 1)) * 1000000;
    } else if (amount.charAt(amount.length - 1) === 'K') {
      realAmount =
        Number.parseFloat(amount.substring(1, amount.length - 1)) * 1000;
    } else {
      realAmount = Number.parseFloat(amount.substring(1));
    }
    return realAmount;
  } else {
    return amount;
  }
};
