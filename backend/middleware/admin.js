// Middleware to check if the user is an admin
module.exports = function(req, res, next) {
    // req.user is populated from the auth middleware
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Authorization denied: Admin access required' });
    }
    next();
}; 