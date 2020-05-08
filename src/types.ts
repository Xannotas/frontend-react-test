export type Person = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: {
    streetAddress: string,
    city: string,
    state: string,
    zip: string
  },
  description: string
}

export type Column = 'id' | 'firstName' | 'lastName' | 'email' | 'phone'
export type SortType = 'asc' | 'desc'