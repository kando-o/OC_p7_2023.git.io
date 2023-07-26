import {cardsCounter } from "./Components/counter.js";
import { getData } from "./Api/api.js";
import Card from "./Model/card.js";
import Tags from "./Components/tags.js";
import Search from "./Components/search.js";

// For the dropdown
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
			card.buildHtml()
			parent.appendChild(card.element)
			return card
		})
		
		cardsCounter(cards)
		
		const search = new Search(cards)
		const tags = new Tags(cards)

		/**
		 * 
		 * @param {string} filtered | Value of filteredByTags
		 */
		const displayCards = (filtered) => {
			if (cards.length === filtered.length) {
				
				cards.forEach(el => el.element.classList.remove('hidden'))
				
			} else {
				cards.forEach(el => el.element.classList.add('hidden'))
				filtered.forEach(el => el.element.classList.remove('hidden'))
			}
		}

		const onFilter = () => {
			const input = document.querySelector('.topPage__inputSearch').value
			const filtered = search.matchInputUser(input)
			const filteredByTags = tags.matchTags(filtered)
			const filteredByInputAndTags = tags.matchInputTags(filteredByTags)

			displayCards(filteredByTags)
			tags.displayTags(filteredByTags)
			tags.displayTags(filteredByInputAndTags)
		}

		search.searchGlobal(onFilter)
		tags.builgTagsHtml()
		tags.eventTag(onFilter)

		onFilter()
	})		
}