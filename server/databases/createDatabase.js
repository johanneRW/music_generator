import db from "./connection.js"

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true

if (isDeleteMode) {
    db.exec(`DROP TABLE archive;`)
    db.exec(`DROP TABLE users;`)
}

// Ensure the users table exists
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    password TEXT,
    email TEXT UNIQUE
)
`);

// Ensure the archive table exists
db.exec(`
CREATE TABLE IF NOT EXISTS archive (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    array TEXT,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
`);

// Insert test user
db.run(`
INSERT INTO users (name, password, email)
VALUES ('username', '$2b$10$zM3Csoovy2idhzW7x0k3b.Ke.Cy2dOcASLm0OZs3av8QEn3CMXrR.', 'username@example.org')
`);
