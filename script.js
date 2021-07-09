const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')


let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []


//  unsplash api
const count = 30
const apiKey = 'JGYTPe3yLv6TIrw4FySLkt-G67BiIEruGdRwEfToDVs'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// check if all images wre loaded
function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
    }
}

// helper function to set Attribute on dom element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// create element for link & photo, and add to dom
function displayPhoto() {
    imagesLoaded = 0
    totalImages = photosArray.length
    // run function for each object in photoArray
    photosArray.forEach((photo) => {

        // create <a> to link to unsplash 
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //  Event listner check when each is finished loading
        img.addEventListener('load', imageLoaded)
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

// Check to see if scrolling near bottom of page Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 
        1000 && ready) {
            ready = false
        getPhotos();
    }
})


//  on loaded
getPhotos()