/**
 * Convert seconds to Hours, minutes, seconds
 * @param targetSeconds - seconds
 * @return converted hours, minutes, seconds
 */
export const convertSeconds = (targetSeconds: number) => {
  const hours = (parseInt((targetSeconds / (60 * 60)).toString()) || 0).toString().padStart(2, '0')
  const minutes = (parseInt(((targetSeconds / 60) % 60).toString()) || 0).toString().padStart(2, '0')
  const seconds = (parseInt((targetSeconds % 60).toString()) || 0).toString().padStart(2, '0')

  return {
    hours,
    minutes,
    seconds,
  }
}
