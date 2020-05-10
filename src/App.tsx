import React, { useState } from 'react'
import axios from 'axios'
import 'materialize-css/dist/css/materialize.min.css'

import './App.css'
import { Person, Column, SortType, PersonData } from './types';
import { chunk, sort, findIndexById, formatPhone, filterPersons } from './helpers'

import Table from './components/Table';
import ModeSelector from './components/ModeSelector';
import Preloader from './components/Preloader';
import Pagination from './components/Pagination'
import PersonDescription from './components/PersonDescription';
import CreatePersonForm from './components/CreatePersonForm';
import Search from './components/Search';

const App: React.FC = () => {
  const pageSize = 10

  const [persons, setPersons] = useState<Person[]>([])
  const [activePerson, setActivePerson] = useState<Person | null>(null)

  const [isModeSelected, setIsModeSelected] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isShowForm, setIsShowForm] = useState<boolean>(false)

  const [pageId, setPageId] = useState<number>(0)
  const [sortedColomnKey, setSortedColumnKey] = useState<Column>('id')
  const [sortType, setSortType] = useState<SortType>('asc')
  const [searchValue, setSearchValue] = useState<string>('')

  const filteredPersons = filterPersons(persons, searchValue)
  const displayPersons: Person[] = persons.length > pageSize ? chunk(filteredPersons, pageSize)[pageId] : filteredPersons

  const handleModeSelected = async (url: string) => {
    setIsLoading(true)
    setIsModeSelected(true)
    axios.get(url).then(({ data }) => {
      const sortedPersons = sort(data, sortedColomnKey) as Person[]
      setPersons(sortedPersons)
      setIsLoading(false)
    }).catch(() => {
      alert('Не удалось загрузить данные')
      setIsLoading(false)
      setIsModeSelected(false)
    })
  }

  const handlePageChanged = (selected: number) => {
    setPageId(selected)
  }

  const handleSortTable = (columnKey: Column) => {
    if (columnKey === sortedColomnKey) {
      setPersons([...persons].reverse())
      setSortType(sortType === 'asc' ? 'desc' : 'asc')
    } else {
      setSortedColumnKey(columnKey)
      setSortType('asc')
      const sortedPersons = sort(persons, columnKey) as Person[]
      setPersons(sortedPersons)
    }
  }

  const handlePersonSelected = (personId: number) => {
    setActivePerson(persons[findIndexById(persons, personId)])
  }

  const handlePersonCreate = (personData: PersonData) => {
    const createdPerson: Person = {
      ...personData,
      phone: formatPhone(personData.phone),
      address: {
        streetAddress: '',
        zip: '',
        city: '',
        state: ''
      },
      description: ''
    }
    setPersons([createdPerson, ...persons])
  }

  const handleOpenForm = () => {
    setIsShowForm(!isShowForm)
  }

  const handleSearch = (searchValue: string) => {
    setSearchValue(searchValue)
    setPageId(0)
  }

  return (
    <div className="App">
      <div className="container">

        {isLoading &&
          <Preloader />
        }

        {!isModeSelected &&
          <ModeSelector onModeSelected={handleModeSelected} />
        }

        {persons.length > 0 &&
          <>
            <Search onSearch={handleSearch} />
            {isShowForm
              ? <CreatePersonForm onPersonCreate={handlePersonCreate} />
              : <button className='btn green right' onClick={handleOpenForm}>Добавить</button>
            }
            <Table persons={displayPersons}
              onSort={handleSortTable}
              sortType={sortType}
              sortedColomnKey={sortedColomnKey}
              onPersonSelected={handlePersonSelected}
            />
          </>
        }

        {persons.length > pageSize &&
          <Pagination
            pageCount={Math.ceil(filteredPersons.length / pageSize)}
            currentPageId={pageId}
            displayPages={6}
            onPageChanged={handlePageChanged}
          />
        }

        {activePerson &&
          <PersonDescription person={activePerson} />
        }
      </div>
    </div>
  );
}

export default App;
