// next() sends user to the next middleware function
// or redirects to if the auth doesn't exist

const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    }else {
        next();
    }
};

module.exports = withAuth;