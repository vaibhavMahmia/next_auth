import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite"
import { Lucia } from "lucia"
import db from "./db"

const adapter = new BetterSqlite3Adapter(db, { user: 'users', session: 'sessions' });
const lucia = new Lucia(adapter, { sessionCookie: { expires: false, attributes: { secure: process.env.NODE_ENV === 'production' } } });

export const createAuthSession = async (userId) => {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    return sessionCookie;
}