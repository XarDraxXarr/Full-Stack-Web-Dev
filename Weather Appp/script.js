// Weather App JavaScript with Live Data

class WeatherApp {
  constructor() {
    this.initializeElements();
    this.bindEvents();
    // OpenWeatherMap API key - In production, this should be stored securely
    this.apiKey = "30205382581a0fd23ae8c530c66caa42";
    this.baseUrl = "https://api.openweathermap.org/data/2.5";
    this.geoUrl = "https://api.openweathermap.org/geo/1.0";
  }

  initializeElements() {
    this.stateInput = document.getElementById("stateInput");
    this.searchBtn = document.getElementById("searchBtn");
    this.loadingSpinner = document.getElementById("loadingSpinner");
    this.errorMessage = document.getElementById("errorMessage");
    this.resultsContainer = document.getElementById("resultsContainer");
    this.weatherGrid = document.getElementById("weatherGrid");
    this.resultsTitle = document.createElement("h2");
    this.resultsTitle.className = "results-title";
    this.resultsContainer.prepend(this.resultsTitle);

    // Update placeholder text for global search
    this.stateInput.placeholder =
      "Enter state/province/country (e.g., India, Bangladesh, France)";
  }

  bindEvents() {
    this.searchBtn.addEventListener("click", () => this.handleSearch());
    this.stateInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleSearch();
      }
    });
  }

  async handleSearch() {
    const location = this.stateInput.value.trim();

    if (!location) {
      this.showError("Please enter a location (state, province, or country)");
      return;
    }

    if (this.apiKey === "YOUR_API_KEY_HERE") {
      this.showError(
        "Please add your OpenWeatherMap API key to use live weather data. Get one free at openweathermap.org"
      );
      return;
    }

    this.showLoading();

    try {
      const cities = await this.getCitiesForLocation(location);

      if (cities.length === 0) {
        this.showError(
          `No cities found for "${location}". Try searching for a state, province, or country name.`
        );
        return;
      }

      const weatherData = await this.getWeatherForCities(cities);
      this.displayWeatherResults(weatherData, location);
    } catch (error) {
      console.error("Weather API Error:", error);
      this.showError(
        "Failed to fetch weather data. Please check your internet connection and try again."
      );
    } finally {
      this.hideLoading();
    }
  }

  async getCitiesForLocation(location) {
    try {
      // First, try to get cities by state/province
      const stateResponse = await fetch(
        `${this.geoUrl}/direct?q=${encodeURIComponent(
          location
        )}&limit=50&appid=${this.apiKey}`
      );

      if (!stateResponse.ok) {
        throw new Error(`HTTP error! status: ${stateResponse.status}`);
      }

      const stateData = await stateResponse.json();

      if (stateData.length === 0) {
        return [];
      }

      // Group cities by country and state/province
      const locationGroups = {};
      stateData.forEach((city) => {
        const key = `${city.country}-${city.state || "N/A"}`;
        if (!locationGroups[key]) {
          locationGroups[key] = [];
        }
        locationGroups[key].push(city);
      });

      // Get the most relevant group (largest group or exact match)
      let selectedCities = [];
      const searchLower = location.toLowerCase();

      for (const [key, cities] of Object.entries(locationGroups)) {
        const [country, state] = key.split("-");
        if (
          state.toLowerCase().includes(searchLower) ||
          country.toLowerCase().includes(searchLower) ||
          searchLower.includes(state.toLowerCase()) ||
          searchLower.includes(country.toLowerCase())
        ) {
          if (cities.length > selectedCities.length) {
            selectedCities = cities;
          }
        }
      }

      // If no good match, take the largest group
      if (selectedCities.length === 0) {
        selectedCities = Object.values(locationGroups)[0] || [];
      }

      // Limit to top 12 cities for performance
      return selectedCities.slice(0, 12);
    } catch (error) {
      console.error("Geocoding API Error:", error);
      throw error;
    }
  }

  async getWeatherForCities(cities) {
    const weatherPromises = cities.map(async (city) => {
      try {
        const response = await fetch(
          `${this.baseUrl}/weather?lat=${city.lat}&lon=${city.lon}&appid=${this.apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const weatherData = await response.json();

        return {
          city: city.name,
          state: city.state || city.country,
          country: this.getCountryName(city.country),
          temperature: Math.round(weatherData.main.temp),
          temperatureF: Math.round((weatherData.main.temp * 9) / 5 + 32),
          humidity: weatherData.main.humidity,
          condition: this.capitalizeWords(weatherData.weather[0].description),
          weatherCode: weatherData.weather[0].id,
          feelsLike: Math.round(weatherData.main.feels_like),
          pressure: weatherData.main.pressure,
          windSpeed: Math.round(weatherData.wind?.speed * 3.6) || 0, // Convert m/s to km/h
          visibility: Math.round((weatherData.visibility || 10000) / 1000), // Convert to km
          icon: weatherData.weather[0].icon,
        };
      } catch (error) {
        console.error(`Error fetching weather for ${city.name}:`, error);
        return null;
      }
    });

    const results = await Promise.all(weatherPromises);
    return results.filter((result) => result !== null);
  }

  displayWeatherResults(weatherData, locationName) {
    this.hideAllMessages();

    this.weatherGrid.innerHTML = "";

    if (weatherData.length === 0) {
      this.showError("No weather data available for the found cities.");
      return;
    }

    weatherData.forEach((city) => {
      const weatherCard = this.createWeatherCard(city);
      this.weatherGrid.appendChild(weatherCard);
    });

    // Determine the location type for the title
    const firstCity = weatherData[0];
    let locationDisplay = this.capitalizeWords(locationName);
    if (firstCity.state !== firstCity.country) {
      locationDisplay += `, ${firstCity.country}`;
    }

    this.resultsTitle.textContent = `Weather in ${locationDisplay} (${weatherData.length} cities)`;
    this.resultsContainer.classList.remove("hidden");
  }

  createWeatherCard(cityData) {
    const card = document.createElement("div");
    card.className = "weather-card";

    const weatherEmoji = this.getWeatherEmoji(cityData.weatherCode);

    // Create location display
    let locationText = `${cityData.city}`;
    if (cityData.state !== cityData.country) {
      locationText += `, ${cityData.state}`;
    }
    locationText += `, ${cityData.country}`;

    card.innerHTML = `
            <div class="city-name">
                <span>${weatherEmoji}</span>
                <span>${locationText}</span>
            </div>
            <div class="weather-info">
                <div class="weather-item temperature">
                    <div class="weather-label">Temperature</div>
                    <div class="weather-value">${cityData.temperature}°C / ${cityData.temperatureF}°F</div>
                </div>
                <div class="weather-item">
                    <div class="weather-label">Condition</div>
                    <div class="weather-value">${cityData.condition}</div>
                </div>
                <div class="weather-item">
                    <div class="weather-label">Humidity</div>
                    <div class="weather-value">${cityData.humidity}%</div>
                </div>
                <div class="weather-item">
                    <div class="weather-label">Feels Like</div>
                    <div class="weather-value">${cityData.feelsLike}°C</div>
                </div>
                <div class="weather-item">
                    <div class="weather-label">Wind Speed</div>
                    <div class="weather-value">${cityData.windSpeed} km/h</div>
                </div>
                <div class="weather-item">
                    <div class="weather-label">Visibility</div>
                    <div class="weather-value">${cityData.visibility} km</div>
                </div>
            </div>
        `;

    return card;
  }

  getWeatherEmoji(weatherCode) {
    // OpenWeatherMap weather condition codes to emojis
    if (weatherCode >= 200 && weatherCode < 300) return "⛈️"; // Thunderstorm
    if (weatherCode >= 300 && weatherCode < 400) return "🌦️"; // Drizzle
    if (weatherCode >= 500 && weatherCode < 600) return "🌧️"; // Rain
    if (weatherCode >= 600 && weatherCode < 700) return "❄️"; // Snow
    if (weatherCode >= 700 && weatherCode < 800) return "🌫️"; // Atmosphere (fog, etc.)
    if (weatherCode === 800) return "☀️"; // Clear sky
    if (weatherCode > 800) return "☁️"; // Clouds
    return "🌤️"; // Default
  }

  getCountryName(countryCode) {
    const countries = {
      AD: "Andorra",
      AE: "United Arab Emirates",
      AF: "Afghanistan",
      AG: "Antigua and Barbuda",
      AI: "Anguilla",
      AL: "Albania",
      AM: "Armenia",
      AO: "Angola",
      AQ: "Antarctica",
      AR: "Argentina",
      AS: "American Samoa",
      AT: "Austria",
      AU: "Australia",
      AW: "Aruba",
      AX: "Åland Islands",
      AZ: "Azerbaijan",
      BA: "Bosnia and Herzegovina",
      BB: "Barbados",
      BD: "Bangladesh",
      BE: "Belgium",
      BF: "Burkina Faso",
      BG: "Bulgaria",
      BH: "Bahrain",
      BI: "Burundi",
      BJ: "Benin",
      BL: "Saint Barthélemy",
      BM: "Bermuda",
      BN: "Brunei",
      BO: "Bolivia",
      BQ: "Caribbean Netherlands",
      BR: "Brazil",
      BS: "Bahamas",
      BT: "Bhutan",
      BV: "Bouvet Island",
      BW: "Botswana",
      BY: "Belarus",
      BZ: "Belize",
      CA: "Canada",
      CC: "Cocos Islands",
      CD: "DR Congo",
      CF: "Central African Republic",
      CG: "Republic of the Congo",
      CH: "Switzerland",
      CI: "Côte d'Ivoire",
      CK: "Cook Islands",
      CL: "Chile",
      CM: "Cameroon",
      CN: "China",
      CO: "Colombia",
      CR: "Costa Rica",
      CU: "Cuba",
      CV: "Cape Verde",
      CW: "Curaçao",
      CX: "Christmas Island",
      CY: "Cyprus",
      CZ: "Czech Republic",
      DE: "Germany",
      DJ: "Djibouti",
      DK: "Denmark",
      DM: "Dominica",
      DO: "Dominican Republic",
      DZ: "Algeria",
      EC: "Ecuador",
      EE: "Estonia",
      EG: "Egypt",
      EH: "Western Sahara",
      ER: "Eritrea",
      ES: "Spain",
      ET: "Ethiopia",
      FI: "Finland",
      FJ: "Fiji",
      FK: "Falkland Islands",
      FM: "Micronesia",
      FO: "Faroe Islands",
      FR: "France",
      GA: "Gabon",
      GB: "United Kingdom",
      GD: "Grenada",
      GE: "Georgia",
      GF: "French Guiana",
      GG: "Guernsey",
      GH: "Ghana",
      GI: "Gibraltar",
      GL: "Greenland",
      GM: "Gambia",
      GN: "Guinea",
      GP: "Guadeloupe",
      GQ: "Equatorial Guinea",
      GR: "Greece",
      GS: "South Georgia",
      GT: "Guatemala",
      GU: "Guam",
      GW: "Guinea-Bissau",
      GY: "Guyana",
      HK: "Hong Kong",
      HM: "Heard Island",
      HN: "Honduras",
      HR: "Croatia",
      HT: "Haiti",
      HU: "Hungary",
      ID: "Indonesia",
      IE: "Ireland",
      IL: "Israel",
      IM: "Isle of Man",
      IN: "India",
      IO: "British Indian Ocean Territory",
      IQ: "Iraq",
      IR: "Iran",
      IS: "Iceland",
      IT: "Italy",
      JE: "Jersey",
      JM: "Jamaica",
      JO: "Jordan",
      JP: "Japan",
      KE: "Kenya",
      KG: "Kyrgyzstan",
      KH: "Cambodia",
      KI: "Kiribati",
      KM: "Comoros",
      KN: "Saint Kitts and Nevis",
      KP: "North Korea",
      KR: "South Korea",
      KW: "Kuwait",
      KY: "Cayman Islands",
      KZ: "Kazakhstan",
      LA: "Laos",
      LB: "Lebanon",
      LC: "Saint Lucia",
      LI: "Liechtenstein",
      LK: "Sri Lanka",
      LR: "Liberia",
      LS: "Lesotho",
      LT: "Lithuania",
      LU: "Luxembourg",
      LV: "Latvia",
      LY: "Libya",
      MA: "Morocco",
      MC: "Monaco",
      MD: "Moldova",
      ME: "Montenegro",
      MF: "Saint Martin",
      MG: "Madagascar",
      MH: "Marshall Islands",
      MK: "North Macedonia",
      ML: "Mali",
      MM: "Myanmar",
      MN: "Mongolia",
      MO: "Macao",
      MP: "Northern Mariana Islands",
      MQ: "Martinique",
      MR: "Mauritania",
      MS: "Montserrat",
      MT: "Malta",
      MU: "Mauritius",
      MV: "Maldives",
      MW: "Malawi",
      MX: "Mexico",
      MY: "Malaysia",
      MZ: "Mozambique",
      NA: "Namibia",
      NC: "New Caledonia",
      NE: "Niger",
      NF: "Norfolk Island",
      NG: "Nigeria",
      NI: "Nicaragua",
      NO: "Norway",
      NP: "Nepal",
      NR: "Nauru",
      NU: "Niue",
      NZ: "New Zealand",
      OM: "Oman",
      PA: "Panama",
      PE: "Peru",
      PF: "French Polynesia",
      PG: "Papua New Guinea",
      PH: "Philippines",
      PK: "Pakistan",
      PL: "Poland",
      PM: "Saint Pierre and Miquelon",
      PN: "Pitcairn Islands",
      PR: "Puerto Rico",
      PS: "Palestine",
      PT: "Portugal",
      PW: "Palau",
      PY: "Paraguay",
      QA: "Qatar",
      RE: "Réunion",
      RO: "Romania",
      RS: "Serbia",
      RU: "Russia",
      RW: "Rwanda",
      SA: "Saudi Arabia",
      SB: "Solomon Islands",
      SC: "Seychelles",
      SD: "Sudan",
      SE: "Sweden",
      SG: "Singapore",
      SH: "Saint Helena",
      SI: "Slovenia",
      SJ: "Svalbard and Jan Mayen",
      SK: "Slovakia",
      SL: "Sierra Leone",
      SM: "San Marino",
      SN: "Senegal",
      SO: "Somalia",
      SR: "Suriname",
      SS: "South Sudan",
      ST: "São Tomé and Príncipe",
      SV: "El Salvador",
      SX: "Sint Maarten",
      SY: "Syria",
      SZ: "Eswatini",
      TC: "Turks and Caicos Islands",
      TD: "Chad",
      TF: "French Southern Territories",
      TG: "Togo",
      TH: "Thailand",
      TJ: "Tajikistan",
      TK: "Tokelau",
      TL: "Timor-Leste",
      TM: "Turkmenistan",
      TN: "Tunisia",
      TO: "Tonga",
      TR: "Turkey",
      TT: "Trinidad and Tobago",
      TV: "Tuvalu",
      TW: "Taiwan",
      TZ: "Tanzania",
      UA: "Ukraine",
      UG: "Uganda",
      UM: "United States Minor Outlying Islands",
      US: "United States",
      UY: "Uruguay",
      UZ: "Uzbekistan",
      VA: "Vatican City",
      VC: "Saint Vincent and the Grenadines",
      VE: "Venezuela",
      VG: "British Virgin Islands",
      VI: "United States Virgin Islands",
      VN: "Vietnam",
      VU: "Vanuatu",
      WF: "Wallis and Futuna",
      WS: "Samoa",
      YE: "Yemen",
      YT: "Mayotte",
      ZA: "South Africa",
      ZM: "Zambia",
      ZW: "Zimbabwe",
    };

    return countries[countryCode] || countryCode;
  }

  capitalizeWords(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  showLoading() {
    this.loadingSpinner.classList.remove("hidden");
    this.errorMessage.classList.add("hidden");
    this.resultsContainer.classList.add("hidden");
  }

  hideLoading() {
    this.loadingSpinner.classList.add("hidden");
  }

  showError(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.classList.remove("hidden");
    this.resultsContainer.classList.add("hidden");
    this.hideLoading();
  }

  hideAllMessages() {
    this.errorMessage.classList.add("hidden");
    this.hideLoading();
  }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const weatherApp = new WeatherApp();
});
