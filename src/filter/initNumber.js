export default function (value) {
  if (!value && value !== 0) {
    return value
  }
  value = typeof value === 'number' ? value : Number(value)
  return value.toFixed(2)
}
