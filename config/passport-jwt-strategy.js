import passport from 'passport';
import JWT from 'passport-jwt';
import User from '../models/user.js';
const JWTStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt; 

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true
}

passport.use(new JWTStrategy(opts, async function(req, JWTPayload, done) {
    try {
        const user = await User.findById(JWTPayload._id);
        
        if (user) {
            req.user = user;
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.log("Error in finding user from JWT:", err);
        return done(err, false);
    }
}));

export default passport;