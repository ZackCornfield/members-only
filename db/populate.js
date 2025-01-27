const { Client } = require('pg');   
require('dotenv').config(); 

const dropTables = `DROP TABLE IF EXISTS users, messages`; 

const createTables = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,    
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, 
    membership_status BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE  
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    text TEXT,
    timestamp TIMESTAMP DEFAULT NOW(),
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);`;

const addAdmin = `INSERT INTO users (first_name, last_name, username, password, membership_status, is_admin) VALUES ('Admin', 'Admin', 'admin', '$2b$10$3', true, true)`;    

async function main() {
    console.log('seeding...');
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });
    try {
        await client.connect();
        console.log('connected to database');
        await client.query(dropTables);
        await client.query(createTables);
        console.log('tables created');
        await client.query(addAdmin);
        console.log('admin added');
    } catch (err) { 
        console.error("Error during database setup", err);  
    } finally { 
        await client.end(); 
        console.log('disconnected from database');
    }   
}

main();