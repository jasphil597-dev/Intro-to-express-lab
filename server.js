const express = require('express');
const app = express();

//	1. Be Polite, Greet the User
app.get('/greet/:name', (req, res) => {
	const name = req.params.name;
	res.send(`Hello there, ${name}!`);
});

//	2. Rolling the Dice

app.get('/roll/:number', (req, res) => {
	// const numberParam = req.params.number;
	const number = parseInt(req.params.number, 10);

	if (isNaN(number)) {
		return res.send('You must specify a number.');
	}
	const rolledResult = Math.floor(Math.random() * (number + 1));

	return res.send(`You rolled a ${rolledResult}.`);
});

//	3. I Want THAT One!
const collectibles = [
	{ name: 'shiny ball', price: 5.95 },
	{ name: 'autographed picture of a dog', price: 10 },
	{ name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 },
];
app.get('/collectibles/:index', (req, res) => {
	const index = parseInt(req.params.index, 10);

	if (isNaN(index) || index < 0 || index >= collectibles.length) {
		return res.send('This item is not yet in stock. Check back soon!');
	}

	const item = collectibles[index];
	res.send(
		`So, you want the ${item.name}? For $${item.price}, it can be yours!`
	);
});

//	4. Filter Shoes by Query Parameters
const shoes = [
	{ name: 'Birkenstocks', price: 50, type: 'sandal' },
	{ name: 'Air Jordans', price: 500, type: 'sneaker' },
	{ name: 'Air Mahomeses', price: 501, type: 'sneaker' },
	{ name: 'Utility Boots', price: 20, type: 'boot' },
	{ name: 'Velcro Sandals', price: 15, type: 'sandal' },
	{ name: 'Jet Boots', price: 1000, type: 'boot' },
	{ name: 'Fifty-Inch Heels', price: 175, type: 'heel' },
];
app.get('/shoes', (req, res) => {
	const minPrice = parseFloat(req.query['min-price']);
	const maxPrice = parseFloat(req.query['max-price']);
	const type = req.query.type;

	let filteredShoes = shoes;

	if (!isNaN(minPrice)) {
		filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice);
	}

	if (!isNaN(maxPrice)) {
		filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice);
	}

	if (type) {
		filteredShoes = filteredShoes.filter(
			(shoe) => shoe.type.toLowerCase() === type.toLowerCase()
		);
	}
	res.send(filteredShoes); //	same with res.json
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
