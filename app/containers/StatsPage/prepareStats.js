import messages from './messages';

const prepareCategories = (t, issues) => {
  const aux = {};
  issues.forEach((i) => {
    const translation = t(messages[i.category]);
    if (typeof aux[translation] === 'undefined') {
      aux[translation] = 0;
    }
    aux[translation] += 1;
  });
  console.log(aux);

  const results = [[t(messages.category), t(messages.numIssues)]];
  Object.keys(aux).forEach((c) => results.push([c, aux[c]]));
  console.log(results);
  return results;
};

export default prepareCategories;
