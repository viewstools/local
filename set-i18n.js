const REPLACE = /^(?:text|placeholder)\s(?:<[^\s]*\s)?(.*)/;
const GET_TEXT_AND_SLOT = /\/(text|placeholder)\s(<[^\s]*\s)?/;

const isText = line => /^(text|placeholder)/.test(line);
const isBlock = line => /^[A-Z]/.test(line);
const replaceText = (line, newText) =>
  line.replace(line.match(REPLACE)[1], newText);
const getPath = key => {
  const match = key.match(/([^\s]+)\s/);
  return match[1].split('/');
};
const getStartIndex = (path, lines) => {
  let startIndex = 0;
  path.forEach((name, index) => {
    for (let i = startIndex; i < lines.length; i++) {
      if (isBlock(name) && new RegExp(name).test(lines[i])) {
        startIndex = i + 1;
        break;
      }
    }
  });
  return startIndex;
};

function setI18n({ defaultLanguage = 'en', source, view, translations }) {
  const lines = source
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trim());
  const languages = Object.keys(translations).filter(
    lang => lang !== defaultLanguage
  );
  const keys = Object.keys(translations[defaultLanguage]);

  keys.forEach(key => {
    const startIndex = getStartIndex(getPath(key), lines);
    languages.forEach(lang => {
      let added = false;
      let i = startIndex;
      const bits = key.match(GET_TEXT_AND_SLOT);
      const whenLine = `when <${lang}`;
      const textLine = `${bits[1]} ${bits[2] || ''}${translations[lang][key]}`;

      while (!added) {
        const isEndOfBlock = lines[i] === '' || isBlock(lines[i]);
        const isEndOfContent = i === lines.length - 1;
        const isWhenLine = new RegExp(whenLine).test(lines[i]);

        if (isWhenLine || isEndOfBlock || isEndOfContent) {
          isWhenLine && lines.splice(i, 2);
          const index = isEndOfContent ? i + 1 : i;
          lines.splice(index, 0, whenLine, textLine);
          added = true;
          return;
        }
        i++;
      }
    });
  });

  return lines.join('\n');
}
module.exports = setI18n;
