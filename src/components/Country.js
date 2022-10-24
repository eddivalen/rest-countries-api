import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import getCountries from '../api/getCountries';
import { useQueryClient } from "@tanstack/react-query";



const Country = () => {
  const queryClient = useQueryClient();
 // const [country, setCountry] = useState([]);
  let country = {}
  let borders = [];
  const { countryCode } = useParams();

  const { data: countries, status} = useQuery(['countries'], getCountries,{
    initialData: () => {
      return queryClient.getQueryData(['countries'])
    }
  });
  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;
  if (status === "success"){
    country = countries.find( country => country.cca2 === countryCode.toUpperCase());
    if(typeof country.borders != 'undefined')
      borders = country.borders.map( border => {
        let item =  countries.find( country => country.cca3 === border)
        return {name: item.name.common, countryCode: item.cca2.toLowerCase()}
      });
  }
  console.log(country)
  /* if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>  */
  /* const result = useQuery(['countries', countryCode], getCountries, {
    initialData: () => {
      
      // Use a todo from the 'todos' query as the initial data for this todo query
      return queryClient.fetchQuery(['countries'])//?.find(d => d.cca2.toLowerCase() === countryCode)
    },
  }) */
  /* useEffect( () => {
    const fetchCountryData = async () => {
      // eslint-disable-next-line no-useless-concat
      await fetch(process.env.REACT_APP_API_URL+`alpha`+`/${countryCode}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data[0]);
      })
    
    }
    fetchCountryData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) */

  return (
    <>
      { 
      Object.keys(country).length > 0 &&
        <>
        <article className='country'>
          <div className='country__wrapper'>
            <Link className='' to="/">
              <div className='btn btn-light'><FontAwesomeIcon icon={faArrowLeft}/> <span>Back</span></div>
            </Link>
            <section className='country__wrapper__content'>
                <div className="flag">
                <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
                </div>
                <div className="info">
                  <h3>{country.name.common}</h3>
                  <div className="info__wrapper">
                    <div className="info__wrapper__left">
                      <p><span>Native Name:</span> {Object.values(country.name.nativeName)[0].official}</p>
                      <p><span>Population:</span> {country.population}</p>
                      <p><span>Region:</span> {country.region}</p>
                      <p><span>Capital:</span> {country.region}</p>
                    </div>
                    <div className="info__wrapper__right">
                      <p><span>Top Level Domain:</span> {country.tld}</p>
                      <p><span>Currencies:</span> {Object.values(country.currencies).map((cur) => cur.name).join(', ')}</p>
                      <p><span>Languages:</span> {Object.values(country.languages).join(', ')}</p>
                    </div>
                  </div>
                  { borders.length > 0 &&
                    <div className="info__border-countries">
                      <h4>Border Countries:</h4>
                      <div className="info__border-countries__countries">
                      {borders.map( (item,index) => {
                        return (
                          <Link to={`/country/${item.countryCode}`} key={index}>
                            <div className='btn'>{item.name}</div>
                          </Link>
                        )
                        })}
                      </div>
                  </div>
                      }
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