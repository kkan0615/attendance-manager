/**
 * Change all first words to uppercase
 * @param str - target string
 * @return UpperCased string each words or empty string if str is null
 */
export const toCapitalize = (str: string) => {
  return str && str.split(' ').map((word) => {
    return word[0].toUpperCase() + word.substring(1)
  }).join(' ') || ''
}

/**
 * Change first letter to uppercase, others are not changed
 * @param str - target string
 * @return UpperCased first letter string or empty string if str is null
 */
export const toCapitalizeFirstLetter = (str: string) => {
  return str && str.charAt(0).toUpperCase() + str.slice(1) || ''
}
