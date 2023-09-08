export default class Search {
	constructor (cards) {

		let set = new Set();
		for (const card of cards) {
			set.add(card.name);
		}
		this.name = Array.from(set);

		let setDescription = new Set()
		for (const card of cards) {
			setDescription.add(card._description)
		}
		this.description = Array.from(setDescription)

		let setIngredient = new Set();
		for (const ing of cards) {
		for (const i of ing.ingredients) {
			setIngredient.add(i.name);
		}}
		this.ingredient = Array.from(setIngredient);

		this.cards = cards
	}

	/**
	 * 
	 * @param {Array} cards | Array of items that contains all 50 recpes 
	 * @param {String} inputUser | Value given by the user 
	 * @returns cardFilter | Card filter by the user value
	 */
	static match (cards, inputUser) {
		if (!inputUser || inputUser.length < 3 || !cards || cards.length<1) return cards

		const cardFilter = [];
		for (const card of cards) {

			const lowerInputUser = inputUser.toLowerCase();
			const isNameMatch = card.name.toLowerCase().includes(lowerInputUser);
			const isDescriptionMatch = card.description.toLowerCase().includes(lowerInputUser);
			const isIngredientMatch = card.ingredients.some(i => i.ingredient.toLowerCase().includes(lowerInputUser));

			if (isNameMatch || isDescriptionMatch || isIngredientMatch) {
				cardFilter.push(card);
			}
		}

		return cardFilter
		
	}

	/**
	 * 
	 * @param {Function} onFilter | function of filter 
	 */
	listener (onFilter) {
	
		document.querySelector('.topPage__inputSearch').addEventListener('input', (e) => {
			onFilter()
		})
	}
}
