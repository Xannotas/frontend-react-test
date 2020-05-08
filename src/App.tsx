import React, { useState } from 'react'
import axios from 'axios'
import 'materialize-css/dist/css/materialize.min.css'

import './App.css'
import { Person, Column, SortType } from './types';
import { chunk, sort, findIndexById } from './helpers'

import Table from './components/Table';
import ModeSelector from './components/ModeSelector';
import Preloader from './components/Preloader';
import Pagination from './components/Pagination'
import PersonDescription from './components/PersonDescription';

const App: React.FC = () => {
  const pageSize = 10

  const [persons, setPersons] = useState<Person[]>([])
  const [activePerson, setActivePerson] = useState<Person|null>(null)
  
  const [isModeSelected, setIsModeSelected] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pageId, setPageId] = useState<number>(0)
  const [sortedColomnKey, setSortedColumnKey] = useState<Column>('id')
  const [sortType, setSortType] = useState<SortType>('asc')
  const displayPersons: Person[] = persons.length > pageSize ? chunk(persons, pageSize)[pageId] : persons
  
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
          <Table persons={displayPersons}
            onSort={handleSortTable}
            sortType={sortType}
            sortedColomnKey={sortedColomnKey}
            onPersonSelected={handlePersonSelected}
          />
        }

        {persons.length > pageSize &&
          <Pagination
            pageCount={Math.ceil(persons.length / pageSize)}
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
