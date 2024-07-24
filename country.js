const countryName = new URLSearchParams(location.search).get("name");
const flagImage = document.querySelector(".country-details img");
const countryNameH1 = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");
const themeChanger = document.querySelector(".theme-changer");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    flagImage.src = country.flags.svg;
    countryNameH1.innerText = country.name.common;

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;
    subRegion.innerText = country.subregion;
    // capital.innerText = country.capital?.[0];
    if (country.capital) {
      capital.innerText = country.capital.join(", ");
    }
    domain.innerText = country.tld.join(", ");
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => {
          return currency.name;
        })
        .join(", ");
    }
    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        // console.log(border);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            console.log(borderCountryTag);
            borderCountries.append(borderCountryTag);
          });
      });
    } else {
      borderCountries.innerHTML = "";
    }
  });

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeChanger.innerHTML =
      '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode';
  } else {
    themeChanger.innerHTML =
      '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode';
  }
});
