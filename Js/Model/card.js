export default class Card  {
	constructor (data) {

		this.image = data.map((el) => (el.image))
		this.temps = ''
		this.titreRecette = ''
		this.titreRecette = ''
		this.ingredients = ''
		this.quantite = ''
	}

	creadCard(data, parent) {
		const card = parent

		return data.map((el => {
			
			let Ingredients = el.ingredients.map(el => {return el.ingredient})
			
			const Unit = el.ingredients.map((el) => {return el.unit}).find((f) => ((f) => { f.unit === 'unit'}))
			const quantity = el.ingredients.find((f) => ((f) => { f.quantity === quantity}))
			
			// console.log(Ingredients);
			console.log(Unit);
			console.log(quantity);
			card.innerHTML += 
		`
			<figure class='recettes__card'>
				<div class="recettes__temps">${el.time}min</div>

				<img class="imgRecette" src="/Assets/image/${el.image}" alt="image de la recette" >
				<figcaption>

					<h3 class="recettes__titreRecette">${el.name}</h3>
					<p>Recette</p>
					<p>${el.description}</p>
					
					<h4>Ingredients</h4>

					<div class="recettes__itemsIngredients">
						<h5>
							<p>${Ingredients} </p>
							<p>${Unit}${quantity.quantity}</p>
						</h5>
					</div>
				</figcaption>
			</figure>

		`
		})) 
		
		
	}

	
}

