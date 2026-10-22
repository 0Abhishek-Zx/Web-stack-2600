
import express from 'express';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Import your validation middleware
import { validatePizza, validateColor } from './my-validators.js';

app.post('/orders', validatePizza, (req, res) => {
    res.json(req.body);
    console.log('yippy');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
