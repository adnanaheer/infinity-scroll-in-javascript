const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []


//  unsplash api
const count = 10
const apiKey = 'JGYTPe3yLv6TIrw4FySLkt-G67BiIEruGdRwEfToDVs'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


// helper function to set Attribute on dom element
function setAttributes (element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// create element for link & photo, and add to dom
function displayPhoto() {

    // run function for each object in photoArray
    photosArray.forEach((photo) => {

        // create <a> to link to unsplash 
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
             target : '_blank'
        });

        // create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // put <img> inside <a> than put both inside imageContainer element
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

// get photo from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhoto()

    } catch (error) {
        // catch error here
    }
}

//  on loaded
getPhotos()