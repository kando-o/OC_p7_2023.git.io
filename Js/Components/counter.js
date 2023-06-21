export const cardsCounter = (cards) => {
	const nbrRecipes = document.querySelector('.nbrRecettes')
	return nbrRecipes.textContent = cards.length
}
