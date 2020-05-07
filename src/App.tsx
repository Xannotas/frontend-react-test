import React, { useState } from 'react'
import axios from 'axios'
import 'materialize-css/dist/css/materialize.min.css'
import './App.css'

import { Person } from './types';
import Table from './components/Table';
import ModeSelector from './components/ModeSelector';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [isModeSelected, setIsModeSelected] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleModeSelected = async (url: string) => {
    setIsLoading(true)
    setIsModeSelected(true)
    axios.get(url).then(({ data }) => {
      setPersons(data as Person[])
      setIsLoading(false)
    })
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
          <Table persons={persons} />
        }
      </div>
    </div>
  );
}

export default App;
