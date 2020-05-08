import React from 'react'
import { Person } from '../../../types'

type TableItem = {
  person: Person,
  onPersonSelected: (personId: number) => void
}
const TableItem: React.FC<TableItem> = ({ person, onPersonSelected }) => {
  return <tr onClick={()=>onPersonSelected(person.id)}>
    <td>{person.id}</td>
    <td>{person.firstName}</td>
    <td>{person.lastName}</td>
    <td>{person.email}</td>
    <td>{person.phone}</td>
  </tr>
}

export default TableItem