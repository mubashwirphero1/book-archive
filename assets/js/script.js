// Creating a function for get search value
const searchInput = () => {
    // Getting the search value
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // Search error handling
    if (searchText === '') {
        document.getElementById('error-throw').style.display = 'block';
    }
    else {
        document.getElementById('error-throw').style.display = 'none';
    }

    // Calling function for load data from server
    loadData(searchText);

    // Clearing the input field
    searchField.value = '';

    // Loading spinner
    document.getElementById('loading').style.display = 'block';
}

// Loading spinner
document.getElementById('loading').style.display = 'block';

// Creating a function for load data from server
const loadData = searchText => {
    // Calling data from API server
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.docs));
}

// Creating a function for displaying the data in website
const displayData = data => {
    // Get the parent element
    const booksResult = document.getElementById('books-result');
    booksResult.textContent = '';

    // Get each element of docs array
    data.forEach(singleElement => {
        // Creating a div and adding elements
        const div = document.createElement('div')
        div.classList.add = 'col'
        div.innerHTML = `
        <div class="card h-100">
            <img src="${`https://covers.openlibrary.org/b/id/${singleElement.cover_i ? singleElement.cover_i : 554106}-M.jpg`}" class="card-img-top img-fluid" alt="no image">
            <div class="card-body">
                <h5 class="card-title mt-2"><span class="fw-bold">Book :</span> ${singleElement.title ? singleElement.title : 'Unknown'}</h5>
                <p class="card-text"><span class="text-primary fw-bold">Author :</span> ${singleElement.author_name ? singleElement.author_name[0] : 'Unknown'}</p>
                <p class="card-text"><span class="text-primary fw-bold">First Published :</span> ${singleElement.first_publish_year ? singleElement.first_publish_year : 'Unknown'}</p>
                <p class="card-text"><span class="text-primary fw-bold">Publisher :</span> ${singleElement.publisher ? singleElement.publisher[0] : 'Unknown'}</p>
            </div>
        </div>
        `
        booksResult.appendChild(div)
    });

    // Loading spinner
    document.getElementById('loading').style.display = 'none';

    // Showing search result number
    document.getElementById("search-result-container").style.display = 'block';
    const searchResult = document.getElementById("search-result");
    const searchResultNumber = data.length;
    searchResult.innerText = searchResultNumber;
    if (searchResult.innerText == 0) {
        document.getElementById('error-throw').style.display = 'block';
    }
    else {
        document.getElementById('error-throw').style.display = 'none';
    }
}