const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

module.exports = (passport) => {
    // Configure local strategy for login
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await db.getUserByUsername(username);
                if (!user) {
                    return done(null, false, { message: "Invalid username or password" });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: "Invalid username or password" });
                }

                return done(null, user); // Authentication successful
            } catch (err) {
                console.log("Error during authentication");    
                return done(err);
            }
        })
    );

    // Serialize user to store data in the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user to retrieve user details from the database
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.getUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
