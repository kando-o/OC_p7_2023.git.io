const API = {
	 URL: "/",
	 request_data: "Data/PetitsPlats2.0-main/recipes.js"

}

export const getData = () => {
	// Chemin vers le data
	return fetch(API.URL + API.request_data)
	.then(res => {return res.json()})
	// .then(data => {return console.log(data)} )
}