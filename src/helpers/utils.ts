export const validate = (id: string)  => {
    id = unescape(encodeURIComponent(id));
    var newString = '',
      char,
      nextChar,
      combinedCharCode;
    for (var i = 0; i < id.length; i += 2) {
      char = id.charCodeAt(i);

      if (i + 1 < id.length) {
        nextChar = id.charCodeAt(i + 1) - 31;

        combinedCharCode =
          char +
          '' +
          nextChar.toLocaleString('en', {
            minimumIntegerDigits: 2,
          });

        newString += String.fromCharCode(parseInt(combinedCharCode, 10));
      } else {
        newString += id.charAt(i);
      }
    }
    return newString
      .split('')
      .reduce(
        (hex, c) => (hex += c.charCodeAt(0).toString(16).padStart(4, '0')),
        '',
      );
  }