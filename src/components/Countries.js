import React, {useState, useEffect} from 'react'
const API_URL = 'https://restcountries.com/v3.1/all'

const Countries = () => {
  const [countries, setCountries] = useState([]);
  // fetch countries from API

  const fetchCountries = async () => {
    await fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(typeof data);
      setCountries(data);
    })
  }

  useEffect( () => {
    fetchCountries()
  }, [])


  return (
    <>
    <section className='countries'>
      { countries.map((country) => {
        const { name, population, region, capital, flags, flag} = country;
        const cap = typeof capital != 'undefined' ? capital[0] : '';
        console.log(name)
        return (
          <article key={flag}>
            <div className='wrapper'>
              <div className="top">
                <img src={flags.svg} alt={`Flag of ${name.common}`}/>
              </div>
              <div className='content'>
                <h3>{name.common}</h3>
                <p><span>Population:</span> {population}</p>
                <p><span>Region:</span> {region}</p>
                {cap.length > 0 && <p><span>Capital:</span> {cap}</p>} 
              </div>
            </div> 
          </article>
        )
      })}
    </section>
    </>
  )
}

export default Countries