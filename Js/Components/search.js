export default class Search {
	constructor (cards) {

		let set = new Set()
		cards.forEach(n => set.add(n.name))
		this.name = Array.from(set)

		let setDescription = new Set()
		cards.forEach(d => setDescription.add(d._description))
		this.description = Array.from(setDescription)

		let setIngredient = new Set()
		cards.forEach(ing => ing.ingredients.forEach(i => setIngredient.add(i.name)))
		this.ingredient = Array.from(setIngredient)

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

		const cardFilter = cards.filter(card => {
			return card.name.toLowerCase().includes(inputUser) ||
			card.description.toLowerCase().includes(inputUser) ||
			card.ingredients.find(i => i.ingredient.toLowerCase().includes(inputUser))				
		})

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
