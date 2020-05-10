import React, { useState } from 'react'
import Input from '../common/Input'
import './search.css'

type Props = {
  onSearch: (searchValue: string) => void
}

const Search: React.FC<Props> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('')

  const handleSearch = () => {
    onSearch(searchValue)
  }

  return (
    <div className='search'>
      <button className='btn' onClick={handleSearch}>Поиск</button>
      <Input value={searchValue} setValue={setSearchValue} placeholder='Поиск' />
    </div>
  )
}

export default Search
