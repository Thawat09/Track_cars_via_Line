const { Strategy: LineStrategy } = require('passport-line');
const { pool } = require('../config/postgre');

module.exports = function (passport) {
    passport.use(new LineStrategy({
        channelID: process.env.LINE_CHANNEL_ID,
        channelSecret: process.env.LINE_CHANNEL_SECRET,
        callbackURL: "http://localhost:3000/api/auth/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const { id, displayName, pictureUrl } = profile;

            const userResult = await pool.query('SELECT * FROM users WHERE line_user_id = $1', [id]);
            if (userResult.rows.length > 0) {
                done(null, userResult.rows[0]);
            } else {
                const newUserResult = await pool.query(
                    'INSERT INTO users (line_user_id, name, profile_picture) VALUES ($1, $2, $3) RETURNING *',
                    [id, displayName, pictureUrl]
                );
                done(null, newUserResult.rows[0]);
            }
        } catch (error) {
            done(error, null);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.line_user_id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const userResult = await pool.query('SELECT * FROM users WHERE line_user_id = $1', [id]);
            done(null, userResult.rows[0]);
        } catch (error) {
            done(error, null);
        }
    });
};