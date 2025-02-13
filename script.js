document.getElementById("searchBtn").addEventListener("click", function () {
  const searchType = document.getElementById("searchType").value; 
  const query = document.getElementById("search").value.trim(); 

  if (!query) {
    alert("Please enter a valid search term");
    return;
  }

  let apiUrl = "";

  switch (searchType) {
    case "name":
      apiUrl = `https://restcountries.com/v3.1/name/${query}`;
      break;
    case "capital":
      apiUrl = `https://restcountries.com/v3.1/capital/${query}`;
      break;
    case "lang":
      apiUrl = `https://restcountries.com/v3.1/lang/${query}`;
      break;
    case "region":
      apiUrl = `https://restcountries.com/v3.1/region/${query}`;
      break;
    case "currency":
      apiUrl = `https://restcountries.com/v3.1/currency/${query}`;
      break;
    default:
      alert("Invalid search type");
      return;
  }

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("No results found");
      return response.json();
    })
    .then((data) => {
      displayCountries(data);
    })
    .catch((error) => {
      document.getElementById("results").innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});

function displayCountries(countries) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.textContent = "";

  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country-card");

    const countryName = document.createElement("h2");
    countryName.textContent = country.name.common;

    const flag = document.createElement("img");
    flag.src = country.flags.png;
    flag.alt = `Flag of ${country.name.common}`;
    flag.classList.add("flag");

    const capital = document.createElement("p");
    capital.innerHTML = `<strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}`;

    const population = document.createElement("p");
    population.innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;

    const region = document.createElement("p");
    region.innerHTML = `<strong>Region:</strong> ${country.region}`;

    const languages = document.createElement("p");
    languages.innerHTML = `<strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}`;

    countryCard.appendChild(countryName);
    countryCard.appendChild(flag);
    countryCard.appendChild(capital);
    countryCard.appendChild(population);
    countryCard.appendChild(region);
    countryCard.appendChild(languages);

    resultsContainer.appendChild(countryCard);
  });
}
