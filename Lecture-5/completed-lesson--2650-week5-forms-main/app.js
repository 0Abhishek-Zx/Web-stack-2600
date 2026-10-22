import express from 'express';
const app = express();
app.listen(3000, ()=>console.log('listening on 3000'));

// There's an easier way to send files... using Middleware!
//Express has a built-in middleware for this.
app.use(express.static('public-files')); // takes a folder location
// where the files are stored.
// The above middleware does NOT include public-files
// folder name in the path of the URL. 

// We need to use ANOTHER built-in middleware to decode
// the form data before we can access it.
app.use(express.urlencoded({ extended: true}));

// Create a function that will handle the form submission.
// receive a POST request, and send a response.
    // req.body contains the HTTP request body, which contains
    // the form data
    // A form sent as a GET request encodes the form data where? In the URL. Not very secure
    // A form sent as a POST request encodes the form data in the body of the request, which can be encrypted
    // handle the request here.

// Validation: make sure the student number exists and has exactly 4 digits.

const validation = (req, res, next) =>{
    // Create en error object that will follow the response object
    res.locals.errorMessage = "";
    if(req.body.studentNumber > 9999 || req.body.studentNumber < 1000) {
        res.locals.errorMessage += "Student number must be less than 9999 or greater than 1000";
    }
    next();
}
// Sending raw JSON directly to the user is not recommended
app.post('/registration', [validation], (req, res)=>{
    if(res.locals.errorMessage == "") {
        // 200 => success
        res.status(200).send(`<h1>Success!</h1><p>Student with name ${req.body.lastName} has registered </p>`);
    }
    else {
        // Unproceessable Entity: often used for bad form data, validation error
        res.status(422).send(res.locals.errorMessage);
    }
});
// Note: to display the error message on the same page as form, use templates (view engines from assignment 4) or React front end framework (learning in a few weeks)