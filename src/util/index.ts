let timeOut: any = null;

export const debounceSearch = (
  text: string,
  setText: (text: string) => void,
  debounceTime: number = 3000,
) => {
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    setText(text);
    clearTimeout(timeOut);
  }, debounceTime);
};

export const NAME_RULE = {
  required: {value: true, message: 'is required'},
  pattern: {
    value: /^[A-Za-z]+(?:\s?[A-Za-z]+)*$/,
    message: 'is invalid input',
  },
  minLength: {
    value: 3,
    message: 'minimum length is 3',
  },
};

export const EMAIL_ADDRRESS_RULE = {
  required: {value: true, message: 'is required'},
  pattern: {
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
    message: 'is invalid input',
  },
};
