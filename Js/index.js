import {cardsCounter }  from "./Components/counter.js";
import { getData } from "./Api/api.js";
import Card from "./Model/card.js";
import Tags from "./Components/tags.js";

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

		const addOptionsTags = new Tags(cards)
		
		cardsCounter(cards)
		
		addOptionsTags.getIngredient()
		addOptionsTags.getAppliance()
		addOptionsTags.getUstensil(cards.map(el=> {return el.ustensils}))
	})		
}