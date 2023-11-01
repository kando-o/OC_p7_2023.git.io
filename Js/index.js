import {cardsCounter } from "./Components/counter.js";
import { getData } from "./Api/api.js";
import Card from "./Model/card.js";
import Tags from "./Components/tags.js";
import Search from "./Components/search.js";

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
		
		const search = new Search(cards)
		const tags = new Tags(cards)

		/**
		 * 
		 * @param {string} filtered | Value of filteredByTags
		 */
		const displayCards = (filtered) => {
			if (cards.length === filtered.length) {
				
				cards.forEach(el => el.element.classList.remove('hidden'))
				
			} else if (filtered.length>0) {
				cards.forEach(el => el.element.classList.add('hidden'))
				filtered.forEach(el => el.element.classList.remove('hidden'))
			} else {
				cards.forEach(el => el.element.classList.add('hidden'))
			}
		}
		const updateInterface = (list) => {
			const recettesGalerieCards = document.getElementById('no-recipe')
			if (list.length === 0) {
				const inputTopPageSearch = document.querySelector('.topPage__inputSearch').value.toUpperCase()
				
				recettesGalerieCards.classList.add('counterCardText')
				recettesGalerieCards.textContent = `Aucune recette ne contient "${inputTopPageSearch}" vous pouvez chercher 
				« tarte aux pommes », «poisson»  etc.`
			} else {
				recettesGalerieCards.textContent = ""
			}
			tags.refreshLists(list)
			tags.builgTagsHtml()
			tags.listeners(onFilter)
		}

		const onFilter = () => {
			const input = document.querySelector('.topPage__inputSearch').value
			const filteredCards = tags.match(cards)
			const finalCards = Search.match(filteredCards, input)
			displayCards(finalCards)
			cardsCounter(finalCards)
			updateInterface(finalCards)
		}

		search.listener(onFilter)
		tags.builgTagsHtml()
		tags.listeners(onFilter)

		onFilter()
	})
}