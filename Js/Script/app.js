import { getData } from "/js/api/API.js";
import Card from "/Js/Model/card.js";



// const galerie = new Card(data)
const card = document.querySelector('.recettes__galerieCards')


window.onload = () => {
	getData()
	.then(data => {
		console.log(data);
		const galerie = new Card(data)
		galerie.creadCard(data, card);
	})		
}