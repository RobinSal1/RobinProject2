function showRates() { // showrates function
    let amount = document.getElementById('amountInput').value; // Get user inputed value

    // Create XMLHttpRequest and handle the response
    let fetch = new XMLHttpRequest(); //activate the HHTP request
    fetch.open('GET', 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_oq1A4Y9nMCPWlD7qVCsPDVIwpbrmsb9b57M5Qdvp&currencies=USD%2CCAD%2CSEK%2CNZD%2CAUD&base_currency=EUR', true); // HTTP Request method is 'GET'. The URL endpoint specifies the API api parameters like the key,currencies and currency
    
    fetch.onload = function() { //Defines the next step when the XMLHttpRequesT load response is activated

        if (fetch.status == 200) { // checks if the response is successful
            let ratesData = JSON.parse(this.response); //parses the response into an object
            let rates = ratesData.data; //gets the currency rates from the parsed responce
            let feed = document.getElementById('feed'); // retrieve the HTML element with the id 'feed'
            feed.innerHTML = ''; // Clear previous content
            let ratesList = document.createElement('ul'); // new  unordered list
            
            for (let currency in rates) {
                let convertedAmount = (amount * rates[currency]).toFixed(1); // Convert/calculate the inputed amount (fixed decimal to 1 digit)
                let listItem = document.createElement('li'); // creates a list item for each currency and converted amount
                listItem.textContent = `${currency}: ${convertedAmount}`; // sets the content for each list item
                ratesList.appendChild(listItem); //appends each list item to the ratesList 
            }

            feed.appendChild(ratesList); // insert the entire ratesList in to the feed element
        }
    };
    fetch.send(); // Sends the XMLHttpRequest to the currency conversion API
}

const convertButton = document.getElementById('convertButton'); //Gets the Html element with the convertButton and stores in in the convertButton variable
convertButton.addEventListener('click', showRates); //This triggers the ShowRates Function when the button is clicked