import "./css/bootstrap.min.css"
import "./js/bootstrap.bundle.min"

document.getElementById('searchButton').addEventListener('click', () => {
	// we get the input value and pass it in the param
	const query = document.getElementById('searchInput').value;
	fetchData(query);
	
});

const fetchData = async (query) => {
    // Show the spinner while the data is being fetched
    document.querySelector(".spinner-container").classList.remove('d-none');

    const url = `https://steam2.p.rapidapi.com/search/${query}/page/1`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': 'steam2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        // Hide the spinner once data is fetched
        document.querySelector(".spinner-container").classList.add('d-none');

        // Check if we received any results
        if (result.length > 0) {
            document.querySelector(".alert").classList.add('d-none'); // Hide alert if results are found
            console.log(result)
			handleData(result, query);  // Show the search results
        } else {
            // No results found, show the alert
            document.querySelector(".alert").classList.remove('d-none');
        }

    } catch (error) {
        // In case of an error, hide the spinner and show the alert
        console.error(error);
        document.querySelector(".spinner-container").classList.add('d-none');
        document.querySelector(".alert").classList.remove('d-none');
    }
};


function handleData(result, query) {
    // Clear the existing content
    document.querySelector(".dynamic_data").innerHTML = '';
    document.querySelector(".resultsFor").innerHTML = '';

    // Add a heading with the search query
    document.querySelector(".resultsFor").innerHTML += 
	`<h2>Results for "${query}"</h2>`;

    // Iterate through the results and create the cards
    result.forEach((game) => {
        document.querySelector(".dynamic_data").innerHTML += `
            <div class="col">
                <article class="card">
                    <div class="card-body">
                        <p>${game.title}</p>
						<p>Review: ${game.reviewSummary}</p>
                        <p>Link to the game in steam: <a href="${game.url}">steam</a></p>
                        <img src="${game.imgUrl}" alt="${game.title}">
                    </div>
                </article>
            </div>`;
    });
}
	
const apiSecret = import.meta.env.VITE_SECRET_PHRASE
console.log(apiSecret)