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
	matchCard = (cards, inputUser) => {
			
		cards = this.cards
		const cardFilter = cards.filter(card => {
			return card.name.toLowerCase().includes(inputUser) ||
			card.description.toLowerCase().includes(inputUser) ||
			card.ingredients.find(i => i.ingredient.toLowerCase().includes(inputUser))				
		})

		return cardFilter
	}

	/**
	 * 
	 * @param {String} inputUser | Value given by the user
	 * @returns this.matchCard => cards
	 */
 	matchInputUser (inputUser) {
		
		const cards = this.cards

		if (inputUser.length >= 3 ) {
			return this.matchCard(cards, inputUser)
		} else {
			return cards
		}
	}

	/**
	 * 
	 * @param {Function} filtered | Function matchInputUser(inputUser)
	 * @returns cardFilter | Card filter by user tags
	 */
	matchTags (filtered) {
		// TODO : add fitered
		// si filtered == true alors lance filtered by search & tags

		return filtered
	}

	/**
	 * 
	 * @param {Function} onFilter | function of filter 
	 */
	searchGlobal (onFilter) {
	
		document.querySelector('.topPage__inputSearch').addEventListener('input', (e) => {
			onFilter()
		})
	}
}
