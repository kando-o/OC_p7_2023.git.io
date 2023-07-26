class Tags {
	
	constructor (cards) {

		this.cards = cards;

		const set = new Set();
		cards.forEach(element =>  element.ingredients.forEach(i => set.add(i.name.toLowerCase())));
		this.ingredients = Array.from(set)

		const setAppareils = new Set();
		cards.forEach(element =>  element.appliances.forEach(el=>setAppareils.add(el.toLowerCase())));
		this.appareils = Array.from(setAppareils)

		const setUstensils = new Set();
		cards.forEach(element => element.ustensils.forEach(el=>setUstensils.add(el.toLowerCase())))
		this.ustensils = Array.from(setUstensils)

	}

	builgTagsHtml () {

		const ingredient = document.getElementById('ingredients')
		const appareil = document.getElementById('appareils')
		const ustensil = document.getElementById('ustensiles')
		const recettesHeaderTag = document.querySelector('.recettes__headerTag')
		const containerTagsDynamique = document.createElement('div')

		containerTagsDynamique.classList.add('recettes__containerTagsDynamique')
		recettesHeaderTag.appendChild(containerTagsDynamique)
		


		ingredient.innerHTML = this.ingredients.reduce((text, el) => text += `<option class="menu-item" value="ingredients ">${el}</option>`, "" )
		appareil.innerHTML = this.appareils.reduce((text, el) => text += `<option class="menu-item" value="appareils ">${el}</option>`, "" )
		ustensil.innerHTML = this.ustensils.reduce((text, el) => text += `<option class="menu-item" value="ustensils ">${el}</option>`, "" )
	}

	eventTag (onFilter) {

		// TODO : create tags on click
		// TODO : add cross to close the tag
		// TODO : add event listener to call filter when tag is add
		// TODO : add event listener to call filter when tag is removed

		const test = [...document.querySelectorAll('.recettes__itemsTag ' )]
		const tagUser = test.forEach(el => {
			el.onchange = (e) => {
				console.log("->"+el.options[el.selectedIndex].text );
				const selectTags = el.options[el.selectedIndex].text
				
				const tagFilter = this.cards.filter(card => {
					return card._appliances.find(a => a.toLowerCase().includes(selectTags)) ||
					card._ingredients.find(i => i.ingredient.toLowerCase().includes(selectTags)) ||
					card._ustensils.find(u => u.toLowerCase().includes(selectTags)) 
				})

				onFilter()
				
				console.log(tagFilter);
				
				return el.options[el.selectedIndex].text 			
			}
		})

		// TODO : Refaire la liste des tags disponible dans le dropdown avec les cards restant
		
		console.log(tagUser);
		
		const tagMatch = (cards) => {
			// const that = this
			cards = this.cards
			
			return cards;
		}

		console.log( tagMatch(this.cards));

		// si element choisi dans la liste de tag correspond à un element de ingredient ou apparel ou ustensil d'une des cartes alors lance moi la fonction matchCard
		
	}

	displayTags (cards) {
		// traverse all cards
		// hide tags not in cards
	}

	matchTags (filtered) {
		// console.log(tagUser);


		// au clique sur un tag ajoute se tag dans la container tags 
		// au clique sur la croix rouge remove element => tags
		// si filtered == true alors lance filtered by search & tags
		// sinon lance juste matchtags
		// TODO : filter by tags
		return filtered
	}

	matchInputTags (filtered) {

		return filtered

	}
}

// ingredient 
// appareils
// Ustensils

export default Tags
