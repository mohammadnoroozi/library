export const isValidMobile = (mobile: string) => {
  return new RegExp(/0([0-9]{10})/g).test(cleanedNumbers(mobile));
};

export const isValidOtpCode = (code: string) => {
  return new RegExp(/([0-9]{6})/g).test(cleanedNumbers(code));
};

export const cleanedNumbers = (numbers: string) => {
  if (!numbers || !numbers.length) return "";

  numbers = numbers.replaceAll("۰", "0");
  numbers = numbers.replaceAll("۱", "1");
  numbers = numbers.replaceAll("۲", "2");
  numbers = numbers.replaceAll("۳", "3");
  numbers = numbers.replaceAll("۴", "4");
  numbers = numbers.replaceAll("۵", "5");
  numbers = numbers.replaceAll("۶", "6");
  numbers = numbers.replaceAll("۷", "7");
  numbers = numbers.replaceAll("۸", "8");
  numbers = numbers.replaceAll("۹", "9");

  return numbers;
};
