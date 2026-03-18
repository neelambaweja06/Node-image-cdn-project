// exports.validateRegister = (req, res, next) => {

//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({
//             message: "Name, email and password are required"
//         });
//     }

//     next(); // move to controller
// };




exports.validateRegister = (req, res, next) => {

    const {
        first_name,
        last_name,
        email,
        mobile_number,
        password
    } = req.body;

    if (!first_name || !email || !password) {
        return res.status(400).json({
            message: "First name, email and password are required"
        });
    }

    next();
};








exports.validateLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    next(); // move to controller
};