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
		
		this.tagsContainer = containerTagsDynamique
		const btnlabelClose = document.createElement('div')
		btnlabelClose.classList.add('.testTag')
		

		recettesHeaderTag.appendChild(containerTagsDynamique)
		
		ingredient.innerHTML = this.ingredients.reduce((text, el) => text += `<option class="menu-item" value="ingredients ">${el}</option>`, "" )
		appareil.innerHTML = this.appareils.reduce((text, el) => text += `<option class="menu-item" value="appareils ">${el}</option>`, "" )
		ustensil.innerHTML = this.ustensils.reduce((text, el) => text += `<option class="menu-item" value="ustensils ">${el}</option>`, "" )
	}

	listeners (onFilter) {

		const test = [...document.querySelectorAll('.recettes__itemsTag ' )]
		
		test.forEach(el => {
			const type = el.getAttribute('id')

			el.oninput = (e) => {
				
				const text = el.options[el.selectedIndex].text
				if ([...this.tagsContainer.querySelectorAll(".tag-text")].find(t=>t.textContent===text)) return
				
				const currentTag = document.createElement("div")
				currentTag.classList.add("recettes__labelTag")

				const tagText = document.createElement("span")
				tagText.textContent = text
				tagText.classList.add("tag-text")
				tagText.setAttribute("tag-type", type)

				const close = document.createElement("span")
				close.classList.add("cursor-pointer")
				close.textContent = "X"
				close.addEventListener("click", ()=> {
					currentTag.remove()
					onFilter()
				})

				currentTag.appendChild(tagText)
				currentTag.appendChild(close)
				this.tagsContainer.appendChild(currentTag)

				onFilter()
			}
		})

	}

	display (cards) {
		// hide all tags in selects
		// traverse all cards
		// hide tags not in cards
	}

	match (cards) {

		if (!cards || cards.length<1) return cards
	
		const tags = [...this.tagsContainer.querySelectorAll(".tag-text")]
		if (tags.length<1) return cards

		tags.forEach(t=>console.log(t.getAttribute("tag-type"), t.textContent))
		return cards.filter(card => {
			return tags.filter( tag => {
				const type = tag.getAttribute("tag-type")
				const tagName = tag.textContent.toLowerCase()
				if (type==="ingredients") return card._ingredients.find(i => i.ingredient.toLowerCase().includes(tagName))
				if (type==="appareils") return card._appliances.find(a => a.toLowerCase().includes(tagName))
				if (type==="ustensiles") return card._ustensils.find(u => u.toLowerCase().includes(tagName)) 
			}).length === tags.length
		})
	}

}

export default Tags
