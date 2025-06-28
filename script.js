
const apiKey = '05c80daf7deef137e668a4d9';
const apiUrl = `https://v6.exchangerate-api.com/v6/05c80daf7deef137e668a4d9/latest/USD`;

//  here we use Function to fetch conversion rates from the API
async function fetchConversionRates() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API Response:', data); // Debugging statement
        return data.conversion_rates; // Returning the  conversion rates
    } catch (error) {
        console.error('Error fetching conversion rates:', error);
        alert('Failed to fetch conversion rates.');
        return null; // Return null if there is an error
    }
}

// Event listener for form submission
document.getElementById('converter-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    // Basic validation
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById('result').value = 'No conversion needed.';
        return;
    }

    // Fetching the  conversion rates
    const rates = await fetchConversionRates();
    if (!rates) {
        return; // Stop execution if rates couldn't be fetched
    }

    // Calculating conversion
    const rate = fromCurrency === 'USD' ? rates[toCurrency] : rates[toCurrency] / rates[fromCurrency];
    console.log('Conversion Rate:', rate); // Debugging statement

    if (!rate) {
        alert('Conversion rate not available.');
        return;
    }

    const result = amount * rate;
    document.getElementById('result').value = `${result.toFixed(2)} ${toCurrency}`;
});

