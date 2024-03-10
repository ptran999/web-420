/* 
    Title: app.js
    Date: 02/02/2024
    Author: Phuong Tran
    Description: Setup server

*/
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const composersAPI = require('./routes/tran-composer-routes');
const personsAPI = require('./routes/tran-person-routes')
const usersAPI = require('./routes/tran-session-routes');
const customerAPI = require('./routes/tran-node-shopper-routes');
const teamsAPI = require('./routes/tran-teams-routes');

// Variable to express library.
const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// Set app to use express.json
app.use(express.json());

//Set app to use express.urlencoded
app.use(express.urlencoded({ 'extended': true }));

// Link to mongoDB. 
const CONN = 'mongodb+srv://web340_admin:webstudent999@bellevueuniversity.bj68fz9.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(CONN, {
    promiseLibrary: require('bluebird'), 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log("MongoDB Error: " + err.message);
});

//Define options with properties/values. 
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'] 
};

// Create the Swagger/OpenAPI specification
const openapiSpecification = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', composersAPI);
app.use('/api', personsAPI);
app.use('/api', usersAPI);
app.use('/api', customerAPI);

// additional route for render
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

//Create server and listen on port 3000.
http.createServer(app).listen(PORT, () => {
    console.log(`Application started and listening on port ${PORT}.`);
});
