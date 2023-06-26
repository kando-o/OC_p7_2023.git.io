import {cardsCounter }  from "./Components/counter.js";
import { getData } from "./Api/api.js";
import Card from "./Model/card.js";
import Tags from "./Components/tags.js";
import Search from "./Components/search.js";

$(document).ready(function() {
    $('.js-example-basic-single').select2({
		width : 'resolve'
	});
});

const parent = document.querySelector('.recettes__galerieCards')

window.onload = () => {
	
	getData()
	.then(recipes => {
		
		const cards = recipes.map( recipe => {
			
			const card = new Card(recipe)
			
			card.name = ""
			card.buildHtml()
			parent.appendChild(card.element)
			
			return card
		})
		
		// Conteur de carte
		cardsCounter(cards)
		
		const search = new Search(cards)
		const tagsglobal = new Tags(cards)

		search.searchGlobal()
		tagsglobal.builgTagsHtml()
	})		
}