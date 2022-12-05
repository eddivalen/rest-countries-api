import React from 'react'
import { Link } from 'react-router-dom';

const Countries = ({countries}) => {

  return (
    <>
      <section className='countries'>
        { countries.map((country) => {
          const { name, population, region, capital, flags, cca2: countryCode} = country;
          const cap = typeof capital != 'undefined' ? capital[0] : '';
          return (
            <Link to={`/country/${countryCode.toLowerCase()}`} key={countryCode}>
              <article>
                <div className='wrapper'>
                  <div className="wrapper__top">
                    <img src={flags.svg} alt={`Flag of ${name.common}`}/>
                  </div>
                  <div className='wrapper__content'>
                    <h3>{name.common}</h3>
                    <p><span>Population:</span> {population}</p>
                    <p><span>Region:</span> {region}</p>
                    {cap.length > 0 && <p><span>Capital:</span> {cap}</p>} 
                  </div>
                </div> 
              </article>
            </Link>
          )
        })}
      </section>
    </>
  ) 
}

export default Countries;