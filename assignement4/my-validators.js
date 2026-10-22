
import validator from 'validator';



export const validatePizza = (req, res, next) => {
    // Store all validation errors here
    res.locals.errors = [];

    // 1. Validate sauce
    const allowedSauces = ['tomato', 'alfredo'];
    const sauce = req.body.sauce;

    if (
        typeof sauce !== 'string' ||
        !allowedSauces.includes(sauce)
    ) {
        res.locals.errors.push({
            field: 'sauce',
            message: 'Please select tomato or alfredo sauce.'
        });
    }

    // 2. Validate toppings
    const allowedToppings = [
        'Pepperoni',
        'Ham',
        'Peppers',
        'Vegetarian Sausage',
        'Mushrooms',
        'Olives'
    ];

    let toppings = req.body.Toppings || [];

    // A single checkbox selection arrives as a string,
    // while multiple selections arrive as an array.
    if (!Array.isArray(toppings)) {
        toppings = [toppings];
    }

    req.body.Toppings = toppings;

    if (toppings.length < 1 || toppings.length > 3) {
        res.locals.errors.push({
            field: 'Toppings',
            message: 'Please select between 1 and 3 toppings.'
        });
    }

    if (
        !toppings.every(
            topping =>
                typeof topping === 'string' &&
                allowedToppings.includes(topping)
        )
    ) {
        res.locals.errors.push({
            field: 'Toppings',
            message: 'One or more toppings are invalid.'
        });
    }

    // 3. Validate and sanitize customer's name
    let name = req.body.yourName;

    if (typeof name !== 'string') {
        name = '';
    }

    name = validator.trim(name);
    req.body.yourName = name;

    if (!validator.isLength(name, { min: 3, max: 30 })) {
        res.locals.errors.push({
            field: 'yourName',
            message: 'Your name must be between 3 and 30 characters.'
        });
    }

    // 4. Validate email
    const email = req.body.email;

    if (
        typeof email !== 'string' ||
        !validator.isEmail(email.trim())
    ) {
        res.locals.errors.push({
            field: 'email',
            message: 'Please enter a valid email address.'
        });
    } else {
        req.body.email = validator.trim(email);
    }

    // Continue to the next middleware or route
    next();
};



export const validateColor = (req, res, next) => {
    // Color validation and sanitization goes here

    next();
};
