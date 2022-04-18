import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import weekday from 'dayjs/plugin/weekday'
// import 'dayjs/locale/ko'
// import 'dayjs/locale/en'

export const initDayjs = () => {
  dayjs.extend(relativeTime)
  dayjs.extend(localizedFormat)
  dayjs.extend(isBetween)
  dayjs.extend(isSameOrAfter)
  dayjs.extend(isSameOrBefore)
  dayjs.extend(weekday)
}
