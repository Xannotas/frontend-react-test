export const chunk = (array: any[], size: number) => {
  const result: typeof array = []
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    result.push(array.slice(i * size, (i + 1) * size))
  }
  return result
}