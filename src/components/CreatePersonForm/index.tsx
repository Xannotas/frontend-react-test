import React, { useState, useEffect } from 'react'
import './createPersonForm.css'
import Input from '../common/Input'
import { PersonData } from '../../types'

type Props = {
  onPersonCreate: (personData: PersonData) => void
}

const CreatePersonForm: React.FC<Props> = ({ onPersonCreate }) => {
  const phoneLenght: number = 10
  const [isFormValid, setIsFormValid] = useState<boolean>(false)

  const [id, setId] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const personData: PersonData = {
      id: Number(id),
      firstName,
      lastName,
      email,
      phone
    }
    setId('')
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')

    onPersonCreate(personData)
  }

  const checkValidForm = () => {
    const valid: boolean = id &&
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      parseInt(phone) &&
      phone.length === phoneLenght ? true : false
    setIsFormValid(valid)
  }

  useEffect(() => {
    checkValidForm()
  }, [id, firstName, lastName, email, phone])

  return (
    <form onSubmit={handleSubmit} className='form-create-person'>
      <Input value={id} setValue={setId} placeholder='Id' type='number' />
      <Input value={firstName} setValue={setFirstName} placeholder='First name' />
      <Input value={lastName} setValue={setLastName} placeholder='Last name' />
      <Input value={email} setValue={setEmail} placeholder='Email' type='email' />
      <Input value={phone} setValue={setPhone} placeholder='Phone' maxLenght={10} />

      <button className="btn green" disabled={!isFormValid} type='submit'>Добавить</button>
    </form>
  )
}

export default CreatePersonForm
