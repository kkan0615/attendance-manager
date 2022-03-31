export const toCapitalize = (str: string) => {
  return str.split(' ').map((word) => {
    return word[0].toUpperCase() + word.substring(1)
  }).join('')
}
