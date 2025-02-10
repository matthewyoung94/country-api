document.getElementById("searchBtn").addEventListener("click", function () {
  const countryName = document.getElementById("search").value.trim();

  if (!countryName) {
    alert("Please enter a country name");
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
  document.getElementById("results").innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.png}" alt="Flag of ${
    country.name.common
  }" class="flag">
        <p><strong>Capital:</strong> ${
          country.capital ? country.capital[0] : "N/A"
        }</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(
          ", "
        )}</p>
    `;
}
