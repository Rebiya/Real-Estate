import countries from "world-countries";

// Function to convert ISO alpha-2 code to flag emoji
const getFlagEmoji = (countryCode) => {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
};

const formattedCountries = countries.map((country) => ({
  value: country.name.common,
  label: `${country.name.common} ${getFlagEmoji(country.cca2)}`,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;
  return { getAll };
};

export default useCountries;
