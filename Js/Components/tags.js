import Card from "/Js/Components/tags.js";
// import { Ingredient } from "/Js/Model/card.js";

export default class Tags {
	
	constructor (cards, data) {
		this._ingredients = data.map(ing => ing.ingredients).map(u => u);
		this._ustensils = data.map(u => u.ustensils );
		this._appliance = data.map(a => a.appliance);
	}

	getIngredient () {
		const ingredients = this._ingredients	
		const optionsIngredients = document.getElementById('ingredients')
        console.log(optionsIngredients);
		// console.log(ingredients.map(el => el.forEach(u => console.log(u))));
		

		ingredients.map(el => {
			const testel = el.concat(el)
			console.log(testel);
			
		  const mergeTagIngredient = el.map(i => i.ingredient);
		  const TagIngredient = Array.from(new Set(mergeTagIngredient))

		//   console.log(mergeTagIngredient);
		//   console.log(TagIngredient);
		  
		})
		
		// return optionsIngredients.textContent += ` <option class="appareils" value="appareils">${el.ingredient}</option> `
	}

	getAppliance () {
		const optionsAppareils = document.getElementById('appareils')
		const mergeTagAppliance = Array.from(new Set(this._appliance))
		// console.log(mergeTagAppliance);
		return mergeTagAppliance.forEach(el => {
			optionsAppareils.innerHTML += ` <option class="appareils" value="appareils">${el}</option> `
		})
	}

} 

// // faire une class
// dans cette classe recupperer les différents Tags
// ingredients
// ustensile
// appareils