import { Column, Person } from './types';

export const chunk = (array: any[], size: number) => {
  const result: typeof array = []
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    result.push(array.slice(i * size, (i + 1) * size))
  }
  return result
}

export const sort = (array: any[], key: Column) => {
  const sorted = [...array].sort((a, b) => {
    const prevItem = String(a[key]).toLowerCase()
    const nextItem = String(b[key]).toLowerCase()
    return prevItem < nextItem ? -1 : prevItem > nextItem ? 1 : 0
  })

  return sorted
}

export const findIndexById = (array: any[], id: number) => {
  return array.indexOf(array.find(item => item.id === id))
}

export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1)$2-$3')
}

export const filterPersons = (persons: Person[], searchValue: string) => {
  searchValue = searchValue.toLowerCase()
  if (!searchValue) {
    return persons
  }
  return persons.filter(person => person.email.toLowerCase().includes(searchValue) ||
    person.firstName.toLowerCase().includes(searchValue) ||
    person.phone.includes(searchValue) ||
    person.id.toString().includes(searchValue) ||
    person.lastName.toLowerCase().includes(searchValue))
}