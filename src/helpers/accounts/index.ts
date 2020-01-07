import { db } from '../../db/db-connection';

export const passwordsAndConfirmMatch = (
    password: string,
    confirm: string,
): boolean => {
    if (password === confirm) return true;
    return false;
};

export const emailIsTaken = async (email: string): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM accounts WHERE email = "${email}";`,
            (err, result) => {
                if (err) return reject();
                if (result.length === 1 && result[0]['email'] === email) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            },
        );
    });
};
