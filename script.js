const inputValue = document.querySelector("#input-value");
const resultValue = document.querySelector("#result-value");
const fromUnit = document.querySelector("#from-unit");
const toUnit = document.querySelector("#to-unit");
const inputSymbol = document.querySelector("#input-symbol");
const resultSymbol = document.querySelector("#result-symbol");
const weatherMessage = document.querySelector("#weather-message");
const formulaText = document.querySelector("#formula-text");

const units = {
  celsius: {
    label: "Celsius",
    symbol: "°C",
    toCelsius: (value) => value,
    fromCelsius: (value) => value
  },
  fahrenheit: {
    label: "Fahrenheit",
    symbol: "°F",
    toCelsius: (value) => (value - 32) * 5 / 9,
    fromCelsius: (value) => (value * 9 / 5) + 32
  },
  kelvin: {
    label: "Kelvin",
    symbol: "°K",
    toCelsius: (value) => value - 273.15,
    fromCelsius: (value) => value + 273.15
  }
};

const formulas = {
  "celsius-celsius": "As unidades são iguais, então o valor permanece o mesmo.",
  "celsius-fahrenheit": "Para converter Celsius em Fahrenheit, multiplique por 9/5 e some 32. Fórmula: °F = (°C × 9/5) + 32.",
  "celsius-kelvin": "Para converter Celsius em Kelvin, some 273,15. Fórmula: °K = °C + 273,15.",
  "fahrenheit-celsius": "Para converter Fahrenheit em Celsius, subtraia 32 e multiplique por 5/9. Fórmula: °C = (°F - 32) × 5/9.",
  "fahrenheit-fahrenheit": "As unidades são iguais, então o valor permanece o mesmo.",
  "fahrenheit-kelvin": "Para converter Fahrenheit em Kelvin, primeiro converta para Celsius e depois some 273,15. Fórmula: °K = (°F - 32) × 5/9 + 273,15.",
  "kelvin-celsius": "Para converter Kelvin em Celsius, subtraia 273,15. Fórmula: °C = °K - 273,15.",
  "kelvin-fahrenheit": "Para converter Kelvin em Fahrenheit, primeiro subtraia 273,15 e depois aplique a fórmula de Fahrenheit. Fórmula: °F = (°K - 273,15) × 9/5 + 32.",
  "kelvin-kelvin": "As unidades são iguais, então o valor permanece o mesmo."
};

function convertTemperature(value, from, to) {
  const valueInCelsius = units[from].toCelsius(value);
  return units[to].fromCelsius(valueInCelsius);
}

function formatTemperature(value) {
  if (!Number.isFinite(value)) {
    return "";
  }

  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2
  }).format(value);
}

function setBodyTemperatureClass(celsiusValue) {
  document.body.classList.remove("neutral", "cold", "very-cold", "hot", "very-hot");

  if (!Number.isFinite(celsiusValue)) {
    document.body.classList.add("neutral");
    weatherMessage.textContent = "Digite uma temperatura";
    return;
  }

  if (celsiusValue <= 5) {
    document.body.classList.add("very-cold");
    weatherMessage.textContent = "Hoje está MUITO frio";
  } else if (celsiusValue < 18) {
    document.body.classList.add("cold");
    weatherMessage.textContent = "Hoje está frio";
  } else if (celsiusValue >= 34) {
    document.body.classList.add("very-hot");
    weatherMessage.textContent = "Hoje está MUITO quente";
  } else if (celsiusValue >= 26) {
    document.body.classList.add("hot");
    weatherMessage.textContent = "Hoje está quente";
  } else {
    document.body.classList.add("neutral");
    weatherMessage.textContent = "Hoje está agradável";
  }
}

function updateFormula() {
  const key = `${fromUnit.value}-${toUnit.value}`;
  formulaText.textContent = formulas[key];
}

function updateSymbols() {
  inputSymbol.textContent = units[fromUnit.value].symbol;
  resultSymbol.textContent = units[toUnit.value].symbol;
}

function updateConverter() {
  const value = Number(inputValue.value);
  const hasValue = inputValue.value.trim() !== "";
  const celsiusValue = hasValue ? units[fromUnit.value].toCelsius(value) : NaN;
  const result = hasValue ? convertTemperature(value, fromUnit.value, toUnit.value) : NaN;

  resultValue.value = formatTemperature(result);
  setBodyTemperatureClass(celsiusValue);
  updateSymbols();
  updateFormula();
}

inputValue.addEventListener("input", updateConverter);
fromUnit.addEventListener("change", updateConverter);
toUnit.addEventListener("change", updateConverter);

updateConverter();

const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});