/**
 * 根据时间戳和指定格式生成对应格式日期时间字符串, 默认为当前
 * @param { number } 时间戳
 * @param { string } 需要生成的格式
 * @return { string } 生成的结果
 */
export function timeFormat(timestamp = Date.now(), format = 'YYYY-MM-DD') {
  const time = new Date(timestamp),
    timeDetailObj = {
      'Y+': time.getFullYear(),
      'M+': time.getMonth() + 1,
      'D+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds()
    }
  return Object.keys(timeDetailObj).reduce(
    (str, key) =>
      str.replace(new RegExp('(' + key + ')'), (_, $1) =>
        String(timeDetailObj[key]).padStart($1.length, '0')
      ),
    format
  )
}
