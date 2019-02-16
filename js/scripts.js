/************************************************************************************
Constant variables
************************************************************************************/
const url = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');

/************************************************************************************
Fetch function
************************************************************************************/
fetch(url)
    .then(response => response.json())
    .then(data => data.results.map(user => formatCard(extractInformation(user))))
    .then(data => gallery.innerHTML = data.join(""));

/************************************************************************************
Utility functions
************************************************************************************/
const extractInformation = object => (
    {
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
    <div class="card">
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