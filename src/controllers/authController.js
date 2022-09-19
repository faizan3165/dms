export const checkLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.redirect('/login');
	}

	next();
};

export const checkLoggedOut = (req, res, next) => {
	if (req.isAuthenticated()) {
		return res.redirect('/admin');
	}

	next();
};

export const postLogOut = (req, res, next) => {
    req.session.destroy(function (err) {
        return res.redirect('/login'); 
    })
};
