import db from './db';

export const getTrainings = () => db.prepare('SELECT * FROM trainings').all();