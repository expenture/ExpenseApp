/**
 * Parses a money amount and returns the integer and decimal part in an array
 *
 * @providesModule utils/parseMoney
 */

const parseMoney = (moneyAmount, displayed=false) => {
  // All money values in program are integers represented in 1,000/1 degrees.
  // For example, the programmatic money value `1234567` should be displayed as
  // `$ 1,234.567`.
  let i = parseInt(moneyAmount / 1000, 10);
  let f = parseInt(moneyAmount % 1000, 10);

  if (!displayed) {
    return [i, f];
  } else {
    if (typeof i !== 'number') {
      i = '-';
    } else {
      i = i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (typeof f !== 'number') {
      f = '-';
    } else {
      f = `.${('0' + parseInt(f/10, 10)).slice(-2)}`;
    }

    return [i, f];
  }
};

export default parseMoney;
