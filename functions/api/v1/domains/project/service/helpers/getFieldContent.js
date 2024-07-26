import { RESTRICTED_SYMBOLS } from '../../../../constants/restrictedSymbols.js';

const getFieldContent = (valueName, source) => {
  if (!valueName || !source) {
    return null;
  }
  if (!valueName.includes('.')) {
    return convertResultToObject(source[valueName]);
  }

  const names = valueName.split('.');
  const namesLen = names.length;
  let result = source;
  let skipTheRest = false;
  names.forEach((name, index) => {
    if (skipTheRest) return;

    const value = result ? result[name] : null;
    if (index !== namesLen - 1 && Array.isArray(value)) {
      const inlinedName = `${name}.`;
      const partsOfValueName = valueName.split(inlinedName);
      const partsOfValueNameLen = partsOfValueName.length;
      const innerValueName = 1 === partsOfValueNameLen ? partsOfValueName[0] :
        2 === partsOfValueNameLen ? partsOfValueName[1] : partsOfValueName.slice(1).join(inlinedName);
      result = value.map((item) => getFieldContent(innerValueName, item));
      skipTheRest = true;
    } else {
      result = value;
    }
  });
  return convertResultToObject(result);
};

const convertResultToObject = (dataToConvert) => {
  if (!dataToConvert) {
    return null;
  }
  if (Array.isArray(dataToConvert) && dataToConvert.length > 0) {
    if (!dataToConvert.find((item) => (typeof item !== 'string' && typeof item !== 'number') || containRestrictedSymbols(item))) {
      const result = {};
      dataToConvert.forEach((item) => result[item] = null);
      return result;
    }
  }
  return dataToConvert;
};

const containRestrictedSymbols = (item) => {
  if (typeof item !== 'string') {
    return false;
  }

  return undefined !== RESTRICTED_SYMBOLS.find((char) => item.includes(char));
};

export default getFieldContent;
