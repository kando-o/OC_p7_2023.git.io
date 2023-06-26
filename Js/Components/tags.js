export default class Tags {
	
	constructor (cards) {

		this.cards = cards;

		const set = new Set();
		cards.forEach(element =>  element.ingredients.forEach(i => set.add(i._name)));
		this.ingredient = Array.from(set)

		const setAppareils = new Set();
		cards.forEach(element =>  element.ingredients.forEach(i => setAppareils.add(i._name)));
		this.appareils = Array.from(setAppareils)
	}

	builgTagsHtml () {

		// const arrayIngredient = this.ingredient
		const ingredient = document.getElementById('ingredients')
		const appareils = document.getElementById('appareils')
		const ustensile = document.getElementById('ustensiles')

		this.ingredient.forEach(el => ingredient.innerHTML += ` <option class="ingredients" value="ingredients ">${el}</option> ` )
		this.appareils.forEach(el => appareil.innerHTML += ` <option class="ingredients" value="ingredients ">${el}</option> ` )
		this.ingredient.forEach(el => ustensil.innerHTML += ` <option class="ingredients" value="ingredients ">${el}</option> ` )
		
		console.log(this.cards, );
	}


	
}

// Utiliser la délégation d'event pour les diffs tags

// ingredient 
// appareils
// Ustensils