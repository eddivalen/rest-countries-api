import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  
  // fetch countries from API
  const fetchCountries = async () => {
    await fetch(process.env.REACT_APP_API_URL+`all`)
    .then((res) => res.json())
    .then((data) => {
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
        return (
          <Link to={`/countries/${name.common}`} key={flag}>
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

export default Countries