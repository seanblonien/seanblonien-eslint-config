/**
 * Combines an array of regex expressions into a single regex expression via the union operator.
 */
const concatElementsByRegexUnion = (elements: string[]) =>
  elements.reduce((element, accum, index) => `${accum}${index === 0 ? '' : '|'}${element}`, '');

// Prefixes allowed at the start of a boolean variable/parameter name
export const booleanNamePrefixes = [
  'is',
  'as',
  'are',
  'was',
  'should',
  'has',
  'can',
  'did',
  'will',
  'use',
  'does',
  'show',
  'allow',
  'enabled',
  'enable',
  'disable',
  'editable',
  'refetch',
  'destructive',
  'hide',
  'error',
  'override',
  'need',
  'must',
  'require',
  'want',
];
// Regex for the rest of a boolean variable/parameter name (the part after the prefix)
const booleanNameSuffixes = '[A-Z]([A-Za-z]?)+';
// Exceptions to the rule for allowable boolean variable/parameter names
const booleanNameExceptionsList = [
  '^_',
  '_$',
  '[- /?:{}@%]',
  '^[A-Z][a-z]*([A-Z][a-z]*)',
  '^item$',
  '^value$',
  '^condition$',
  '^container$',
  '^included',
  '^center$',
  '^debug$',
  '^concurrent',
  '^animated$',
  '^allow',
  '^visible',
  '^merge$',
  '^multiSelect$',
  'Shown$',
  '^enumerable$',
  '^configurable$',
];
// A singular regex string for the boolean name exceptions (instead of array of expressions)
export const booleanNameExceptions = concatElementsByRegexUnion(booleanNameExceptionsList);
// The full boolean naming convetions regex

export const booleanNameConvention = new RegExp(
  `${concatElementsByRegexUnion(
    booleanNamePrefixes,
  )}|${booleanNameSuffixes}|${booleanNameExceptions}`,
).toString();
