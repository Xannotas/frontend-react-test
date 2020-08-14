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
      phone,
    }
    clearForm()
    onPersonCreate(personData)
  }

  const clearForm = () => {
    setId('')
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
  }

  const checkValidForm = () => {
    const valid: boolean =
      id.trim().length > 0 &&
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      email.trim().length > 0 &&
      phone.replace(/[^\d]/gi, '').length === phoneLenght

    setIsFormValid(valid)
  }

  useEffect(() => {
    checkValidForm()
  }, [id, firstName, lastName, email, phone]) // eslint-disable-line

  return (
    <form onSubmit={handleSubmit} className='form-create-person'>
      <Input
        value={id}
        setValue={setId}
        placeholder='Id'
        contentType='number'
      />
      <Input
        value={firstName}
        setValue={setFirstName}
        placeholder='First name'
      />
      <Input value={lastName} setValue={setLastName} placeholder='Last name' />
      <Input
        value={email}
        setValue={setEmail}
        placeholder='Email'
        type='email'
      />
      <Input
        value={phone}
        setValue={setPhone}
        placeholder='Phone'
        maxLenght={10}
        contentType='number'
      />

      <button className='btn green' disabled={!isFormValid} type='submit'>
        Добавить
      </button>
    </form>
  )
}

export default CreatePersonForm
