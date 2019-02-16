/************************************************************************************
 Constant variables
 ************************************************************************************/
const url = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
const body = document.body;
const galleryArray = [];
const modalArray = [];

/************************************************************************************
Fetch function
************************************************************************************/
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
        state: object.location.state,
        postcode: object.location.postcode,
        street: object.location.street,
        nation: object.nat,
    }
)

const formatCard = object => (`
    <div class="card" id="${object.id}">
        <div class="card-img-container">
            <img class="card-img" src=${object.picture} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${object.firstName} ${object.lastName}</h3>
            <p class="card-text">${object.email}</p>
            <p class="card-text cap">${object.city}, ${object.state}</p>
        </div>
    </div>
`)

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
                <p class="modal-text">${object.street}, ${object.state}, ${object.nation} ${object.postcode}</p>
                <p class="modal-text">Birthday: ${new Date(Date.parse(object.birthday)).toLocaleDateString("en-US")}</p>
            </div>
        </div>
    </div>
`)

const checkStatus = response => response.ok ? Promise.resolve(response) : Promise.reject(new Error(response.statusText));

const saveUsers = (user, index) => {
    const information = extractInformation(user, index);
    galleryArray.push(formatCard(information));
    modalArray.push(formatModal(information));
}

const closeButtonFunction = () => {
    const closeButton = document.getElementById('modal-close-btn');
    closeButton.addEventListener('click', () => {
        const modal = document.getElementsByClassName('modal-container')[0];
        body.removeChild(modal);
    })
}

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
const updateGallery = url => {
    fetchData(url)
        .then(data => data.map((user, index) => saveUsers(user, index)))
        .then(() => gallery.innerHTML = galleryArray.join(""));
}

const showModal = html => {
    body.insertAdjacentHTML('beforeend', html);;
}

/************************************************************************************
Event listeners
************************************************************************************/
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