const { populate } = require('dotenv');
const pool = require('./db');

const getAllUsers = async () => {
    const res = await pool.query(`SELECT * FROM users`);
    return res.rows;
};

const getUserById = async (id) => {
    const res = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return res.rows[0];
};

const getUserByUsername = async (username) => {
    const res = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
    return res.rows[0];
}

const createUser = async (firstName, lastName, username, password, membershipStatus, isAdmin) => {
    const res = await pool.query(
        `INSERT INTO users (first_name, last_name, username, password, membership_status, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [firstName, lastName, username, password, membershipStatus, isAdmin]
    );
    return res.rows[0];
};

const updateUser = async (id, firstName, lastName, username, password, membershipStatus, isAdmin) => {
    const res = await pool.query(
        `UPDATE users SET first_name = $1, last_name = $2, username = $3, password = $4, membership_status = $5, is_admin = $6 WHERE id = $7 RETURNING *`,
        [firstName, lastName, username, password, membershipStatus, isAdmin, id]
    );
    return res.rows[0];
};

const updateMembershipStatus = async (id, membershipStatus) => {
    const res = await pool.query(
        `UPDATE users SET membership_status = $1 WHERE id = $2 RETURNING *`,
        [membershipStatus, id]
    );
    return res.rows[0];
};

const updateAdminStatus = async (id, isAdmin) => {  
    const res = await pool.query(
        `UPDATE users set is_admin = $1 WHERE id = $2 RETURNING *`, 
        [isAdmin, id]   
    );
    return res.rows[0];
};

const deleteUser = async (id) => {
    const res = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return res.rowCount > 0;
};

const getAllMessages = async () => {
    const res = await pool.query(`SELECT * FROM messages`);
    return res.rows;
};

const getAllMessagesAndAuthors = async () => {
    const res = await pool.query(
        `SELECT messages.*, users.first_name, users.last_name
        FROM messages
        JOIN users ON messages.author_id = users.id
        ORDER BY messages.timestamp DESC`
    );
    return res.rows;
};

const getMessageById = async (id) => {
    const res = await pool.query(`SELECT * FROM messages WHERE id = $1`, [id]);
    return res.rows[0];
};

const createMessage = async (title, text, authorId) => {
    const res = await pool.query(
        `INSERT INTO messages (title, text, author_id) VALUES ($1, $2, $3) RETURNING *`,
        [title, text, authorId]
    );
    return res.rows[0];
};

const updateMessage = async (id, title, text) => {
    const res = await pool.query(
        `UPDATE messages SET title = $1, text = $2 WHERE id = $3 RETURNING *`,
        [title, text, id]
    );
    return res.rows[0];
};

const deleteMessage = async (id) => {
    const res = await pool.query(`DELETE FROM messages WHERE id = $1`, [id]);
    return res.rowCount > 0;
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    updateMembershipStatus,
    updateAdminStatus,
    deleteUser,
    getAllMessages,
    getAllMessagesAndAuthors,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
};