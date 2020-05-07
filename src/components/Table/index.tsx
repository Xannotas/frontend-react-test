import React from 'react'
import { Person } from '../../types'

import TableItem from './TableItem'

type Props = {
  persons: Person[]
}

const Table: React.FC<Props> = ({ persons }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {persons &&
          persons.map(person => <TableItem key={person.id+person.phone} {...person} />) 
        }
      </tbody>
    </table>
  )
}

export default Table