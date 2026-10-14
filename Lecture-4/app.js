import express from 'express';
const app = express();
app.listen(3000, ()=>console.log('server listening on 3000'));

// Express Middleware: this is a way to extend the functionality of our
// server application in an organized way. Middlewares are functions that are used to modify the request or response after receiving a request from the client and before sending a response. Different middlewares that do different things can be chained together, with the request and response being passed sequentially through the chain. The last step in the chain is to send a reponse. Common uses: processing form submissions (validating the form input, make sure it's correct), routing requests to the correct part of the program (use Express's built-in middleware to automatically handle requests for HTML and CSS files)

const ourFirstMiddleware = (req, res, next)=> {
    // The purpose of this middleware is to add a message to the response that we send to the user.
    // Add the message:
    res.locals.message = 'Hello Middleware!';
    // passes control to the next middlware in the chain OR if there are no other middlewares in the chain, to the route handler that sends the response.
    next();
}

// This places the middleware in the chain. When we receive a request, this middleware will be run first - then passed to the whichever route handler below matches the path.

// CHALLENGE: make a middleware that adds a message ONLY for endpoint c
// The end result is that /b and /c should have DIFFERENT messages.
const otherMiddleware = (req, res, next) =>{
    res.locals.message += 'This message should only appear for /c';
    next();
}

const thirdMiddleware = (req, res, next) =>{
    console.log("this middleware is running");
    next();
}
// This means the middleware will apply ONLY to /a
app.use('/a', thirdMiddleware);

// router handlers 
app.get('/a', (req, res)=>{
    res.send('Endpoint a ' + res.locals.message);
});
// first this middle runs
app.use(ourFirstMiddleware);

// Apply the otherMiddleware to ONLY endpoint b and none of the following endpoints.
app.get('/b', [otherMiddleware], (req, res)=>{
    res.send('Endpoint b ' + res.locals.message);
});
// ... then this one
// app.use(otherMiddleware); // should only apply to endpoints below

app.get('/c', (req, res)=>{
    res.send('Endpoint c ' + res.locals.message);
});