export type Person = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: {
    streenAddress: string,
    city: string,
    state: string,
    zip: string
  },
  disctiption: string
}