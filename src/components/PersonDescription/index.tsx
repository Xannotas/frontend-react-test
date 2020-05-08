import React from 'react'
import { Person } from '../../types'
import './personDescription.css'

type Props = {
  person: Person
}
const PersonDescription: React.FC<Props> = ({ person }) => {
  return (
    <div className="person-description">
      <div className="person-description__name">
        Выбран пользователь: <b>{person.firstName} {person.lastName}</b>
      </div>
      <div className="person-description__description">
        Описание: <textarea defaultValue={person.description} />
      </div>
      <div className="person-description__address">
        Адрес проживания: <b>{person.address.streetAddress}</b>
      </div>
      <div className="person-description__city">
        Город: <b>{person.address.city}</b>
      </div>
      <div className="person-description__state">
        Провинция: <b>{person.address.state}</b>
      </div>
      <div className="person-description__zip">
        Индекс: <b>{person.address.zip}</b>
      </div>
    </div>
  )
}

export default PersonDescription
