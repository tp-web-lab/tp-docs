import { createHash } from 'node:crypto';

export function classifyDifferences(results, reviewed) {
  const categories = [
    { id: 'list-attributes', label: 'Generated list attributes only', description: 'TP adds data-choice-list to ul/ol elements. Removing only that attribute makes the normalized HTML identical to CommonMark.' },
    { id: 'heading-attributes', label: 'Generated heading attributes only', description: 'TP adds id and tabindex to headings. Removing only those attributes makes the normalized HTML identical.' },
    { id: 'list-heading-attributes', label: 'Generated list and heading attributes only', description: 'The same example combines data-choice-list on lists with id/tabindex on headings; its remaining HTML is identical.' },
    ...reviewed,
    { id: 'unreviewed', label: 'Other differences — review needed', description: 'New or changed output that does not match the verified classifications below.' },
  ].map(category => ({ ...category, cases: [] }));
  for (const result of results.filter(result => result.status === 'difference')) {
    const actual = result.normalizedActual;
    const withoutLists = actual.replace(/(<(?:ul|ol)\b[^>]*?) data-choice-list="[^"]*"/g, '$1');
    const cleaned = withoutLists.replace(/<h[1-6]\b[^>]*>/g, tag => tag.replace(/ (?:id|tabindex)="[^"]*"/g, ''));
    let id;
    if (cleaned === result.normalizedExpected) {
      const list = withoutLists !== actual;
      const heading = cleaned !== withoutLists;
      id = list && heading ? 'list-heading-attributes' : list ? 'list-attributes' : heading ? 'heading-attributes' : 'unreviewed';
    } else {
      const signature = createHash('sha256').update(result.normalizedExpected + '\0' + actual).digest('hex');
      id = reviewed.find(category => category.cases.some(test => test.example === result.example && test.signature === signature))?.id ?? 'unreviewed';
    }
    result.differenceType = id;
    categories.find(category => category.id === id).cases.push(result);
  }
  return categories.filter(category => category.cases.length > 0);
}
