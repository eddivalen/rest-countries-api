 import React from 'react'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Filter = ({countries, setFilteredCountries, setSearchByCountry, setSearchByRegion, searchByCountry, searchByRegion}) => {
  
  const handleSearchByCountry = (value) => {
    setSearchByCountry(value);
    if(value){
      if(searchByRegion.length > 0 && searchByRegion != 'All'){
        filterByCountry(value,true);
      }else{
        filterByCountry(value,false);
      }
    }else{
      if(searchByRegion === 'All'){
        setSearchByRegion('');
        setFilteredCountries([]);
      }else{
        filterByRegion(searchByRegion,false);
      }
    }
  }
  const handleSearchByRegion = (value) => {
    setSearchByRegion(value);
    if(value == 'All'){
      if(searchByCountry.length > 0){
        filterByCountry(searchByCountry,false);
      }else{
        setSearchByRegion('');
        setFilteredCountries([]);
      }
    }else if(value){
      if(searchByCountry.length > 0){
        filterByRegion(value,true);
      }else{
        filterByRegion(value,false);
      }
    }
  }
  const filterByCountry = (value, byRegion) => {
    if(byRegion){
      const filteredCountries = countries.filter( (country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase()))
        .filter( (country) => country.region.toLowerCase() === searchByRegion.toLowerCase());
      setFilteredCountries(filteredCountries);
    }else{
      const filteredCountries = countries.filter( (country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase()));
      setFilteredCountries(filteredCountries);
    }
  }
  const filterByRegion = (value, byCountry) => {
    if(byCountry){
      const filteredCountries = countries.filter( (country) =>
        country.name.common.toLowerCase().includes(searchByCountry.toLowerCase()))
        .filter( (country) => country.region.toLowerCase() === value.toLowerCase());
        setFilteredCountries(filteredCountries);
    }else{
      const filteredCountries = countries.filter( (country) => 
        country.region.toLowerCase() === value.toLowerCase())
        console.log(filteredCountries);
        setFilteredCountries(filteredCountries);
    }
  }

  return (
    <section className="filter">
      <form action="" className="filter__form-control">
        <FontAwesomeIcon icon={faSearch}/>
        <input type="search" name="search" id="search" placeholder='Search for a country...' onChange={(e) => handleSearchByCountry(e.target.value)} />
      </form>
      <div className='filter__region-filter'>
        <select name="select" id="select" defaultValue={'Filter by region'} className="select" onChange={(e) => handleSearchByRegion(e.target.value)}>
          <option value="Filter by region" disabled hidden>Filter by Region</option>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      
      </div>
    </section>
  )
}

export default Filter;