/**
 * Verifica si el número de tarjeta es válido usando el algoritmo de Luhn.
 */
export const isValidCardNumber = (number: string): boolean => {
  let sum = 0;
  for (let i = 0; i < number.length; i++) {
    let cardNum = parseInt(number[i], 10);

    if ((number.length - i) % 2 === 0) {
      cardNum = cardNum * 2;

      if (cardNum > 9) {
        cardNum = cardNum - 9;
      }
    }

    sum += cardNum;
  }

  return sum % 10 === 0;
};

/**
 * Valida el CVV basado en su longitud.
 */
export const isValidCVV = (cvv: string): boolean => {
  return cvv.length >= 3 && cvv.length <= 4;
};

/**
 * Valida que el mes de expiración esté en el rango correcto.
 */
export const isValidExpirationMonth = (month: string): boolean => {
  const numMonth = parseInt(month, 10);
  return numMonth >= 1 && numMonth <= 12;
};

/**
 * Valida que el año de expiración esté en un rango razonable.
 */
export const isValidExpirationYear = (year: string): boolean => {
  const currentYear = new Date().getFullYear();
  const numYear = parseInt(year, 10);
  return numYear >= currentYear && numYear <= currentYear + 5;
};

/**
 * Valida que el email tenga un dominio específico.
 */
export const isValidEmail = (email: string): boolean => {
  const allowedDomains = ["gmail.com", "hotmail.com", "yahoo.es"];
  const domain = email.split("@")[1];
  return allowedDomains.includes(domain);
};
