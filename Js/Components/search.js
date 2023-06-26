export default class Search {
	constructor (cards) {
		let set = new Set()
		cards.forEach(n => set.add(n.name))
		this.name = Array.from(set)

		let setDescription = new Set()
		cards.forEach(d => setDescription.add(d._description))
		this.description = Array.from(setDescription)

		let setIngredient = new Set()
		cards.forEach(ing => ing.ingredients.forEach(i => setIngredient.add(i._name)))
		this.ingredient = Array.from(setIngredient)

	}

	searchGlobal () {
		
		const name = this.name

		document.querySelector('.topPage__inputSearch').addEventListener('input', (e) => {
			if (e.target.value.length > 3) {

				const resultatIngredient = name.find(n => {return n.toLowerCase() === e.target.value.toLowerCase() })

				console.log(resultatIngredient);
			}

		})
	}

	
}

// faire un event à l'input sur la bare de recherche
// quand la barre de rechercher à plus de 3 carractère lancer la fonction qui va chercher dans les différent tab 
// - data.description
// - data.titre
// - data.ingredient
