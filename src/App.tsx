import React, { useState } from 'react'
import axios from 'axios'
import 'materialize-css/dist/css/materialize.min.css'
import './App.css'

import { Person } from './types';
import Table from './components/Table';
import ModeSelector from './components/ModeSelector';
import Preloader from './components/Preloader';
import Pagination from './components/Pagination'
import { chunk } from './helpers'

const App: React.FC = () => {
  const pageSize = 15

  const [persons, setPersons] = useState<Person[]>([])
  const [isModeSelected, setIsModeSelected] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pageId, setPageId] = useState<number>(0)

  const displayPersons: Person[] = persons.length > pageSize ? chunk(persons, pageSize)[pageId] : persons

  const handleModeSelected = async (url: string) => {
    setIsLoading(true)
    setIsModeSelected(true)
    axios.get(url).then(({ data }) => {
      setPersons(data as Person[])
      setIsLoading(false)
    })
  }

  const handlePageChanged = (selected: number) => {
    setPageId(selected)
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
          <Table persons={displayPersons} />
        }

        {persons.length > pageSize &&
          <Pagination
            pageCount={Math.ceil(persons.length / pageSize)}
            currentPageId={pageId}
            displayPages={10}
            onPageChanged={handlePageChanged}
          />
        }
      </div>
    </div>
  );
}

export default App;
