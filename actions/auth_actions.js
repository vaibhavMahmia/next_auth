'use server';

import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signup = async (prevState, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    let errors = {};
    if(!email.includes('@')) errors.email = 'Please enter a valid email address.';
    if(password.trim().length < 8) errors.password = 'Password must be at least 8 characters long.';
    //return error if any:
    if(Object.keys(errors).length > 0) return { errors };

    //store it in database (create a new user)
    const hashedPassword = hashUserPassword(password);
    try {
        const id = createUser(email, hashedPassword);
        const sessionCookie = await createAuthSession(id);
        (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        redirect('/training');
    } catch (error) {
        if(error.code === 'SQLITE_CONSTRAINT_UNIQUE') return { errors: { email: 'It seems like an account for the chosen email already exists.' }};
        throw error;
    }
}

export const login = async (prevState, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    const existingUser = getUserByEmail(email);
    if(!existingUser) return { errors: { email: 'Could not authenticate user, Please check your credentials.' }};

    const isValidPassword = verifyPassword(existingUser.password, password);
    if(!isValidPassword) return { errors: { password: 'Could not authenticate user, Please check your credentials.' }};

    const sessionCookie = await createAuthSession(existingUser.id);
    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    redirect('/training');
}

export const auth = async (mode, prevState, formData) => {
    if(mode === 'login') return login(prevState, formData);
    return signup(prevState, formData);
}

export const logout = async () => {
    await destroySession();
    redirect('/');
}