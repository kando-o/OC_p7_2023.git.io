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
		containerTagsDynamique.classList.add('recettes__containerTags')
		
		this.tagsContainer = containerTagsDynamique
		const btnlabelClose = document.createElement('div')
		
		// creat container for svg
		const containerSvg = document.createElement('div')
		containerSvg.classList.add('containerSvg')

		// create svg search
		const search = document.createElement('svg')
		search.innerHTML = ` <svg class="containerSvg__item search" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="5" cy="5" r="4.75" stroke="#7A7A7A" stroke-width="0.5"/>
		<line x1="9.17678" y1="9.32322" x2="13.6768" y2="13.8232" stroke="#7A7A7A" stroke-width="0.5"/>
		</svg>
		`
		// create svp close
		const close = document.createElement('span')
		close.innerHTML = `<span class="containerSvg__item close"> X </span>`
		
		// add svg in dropdown
		const select2Selection = document.querySelectorAll('.select2-selection')
		select2Selection.forEach( el => {
				el.addEventListener('click', () => {
					const select2Search = document.querySelector('.select2-search')
					const select2Field = document.querySelectorAll('.select2-search ')
					let buttonClose 

					containerSvg.appendChild(close)
					containerSvg.appendChild(search)
					select2Search.appendChild(containerSvg)
					
					if (select2Search) {
						
						setTimeout(	() => {
							buttonClose = select2Search.querySelector('.close')
							if (buttonClose) {
								buttonClose.addEventListener('click', () => {									
									select2Search.querySelector('input').value = ''  
								})
							}
						}, 2000)
					}
				})
			}
		)
		
		this.ingredients.map((el) => {
			const selectIngredient = document.querySelector('#ingredients')
			const option = document.createElement('option')
			option.innerHTML = `<option class="menu-item removed" value="ingredients ">${el}</option>`
			selectIngredient.appendChild(option)		
		})

		this.appareils.map((el) => {
			const selectappareil = document.querySelector('#appareils')

			const option = document.createElement('option')
			option.innerHTML = `<option class="menu-item removed" value="ingredients ">${el}</option>`
			selectappareil.appendChild(option)		
		})

		this.ustensils.map((el) => {
			const selectustensiles = document.querySelector('#ustensiles')

			const option = document.createElement('option')
			option.innerHTML = `<option class="menu-item removed" value="ingredients ">${el}</option>`
			selectustensiles.appendChild(option)		
		})

		recettesHeaderTag.appendChild(containerTagsDynamique)
		
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
