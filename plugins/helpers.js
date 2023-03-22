export const formatDate = (dateObj, url = false, year = true) => {
  if (!dateObj) return

  const month = dateObj.getMonth() + 1
  const shortMonth = dateObj.toLocaleString('default', { month: 'short' })
  const date = dateObj.getDate()
  return [date, url ? month : shortMonth, year && dateObj.getFullYear()]
    .filter(Boolean)
    .join(url ? '-' : '/')
}

export const toCLP = price =>
  price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })

export const plural = (count, str) =>
  count > 1 || +count === 0 ? `${count} ${str}s` : `${count} ${str}`

export const dateStr = palabra => {
  const date = palabra.getDate()
  const month = palabra.getMonth()
  const year = palabra.getFullYear()
  const obj = new Date()
  obj.setMonth(month)
  const monthStr = obj.toLocaleString('es-CL', { month: 'long' })

  return [date, monthStr, year].join(' ')
}
