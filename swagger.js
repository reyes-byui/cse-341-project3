const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		title: "Items API",
		description: "API for Managing Items"
	},
	host: 'localhost:3001',
	schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);