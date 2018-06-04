import axios from '~/plugins/axios'

export const getServerTime = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/data/timezone/db_server_time')
      .then(res => {
        const time = res.data
        resolve(time)
      })
      .catch(err => {
        console.log('err', err)
        reject(err)
      })
  })
}

export const getCreatedDateDiff = diffs => {
  const { year_diff, month_diff, week_diff, day_diff, hour_diff, minute_diff, second_diff } = diffs

  if (year_diff) return year_diff === 1 ? `a year ago` : `${year_diff} Years ago`

  if (month_diff) return month_diff === 1 ? `a month ago` : `${month_diff} months ago`

  if (week_diff) return week_diff === 1 ? `a week ago` : `${week_diff} weeks ago`

  if (day_diff) return day_diff === 1 ? `a day ago` : `${day_diff} days ago`

  if (hour_diff) return hour_diff === 1 ? `an hour ago` : `${hour_diff} hours ago`

  if (minute_diff) return minute_diff === 1 ? `a minute ago` : `${minute_diff} minutes ago`

  if (second_diff) return second_diff === 1 ? `a second ago` : `${second_diff} seconds ago`

  return ''
}
