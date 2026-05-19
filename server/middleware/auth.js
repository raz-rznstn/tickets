const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

// Verify token from cookie and attach user to request
exports.protect = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Restrict access to specific roles
exports.restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return res.status(403).json({ message: 'You do not have permission to perform this action' });
  next();
};

// Attach user if token exists, continue either way (for guest-compatible routes)
exports.protect = (req, res, next) => {
  const token = req.cookies?.token;
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      // invalid token - continue as guest
    }
  }
  next();
};

// Scanner can only access events they are assigned to
exports.canScanEvent = async (req, res, next) => {
  if (req.user.role === 'admin') return next();
  try {
    const user = await User.findById(req.user.id);
    const eventId = req.params.eventId || req.body.eventId;
    if (!user?.assignedEvents?.some(id => id.toString() === eventId))
      return res.status(403).json({ message: 'You are not assigned to this event' });
    next();
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};