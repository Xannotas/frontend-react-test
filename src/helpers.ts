import { Column } from './types';

const phoneTemplate = '(xxx)xxx-xxxx'

export const chunk = (array: any[], size: number) => {
  const result: typeof array = []
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    result.push(array.slice(i * size, (i + 1) * size))
  }
  return result
}

export const sort = (array: any[], key: Column) => {
  return [...array].sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0)
}

export const findIndexById = (array: any[], id: number) => {
  return array.indexOf(array.find(item => item.id === id))
}

export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1)$2-$3')
}