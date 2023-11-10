class Tags {
	
	constructor (cards) {

		this.cards = cards;

		const set = new Set();
		for (const element of cards) {
		for (const i of element.ingredients) {
			set.add(i.name.toLowerCase());
		}}
		this.ingredients = Array.from(set);

		const setAppareils = new Set();
		for (const element of cards) {
		for (const el of element.appliances) {
			setAppareils.add(el.toLowerCase());
		}}
		this.appareils = Array.from(setAppareils);

		const setUstensils = new Set();
		for (const element of cards) {
		for (const el of element.ustensils) {
			setUstensils.add(el.toLowerCase());
		}}
		this.ustensils = Array.from(setUstensils);
	}

	builgTagsHtml () {

		const ingredient = document.getElementById('ingredients')
		const appareil = document.getElementById('appareils')
		const ustensil = document.getElementById('ustensiles')
		const recettesHeaderTag = document.querySelector('.recettes__headerTag')
		
		const containerTags = document.createElement('div')
		containerTags.classList.add('recettes__containerTags')
		this.tagsContainer = containerTags
		
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
									ingredient.innerHTML = ingredientOptions;
								})
							}
						}, 1000)
					}
				})
			}
		)

		recettesHeaderTag.appendChild(containerTags)
		
		const ingredientOptions = document.querySelector('#ingredients');
		ingredientOptions.innerHTML = `<option class="menu-item" value="ingredients">Ingredients</option>`
		for (const el of this.ingredients) {
			const option = document.createElement('option')
			option.innerHTML += `<option class="menu-item" removed value="ingredients">${el}</option>`;
			 
			ingredientOptions.appendChild(option)
		}

		const appareilOptions = document.querySelector('#appareils');
		appareilOptions.innerHTML = `<option class="menu-item" value="appareils">Appareils</option>`
		for (const el of this.appareils) {
			const option = document.createElement('option')
			option.innerHTML += `<option class="menu-item" removed value="ingredients">${el}</option>`;
			 
			appareilOptions.appendChild(option)
		}

		const ustensilOptions = document.querySelector('#ustensiles');
		ustensilOptions.innerHTML = `<option class="menu-item" value="ustensils">Ustensils</option>`
		for (const el of this.ustensils) {
			const option = document.createElement('option')
			option.innerHTML += `<option class="menu-item" removed value="ustensils">${el}</option>`;
			 
			ustensilOptions.appendChild(option)
		}

		// for (const el of this.appareils) {
		// 	appareilOptions += `<option class="menu-item" value="appareils">${el}</option>`;
		// }
		// appareil.innerHTML = appareilOptions;

		// // let ustensilOptions = "";
		// for (const el of this.ustensils) {
		// 	ustensilOptions += `<option class="menu-item" value="ustensils">${el}</option>`;
		// }
		// ustensil.innerHTML = ustensilOptions;	
	}

	listeners (onFilter) {

		const itemsTag = [...document.querySelectorAll('.recettes__itemsTag')]
		for (const el of itemsTag) {
			const type = el.getAttribute('id')
			el.onchange = (e) => {
				
				const text = el.options[el.selectedIndex].text;
				const existingTags = this.tagsContainer.querySelectorAll(".tag-text");
				for (const tag of existingTags) {
					if (tag.textContent === text) return;
				}

				const currentTag = document.createElement("div");
				currentTag.classList.add("recettes__labelTag");

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
		}
	}

	match(cards) {
		
		if (!cards || cards.length < 1) return cards;
	
		const tags = [...this.tagsContainer.querySelectorAll(".tag-text")];
		if (tags.length < 1) return cards;
		
		// log for the tag selected
		for (const tag of tags) {
		console.log('getAttribute -->'+tag.getAttribute("tag-type"), 'tag+textContent -->'+tag.textContent);
		}
	
		const filteredCards = [];

		for (const card of cards) {
		
			let isCardValid = true;
			
			for (const tag of tags) {
				const type = tag.getAttribute("tag-type");
				const tagName = tag.textContent.toLowerCase();
		
				if (type === "ingredients") {

					let ingredientFound = false;
					for (const i of card._ingredients) {
						if (i.ingredient.toLowerCase().includes(tagName)) {
							ingredientFound = true;
							break;
						}
					}

					if (!ingredientFound) {
						isCardValid = false;
						break;
					}
				}
		
				if (type === "appareils") {

					let applianceFound = false;

					for (const a of card._appliances) {
						if (a.toLowerCase().includes(tagName)) {
						applianceFound = true;
						break;
						}
					}

					if (!applianceFound) {
						isCardValid = false;
						break;
					}
				}
		
				if (type === "ustensiles") {
					
					let ustensilFound = false;

					for (const u of card._ustensils) {
						if (u.toLowerCase().includes(tagName)) {
						ustensilFound = true;
						break;
						}
					}

					if (!ustensilFound) {
						isCardValid = false;
						break;
					}
				}
			}

			if (isCardValid) {
				filteredCards.push(card);
			}
		}

		return filteredCards;

	}
}

export default Tags
