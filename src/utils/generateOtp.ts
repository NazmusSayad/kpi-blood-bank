export default function (length: number = 6) {
  if (length < 1) throw new Error('Minimum length is 1')
  if (length > 20) throw new Error('Maximum length is 20')

  const lengthStart = 10 ** (length - 1)
  const lengthEnd = lengthStart * 9
  return Math.floor(lengthStart + Math.random() * lengthEnd).toString()
}
