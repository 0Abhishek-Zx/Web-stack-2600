import express from "express";

const app = express();
const PORT = 3000;

const ourfirstmiddleware = (req, res, next) => {
  res.locals.message = " Hello middleware!";
  next();
};
// Challenge : make a middleware that adds a message only for endpoint c 
// the end reuslt is that b/ and c/ should have diffrent message 
// Middleware must come before the routes

const cmiddleware = (req,res, next)=> {
  res.locals.message = 'hello i forgot my homework ';
  next();
}
app.use(ourfirstmiddleware);
app.use(cmiddleware);
// first this middleware runs 
app.get("/", (req, res) => {
  res.send("Welcome to my server!" + res.locals.message);
});

app.get("/about",[otherMiddleware] (req, res) => {
  res.send("This is the About page." + res.locals.message);
});
app.use(cmiddleware);


app.get("/contact", (req, res) => {
  res.send("This is the Contact page." + res.locals.message);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});




