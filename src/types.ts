export type PersonData = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string
}

export type Person = PersonData & {
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