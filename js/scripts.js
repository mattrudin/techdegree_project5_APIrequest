/************************************************************************************
Constant variables
************************************************************************************/
const url = 'https://randomuser.me/api/?results=12';
const users = [];

/************************************************************************************
Fetch function
************************************************************************************/
fetch(url)
    .then(response => response.json())
    .then(data => users.push(...data.results));

/************************************************************************************
Utility function
************************************************************************************/
const extractInformation = object => (
    {
        picture: object.picture.thumbnail,
        firstName: object.name.first,
        lastName: object.name.last,
        email: object.email,
        location: object.location.city
    }
)
