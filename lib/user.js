import db from "./db";

export const createUser = (email, password) => db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, password).lastInsertRowid;