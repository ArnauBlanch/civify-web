import messages from './messages';
import { formatDate } from '../../components/AchievementEventForm';

const categories = ['road_signs', 'illumination', 'grove', 'street_furniture',
  'trash_and_cleaning', 'public_transport', 'suggestion', 'other'];

export function prepareCategories(t, issues) {
  const aux = {};
  issues.forEach((i) => {
    const translation = t(messages[i.category]);
    if (typeof aux[translation] === 'undefined') {
      aux[translation] = 0;
    }
    aux[translation] += 1;
  });

  const results = [[t(messages.category), t(messages.numIssues)]];
  Object.keys(aux).forEach((c) => results.push([c, aux[c]]));
  return results;
}

export function prepareCategoriesResolved(t, issues) {
  const aux = {};
  issues.forEach((i) => {
    const translation = t(messages[i.category]);
    if (typeof aux[translation] === 'undefined') {
      aux[translation] = { resolved: 0, unresolved: 0 };
    }
    if (i.resolved) aux[translation].resolved += 1;
    else aux[translation].unresolved += 1;
  });

  const results = [[
    'Resolved/Unresolved',
    t(messages.resolved),
    t(messages.unresolved),
  ]];
  Object.keys(aux).forEach((c) => results.push([c, aux[c].resolved, aux[c].unresolved]));
  return results;
}

export function prepareDates(t, issues) {
  const aux = {};
  issues.forEach((i) => {
    const date = formatDate(new Date(i.created_at));
    if (typeof aux[date] === 'undefined') {
      aux[date] = [0, 0, 0, 0, 0, 0, 0, 0];
    }
    aux[date][categories.indexOf(i.category)] += 1;
  });

  const results = [];
  const topRow = ['Date'];
  categories.forEach((c) => topRow.push(t(messages[c])));
  results.push(topRow);
  Object.keys(aux).forEach((d) => {
    const row = [d];
    aux[d].forEach((c) => row.push(c));
    results.push(row);
  });
  return results;
}
