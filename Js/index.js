import {cardsCounter } from "./Components/counter.js";
import { getData } from "./Api/api.js";
import Card from "./Model/card.js";
import Tags from "./Components/tags.js";
import Search from "./Components/search.js";

// For the dropdown
$(document).ready(function() {
    $('.js-example-basic-single').select2({
		width : 'resolve'
	});

	// const select3 = document.querySelectorAll(".select3")
	// for (let s of select3) {
	// 	const options = s.querySelectorAll("span")
	// 	let htmlingredient = `<span class="selected">default</span>
	// 	<div class="collapser"><input type="text" class="input" />`

	// 	// create svg search
	// 	const search = document.createElement('svg')
	// 	search.innerHTML = ` <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
	// 	<circle cx="5" cy="5" r="4.75" stroke="#7A7A7A" stroke-width="0.5"/>
	// 	<line x1="9.17678" y1="9.32322" x2="13.6768" y2="13.8232" stroke="#7A7A7A" stroke-width="0.5"/>
	// 	</svg>
	// 	`
	// 	// create svp close
	// 	// const close = document.createElement('span')
	// 	// close.classList.add('close')
	// 	// close.innerHTML = `<span> X </span>`
	// 	// // add svg close & svg search
	// 	// blocCloseSearch.appendChild(search)
	// 	// blocCloseSearch.appendChild(close)

	// 	// for (const el of select3) {
			
	// 	// 	console.log('je suis la');
	// 	// 	el.appendChild(blocCloseSearch)
	// 	// }

	// 	for (let o of options) {
	// 		html += `<span class="item">${o.textContent}</span>`
	// 	}
	// 	s.innerHTML = html+"</div>"
	// 	s.addEventListener("click", (e)=> {
	// 		if (e.target.classList.contains("item") && s.getAttribute("collapsed")) {
	// 			s.querySelector(".selected").textContent = e.target.textContent
	// 			e.stopPropagation()
	// 			e.preventDefault()
	// 			s.setAttribute("collapsed", "true")
	// 		} else if(e.target.classList.contains("input")) {
	// 		} else {
	// 			const c = s.getAttribute("collapsed")
	// 			s.setAttribute("collapsed", c==="false"?"true":"false")
	// 		}
	// 	})
	// 	const input = s.querySelector(".input")
	// 	input.addEventListener("keydown", (e) => {
	// 		if (["Enter", "Escape"].includes(e.key)) s.setAttribute("collapsed", "true")
	// 	})
	// 	input.addEventListener ("input", (e) => {
	// 		const v = input.value.toLowerCase()
	// 		const spans = s.querySelectorAll(".item")
	// 		for (let sp of spans) {
	// 			sp.hidden =  !sp.textContent.toLowerCase().includes(v)
	// 		}
	// 	})
	// 	s.setAttribute("collapsed", "true")
	// }
});

const parent = document.querySelector('.recettes__galerieCards')

window.onload = () => {
	console.log("load")
	getData()
	.then(recipes => {
		
		const cards = [];
		for (const recipe of recipes) {

			const card = new Card(recipe);
			card.buildHtml();
			parent.appendChild(card.element);
			cards.push(card);
		}
		
		cardsCounter(cards)
		
		const search = new Search(cards)
		const tags = new Tags(cards)

		/**
		 * 
		 * @param {string} filtered | Value of filteredByTags
		 */
		const displayCards = (filtered) => {

			if (cards.length === filtered.length) {
				
				for (const el of cards) {
					el.element.classList.remove('hidden');
				}
			} else {

				for (const el of cards) {
					el.element.classList.add('hidden');
				}

				for (const el of filtered) {
					el.element.classList.remove('hidden');
				}
			}
		}

		let timeout = null

		const onFilter = () => {
			if (timeout) clearTimeout(timeout)
			timeout = setTimeout(() => {
				const input = document.querySelector('.topPage__inputSearch').value
				const filteredCards = tags.match(cards)
				const finalCards = Search.match(filteredCards, input)
				
				displayCards(finalCards)
				cardsCounter(finalCards)
			}, 500)
		}

		search.listener(onFilter)
		tags.builgTagsHtml()
		tags.listeners(onFilter)

		onFilter()
	})
}