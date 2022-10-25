 import React from 'react'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Filter = () => {
  return (
    <section className="filter">
      <form action="" className="filter__form-control">
        <FontAwesomeIcon icon={faSearch}/>
        <input type="search" name="search" id="search" placeholder='Search for a country...' />
      </form>
      <div className='filter__region-filter'>
        <select name="select" id="select" className="select">
          <option value="" disabled defaultValue={'Filter by region'} hidden></option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      
      </div>
    </section>
  )
}

export default Filter