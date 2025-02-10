// adding an event listener to the search button and getting user's input
document.getElementById("searchBtn").addEventListener("click", function () {
  const countryName = document.getElementById("search").value.trim();

  // if no entry, alert
  if (!countryName) {
    alert("Please enter a valid country");
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => {
      if (!response.ok) throw new Error("Country not found");
      return response.json();
    })
    .then((data) => {
      displayCountry(data[0]);
    })
    .catch((error) => {
      document.getElementById(
        "results"
      ).innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});

function displayCountry(country) {
  const resultsContainer = document.getElementById("results");

  resultsContainer.textContent = "";
  const countryName = document.createElement("h2");
  countryName.textContent = country.name.common;

  const flag = document.createElement("img");
  flag.src = country.flags.png;
  flag.alt = `Flag of ${country.name.common}`;
  flag.classList.add("flag");

  const capital = document.createElement("p");
  capital.innerHTML = `<strong>Capital:</strong> ${
    country.capital ? country.capital[0] : "N/A"
  }`;

  const population = document.createElement("p");
  population.innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;

  const region = document.createElement("p");
  region.innerHTML = `<strong>Region:</strong> ${country.region}`;

  const languages = document.createElement("p");
  languages.innerHTML = `<strong>Languages:</strong> ${Object.values(
    country.languages
  ).join(", ")}`;

  resultsContainer.appendChild(countryName);
  resultsContainer.appendChild(flag);
  resultsContainer.appendChild(capital);
  resultsContainer.appendChild(population);
  resultsContainer.appendChild(region);
  resultsContainer.appendChild(languages);
}
