import db from "./connection.js"

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true

if (isDeleteMode) {
    db.exec(`DROP TABLE users;`)
    /* db.exec(`DROP TABLE dinosaurs;`) */
}

db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    password TEXT,
    email TEXT UNIQUE
)
`)

db.exec(`
/* CREATE TABLE IF NOT EXISTS dinosaurs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    image TEXT,
    votes INTEGER DEFAULT 0
) */
`)


// Seeding (DML)
if (isDeleteMode) {
/*     db.exec(`INSERT INTO dinosaurs (name, image, votes) VALUES ('Tyrannosaurus Rex','tyrannosaurus-rex-svgrepo-com.svg',0);`)
    db.exec(`INSERT INTO dinosaurs (name, image, votes) VALUES ('Triceratops','triceratops-svgrepo-com.svg',0);`)
    db.exec(`INSERT INTO dinosaurs (name, image, votes) VALUES ('Stegosaurus','stegosaurus-svgrepo-com.svg',0);`)
    db.exec(`INSERT INTO dinosaurs (name, image, votes) VALUES ('Diplodocus','diplodocus-svgrepo-com.svg',0);`) */
}
