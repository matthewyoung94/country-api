const resultsContainer = document.getElementById("results");
const searchBtn = document.getElementById("searchBtn");
const searchType = document.getElementById("searchType");
const searchInput = document.getElementById("search");

const paginationContainer = document.createElement("div");
paginationContainer.id = "pagination";
document.body.appendChild(paginationContainer);

let allCountries = []; 
let currentPage = 1;
const countriesPerPage = 6; 

searchBtn.addEventListener("click", function () {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a valid search term");
    return;
  }

  let apiUrl = "";
  switch (searchType.value) {
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
      allCountries = data;
      currentPage = 1; 
      displayCountries();
    })
    .catch((error) => {
      resultsContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
      paginationContainer.innerHTML = ""; 
    });
});

function displayCountries() {
  resultsContainer.textContent = "";
  paginationContainer.textContent = "";

  const start = (currentPage - 1) * countriesPerPage;
  const end = start + countriesPerPage;
  const countriesToShow = allCountries.slice(start, end);

  countriesToShow.forEach(displayCountryCard);
  createPaginationButtons();
}

function displayCountryCard(country) {
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
}

function createPaginationButtons() {
  paginationContainer.innerHTML = "";

  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.classList.add("page-btn");
    prevButton.addEventListener("click", () => {
      currentPage--;
      displayCountries();
    });
    paginationContainer.appendChild(prevButton);
  }

  const pageIndicator = document.createElement("span");
  pageIndicator.textContent = ` Page ${currentPage} of ${Math.ceil(allCountries.length / countriesPerPage)} `;
  paginationContainer.appendChild(pageIndicator);

  if (currentPage < Math.ceil(allCountries.length / countriesPerPage)) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.classList.add("page-btn");
    nextButton.addEventListener("click", () => {
      currentPage++;
      displayCountries();
    });
    paginationContainer.appendChild(nextButton);
  }
}
