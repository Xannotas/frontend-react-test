import React from 'react'
import { Person } from '../../../types'

const TableItem: React.FC<Person> = ({ id, firstName, lastName, email, phone }) => {
  return <tr>
    <td>{id}</td>
    <td>{firstName}</td>
    <td>{lastName}</td>
    <td>{email}</td>
    <td>{phone}</td>
  </tr>
}

export default TableItem