export const cardsCounter = (cards) => {
	const count = cards.length
	const recipesCounterContainer = document.querySelector(".recettes__nbrRecette")
	recipesCounterContainer.querySelector('.nbrRecettes').textContent = cards.length
	recipesCounterContainer.querySelector(".recipeText").textContent = "recette"+(count>1?"s":"")
	return count
}

const arrowFunction = (count) => {return count > 1 ? "s" : '' }