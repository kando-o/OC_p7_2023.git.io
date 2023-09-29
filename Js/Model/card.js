export class Ingredient {
	constructor(dataIngredient) {
		this._name = dataIngredient.ingredient,
		this._quantity = this._formatQuantity(dataIngredient), // format quantities
		this._unit = this._formatUnit(dataIngredient) // format units
	}

	_formatUnit (dataIngredient) {
		return dataIngredient.hasOwnProperty('unit') ? dataIngredient.unit : ''
	}

	_formatQuantity (dataIngredient) {
		return dataIngredient.hasOwnProperty('quantity') ? dataIngredient.quantity : 1
	}

	toHtml () {
		return `<div class='recettes__contentRecettes'>
			<p class='recettes__pName'>${this._name}</p>
			<div><recettes__ class='recettes__PquantityPunit'>${this._quantity} ${this._unit} </recettes__></div>
		</div>`
	}

	/**
	 * @return {string}
	 */
	get name () { return this._name }
	/**
	 * @return {string}
	 */
	get ingredient () { return this._name }
	/**
	 * @return {string}
	 */
	get quantity () { return this._quantity }
	/**
	 * @return {string}
	 */
	get unit () { return this._unit }
}

export default class Card  {

	constructor (data) {
		this._name = data.name;
		this._imgSrc = data.image;
		this._description = data.description;
		this._time = data.time;
		this._ingredients = data.ingredients.map(ing => new Ingredient(ing));
		this._ustensils = data.ustensils;
		this._appliances = [data.appliance];
		
		this._element = null;
		this._id = 'id_card_'+(++Card.countCards);
	}

	static getCardsCount () {
		return Card.countCards
	}

	release () {
		if (this._element) {
			// detach from parent
			if (this._element.parentNode) this._element.parentNode.removeChild(this._element)
			// remove dom element
			this._element.remove()
			this._element = null
		}
	}

	buildHtml () {
		const element = document.createElement('div')
		element.classList.add('cardGalerie')
		element.innerHTML += 
		`
			<figure class='recettes__card' id='${this._id}'>
				<div class="recettes__temps">${this._time}min</div>

				<img class="imgRecette" src="./Assets/image/${this._imgSrc}" alt="image de la recette" >
				<figcaption>

					<h3 class="recettes__titreRecette">${this._name}</h3>
					<p>Recette</p>
					<p>${this._description}</p>
					
					<p>Ingredients</p>

					<div class="recettes__itemsIngredients">
							${
								this._ingredients.map( i => {
									return i.toHtml()
								}).join('')
								
							}
					</div>
				</figcaption>
			</figure>			
		`;

		this._element = element
		return this
	}

	/**
	 * @return {HTMLElement}
	 */
	get element () { return this._element }

	/**
	 * @return {string}
	 */
	get id() { return this._id; }

	/**
	 * @return {string}
	 */
	get name () { return this._name }
	
	/**
	* @return {string}
	*/
   get description () { return this._description }

   /**
	* @return {Array<Ingredient>}
    */
   get ingredients () { return this._ingredients }

   /**
	* @return {string}
    */
   get appliances () { return this._appliances }

   /**
	* returns the list of ustentils
	* @return {Array<string>}
    */
   get ustensils () { return this._ustensils }

   static _init () {
		Card.countCards = 0;
   }
}

Card._init()