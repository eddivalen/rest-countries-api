import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Country = () => {
  const [country, setCountry] = useState([]);
  const { name } = useParams()
  useEffect( () => {
    const fetchCountryData = async () => {
      // eslint-disable-next-line no-useless-concat
      await fetch(process.env.REACT_APP_API_URL+`name`+`/${name}`)
      .then((res) => res.json())
      .then((data) => {
  
        console.log(data[0]);
        setCountry(data[0]);
      })
    
    }
    fetchCountryData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
      { 
      Object.keys(country).length > 0 &&
        <>
        <article className='country'>
          <div className='country__wrapper'>
            <Link className='btn btn-light' to="/"><FontAwesomeIcon icon={faArrowLeft}/> Back Home</Link>
            <section className='country__wrapper__content'>
                <div className="flag">
                <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
                </div>
                <div className="info">
                  <h3>{country.name.common}</h3>
                  <div className="info__left">
                    <p><span>Native Name:</span> {Object.values(country.name.nativeName)[0].official}</p>
                    <p><span>Population:</span> {country.population}</p>
                    <p><span>Region:</span> {country.region}</p>
                    <p><span>Capital:</span> {country.region}</p>
                  </div>
                  <div className="info__right">
                    <p><span>Top Level Domain:</span> {country.tld}</p>
                    <p><span>Currencies:</span> {Object.values(country.currencies).map((cur) => cur.name).join(', ')}</p>
                    <p><span>Languages:</span> {Object.values(country.languages).join(', ')}</p>
                  </div>
                  <div className="info__border-countries">
                    <h4>Border Countries:</h4>
                    {country.borders.map( (country,index) => {
                      return (
                        <div key={index}>
                          {country}
                        </div>
                      )
                    })}
                  </div>
                </div>
            </section> 
          </div>
        </article>
        </>
      }
    </>
  )
}

export default Country