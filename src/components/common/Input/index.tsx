import React from 'react'

type Props = {
  value: string,
  setValue: (newValue: string) => void,
  placeholder?: string,
  type?: string,
  maxLenght?: number
}
const Input: React.FC<Props> = ({ value, setValue, placeholder, maxLenght = 32, type = 'text' }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length <= maxLenght) {

      setValue(event.currentTarget.value)
    }
  }
  return (
    <input className="validate input-field" placeholder={placeholder} type={type}
      value={value} onChange={onChange} />
  )
}

export default Input
