// fetch countries from API
const getCountries = async () => {
  const fields = 'name,population,region,capital,flags,cca2,cca3,borders,tld,currencies';
  const res = await fetch(`https://restcountries.com/v3.1/all?fields=${fields}`);
  return await res.json();
}

// fetch only languages for a specific country
const getCountryLanguages = async (countryCode) => {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=languages`);
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data; // Handle both array and single object responses
}

export { getCountries, getCountryLanguages };
export default getCountries;