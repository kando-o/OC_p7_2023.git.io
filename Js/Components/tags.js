import Card from "/Js/Components/tags.js";
// import { Ingredient } from "/Js/Model/card.js";

export default class Tags {
	
	constructor (cards) {
		this._ingredients = cards.map(ing => ing.ingredients).map(u => u);
		this._ustensils = cards.map(u => u.ustensils );
		this._appliance = cards.map(a => a.appliance);
	}

	/**
	 * inject the options in the select *Appareils*
	 * @param {Array} arrayCards | Array of recipies 
	 */
	getAppliance () {

		//dédoublonage du tableau
		const mergeArrayAppliance = Array.from(new Set(this._appliance))
		const optionsAppareils = document.getElementById('appareils')

		return mergeArrayAppliance.forEach(el => {
			optionsAppareils.innerHTML += ` <option class="appareils" value="appareils">${el}</option> `
		})
	}

	/**
	 * inject the options in the select *Ustensils*
	 * @param {Array} arrayCards | Array of recipies 
	 */
	getUstensil (arrayCards) {

		const arrayUstensil = []
		const optionsUstensil = document.getElementById('ustensiles')

		arrayCards.map(el => {
			el.forEach(ustensils => arrayUstensil.push(ustensils))
		})

		const mergeArrayUstensil = Array.from(new Set(arrayUstensil))

		mergeArrayUstensil.forEach(el => {
			optionsUstensil.innerHTML += ` <option class="appareils" value="appareils">${el}</option> `
		})
	}

	/**
	 * inject the options in the select *Ustensils*
	 * @param {Array} arrayCards | Array of recipies 
	 */
	getIngredient () {

		const ingredients = this._ingredients	
		const optionsIngredients = document.getElementById('ingredients')
		const arrayIngredient = []

		ingredients.map(el => {
			return arrayIngredient.push(el[1].ingredient)
		})

		const mergeArrayIngredients = Array.from(new Set(arrayIngredient))
		
		return mergeArrayIngredients.forEach(el => {
			optionsIngredients.innerHTML += ` <option class="ingredients" value="ingredients">${el}</option> `
		})		
	}
}

