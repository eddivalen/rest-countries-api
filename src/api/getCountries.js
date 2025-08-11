// fetch countries from API
const getCountries = async () => {
  const fields = 'name,population,region,capital,flags,cca2,cca3,borders,tld,currencies,languages';
  const res = await fetch(`https://restcountries.com/v3.1/all?fields=${fields}`);
  return await res.json();
}

export default getCountries;