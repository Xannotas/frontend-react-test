import React from 'react'
import { Person } from '../../../types'

const TableItem: React.FC<Person> = ({ id, firstName, lastName, email, phone }) => {
  return <tr>
    <th>{id}</th>
    <th>{firstName}</th>
    <th>{lastName}</th>
    <th>{email}</th>
    <th>{phone}</th>
  </tr>
}

export default TableItem