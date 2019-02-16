/************************************************************************************
 Global variables / constants
 ************************************************************************************/
// URL to the API endpoint
const url = 'https://randomuser.me/api/?results=12';

// variables for the document elements
const gallery = document.getElementById('gallery');
const body = document.body;

// Arrays for the fetched and formated data
const galleryArray = [];
const modalArray = [];

/************************************************************************************
Fetch function
************************************************************************************/
/**
 * Fetch function with status check and error handling
 * @param {string} url String for data fetching
 * @returns {Array} Array with the fetched data
 */
const fetchData = url => (
    fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => data.results)
    .catch(error => alert(`Unfortunately there was an error: ${error}`))
)

/************************************************************************************
Utility functions
************************************************************************************/
/**
 * Extracts the important information from the fetched data
 * @param {Object} object User object from fetched data
 * @param {integer} index 
 * @returns {Object} With important information for further application
 */
const extractInformation = (object, index) => (
    {
        id: index,
        picture: object.picture.large,
        firstName: object.name.first,
        lastName: object.name.last,
        email: object.email,
        cellphone: object.cell,
        birthday: object.dob.date,
        city: object.location.city,
        postcode: object.location.postcode,
        street: object.location.street,
        nation: object.nat,
    }
)

/**
 * Formats the card view with the given information
 * @param {Object} object 
 * @returns {HTML}
 */
const formatCard = object => (`
    <div class="card" id="${object.id}">
        <div class="card-img-container">
            <img class="card-img" src=${object.picture} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${object.firstName} ${object.lastName}</h3>
            <p class="card-text">${object.email}</p>
            <p class="card-text cap">${object.city}</p>
        </div>
    </div>
`)

/**
 * Formats the modal view with the given information
 * @param {Object} object 
 * @returns {HTML}
 */
const formatModal = object => (`
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${object.picture} alt="profile picture">
                <h3 id="name" class="modal-name cap">${object.firstName} ${object.lastName}</h3>
                <p class="modal-text">${object.email}</p>
                <p class="modal-text cap">${object.city}</p>
                <hr>
                <p class="modal-text">${object.cellphone}</p>
                <p class="modal-text cap">${object.street}, ${object.nation} ${object.postcode}</p>
                <p class="modal-text">Birthday: ${new Date(Date.parse(object.birthday)).toLocaleDateString("en-US")}</p>
            </div>
        </div>
    </div>
`)

/**
 * Utility function for the fetch function to check the promise status
 * @param {Promise} response
 * @returns {Promise} 
 */
const checkStatus = response => response.ok ? Promise.resolve(response) : Promise.reject(new Error(response.statusText));

/**
 * Formats and saves the fetched users to the given arrays 
 * @param {Object} user 
 * @param {integer} index 
 * @returns {void}
 */
const saveUsers = (user, index) => {
    const information = extractInformation(user, index);
    galleryArray.push(formatCard(information));
    modalArray.push(formatModal(information));
}

/**
 * Adds a close button with function to the modal view
 * @returns {void}
 */
const closeButtonFunction = () => {
    const closeButton = document.getElementById('modal-close-btn');
    closeButton.addEventListener('click', () => {
        const modal = document.getElementsByClassName('modal-container')[0];
        body.removeChild(modal);
    })
}

/**
 * Gets the id of the card view
 * @param {event} element
 * @returns {integer} 
 */
const getID = element => {
    let id = "";
    if(element.className.includes('card-text') 
        || element.className.includes('card-name')
        || element.className === 'card-img') {
        id = element.parentElement.parentElement.id;
    } else if (element.className.includes('card-img-container')
        || element.className.includes('card-info')) {
        id = element.parentElement.id;
    } else {
        id = element.id;
    }
    return id;
}

/************************************************************************************
Display functions
************************************************************************************/
/**
 * Shows the fetched users
 * @param {String} url 
 * @returns {void}
 */
const updateGallery = url => {
    fetchData(url)
        .then(data => data.map((user, index) => saveUsers(user, index)))
        .then(() => gallery.innerHTML = galleryArray.join(""));
}

/**
 * Shows the modal view
 * @param {HTML} html html-string of the modal
 * @returns {void}
 */
const showModal = html => {
    body.insertAdjacentHTML('beforeend', html);;
}

/************************************************************************************
Event listeners
************************************************************************************/
/**
 * Eventlistener for each user card
 * @returns {void}
 */
gallery.addEventListener('click', event => {
    if (event.target !== event.currentTarget) {
        let id = getID(event.target);
        showModal(modalArray[id]);
        closeButtonFunction();
    }
})

/************************************************************************************
Main
************************************************************************************/
updateGallery(url);