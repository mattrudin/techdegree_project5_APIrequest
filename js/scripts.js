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
        city: object.location.city,
        state: object.location.state,
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