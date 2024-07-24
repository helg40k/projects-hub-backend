const getFieldContent = (valueName, source) => {
  if (!valueName || !source) {
    return null;
  }
  if (!valueName.includes('.')) {
    return source[valueName] || null;
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
  return result || null;
};

export default getFieldContent;
