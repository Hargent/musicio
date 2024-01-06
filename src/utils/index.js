export function replaceNonAlphabeticWithUnderscore(inputString) {
  // Use a regular expression to replace all non-alphabetic characters with "_"
  return inputString.replace(/[^a-zA-Z]+/g, "_");
}
