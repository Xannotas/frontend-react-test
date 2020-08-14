import React from 'react'

type Props = {
  value: string
  setValue: (newValue: string) => void
  placeholder?: string
  type?: string
  maxLenght?: number
  contentType?: 'number' | 'text'
}

const Input: React.FC<Props> = ({
  value,
  setValue,
  placeholder,
  maxLenght = 32,
  type = 'text',
  contentType = 'text',
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value
    if (input.length <= maxLenght) {
      if (contentType === 'number' && !!input.match(/[^\d]/gi)) {
        return
      }
      setValue(input)
    }
  }

  return (
    <input
      className='validate input-field'
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input
