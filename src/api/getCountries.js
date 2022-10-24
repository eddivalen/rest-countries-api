// fetch countries from API
 const getCountries = async () => {
  const res = await fetch(process.env.REACT_APP_API_URL+`all`);
  return await res.json();
}

export default getCountries;