let message;

const errorHandler = (err, req, res, next) => {
	console.log(err);
	switch (err.name) {
		case 'SequelizeValidationError':
			message = err.errors.map((el) => el.message)
			console.log(message)
			res.status(400).json({ error: message })
			break;

		case 'SequelizeUniqueConstraintError':
			message = err.errors.map((el) => el.message)
			res.status(400).json({ error: message })
			break;

		case 'SequelizeForeignKeyConstraintError':
			res.status(400).json({
				error: `${err.parent.detail}`,
			})
			break;

		case 'productNotFound':
			res.status(404).json({ error: 'Product not found' })
			break;

		case 'unauthorized':
			res.status(401).json({ error: 'Incorrect e-mail/password' })
			break;

		case 'authenticationErr':
			res.status(401).json({ error: 'Authentication failed' })
			break;

		case 'NO_ACCESS':
			res.status(403).json({ error: "Don't have permission to access" })
			break;

		case 'Already added':
			res.status(400).json({ error: 'Product is already added' })
			break;

		case 'Yourcartisempty':
			res.status(400).json({ error: 'Product is not found' })
			break;

		default:
			res.status(500).json(err);
			break;
	}
};

module.exports = errorHandler;