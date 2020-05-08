import React from 'react'
import { Person, Column, SortType } from '../../types'
import './table.css'

import TableItem from './TableItem'

type Props = {
  persons: Person[],
  sortType: SortType,
  sortedColomnKey: Column,
  onSort: (columnKey: Column) => void
}

const Table: React.FC<Props> = ({ persons, onSort, sortType, sortedColomnKey}) => {
  return (
    <table>
      <thead>
        <tr>
          <th className={sortedColomnKey === 'id' ? 'sort-'+sortType : ''} onClick={() => onSort('id')}>Id</th>
          <th className={sortedColomnKey === 'firstName' ? 'sort-'+sortType : ''} onClick={() => onSort('firstName')}>First Name</th>
          <th className={sortedColomnKey === 'lastName' ? 'sort-'+sortType : ''} onClick={() => onSort('lastName')}>Last Name</th>
          <th className={sortedColomnKey === 'email' ? 'sort-'+sortType : ''} onClick={() => onSort('email')}>Email</th>
          <th className={sortedColomnKey === 'phone' ? 'sort-'+sortType : ''} onClick={() => onSort('phone')}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {persons &&
          persons.map(person => <TableItem key={person.id + person.phone} {...person} />)
        }
      </tbody>
    </table>
  )
}

export default Table