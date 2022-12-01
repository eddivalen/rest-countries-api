import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Countries from './components/Countries';
import Header from './components/Header';
import Filter from './components/Filter';
import Country from './components/Country';
import { ThemeContextProvider } from './context/ThemeContext';
import { useQuery } from '@tanstack/react-query';
import getCountries from './api/getCountries';


function App() {
  const { data: countries, status} = useQuery(['countries'], getCountries);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchByCountry, setSearchByCountry] = useState('');
  const [searchByRegion, setSearchByRegion] = useState('');
  
  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;
    
  return (
    <ThemeContextProvider>
        <Router>
            <Header/>
            <Routes>
              <Route exact path="/" element={
                  <div className="container">
                    <Filter 
                      countries={countries} 
                      setFilteredCountries={setFilteredCountries} 
                      setSearchByCountry={setSearchByCountry} 
                      setSearchByRegion={setSearchByRegion}
                      searchByCountry={searchByCountry}
                      searchByRegion={searchByRegion}
                    />
                    <Countries countries={searchByRegion.length > 0 || searchByCountry.length > 0 ? filteredCountries : countries} />
                  </div>
              }>
              </Route>
              <Route path="/country/:countryCode" element={
                <div className='container'>
                  <Country/>
                </div>
              }></Route>
            </Routes>
        </Router>
        {/* <ReactQueryDevtools initialIsOpen /> */}
    </ThemeContextProvider>
  );
}

export default App;
