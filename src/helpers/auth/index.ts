import { db } from '../../db/db-connection';
import { sha512 } from '../hash';

export const credentialsMatch = async (
    email: string,
    password: string,
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM accounts WHERE email = "${email}";`,
            (err, result) => {
                if (err) return reject();
                if (result.length === 1 && result[0]['email'] === email) {
                    const salt = result[0]['salt'];
                    const hash = result[0]['hash'];

                    const crypto = sha512(password, salt);
                    if (crypto.hash === hash) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                } else {
                    return reject();
                }
            },
        );
    });
};
