//  unsplash api
const count = 10
const apiKey = 'API_KEY'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// get photo from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        
    } catch (error) {
        // catch error here
    }
}

//  on loaded
getPhotos()