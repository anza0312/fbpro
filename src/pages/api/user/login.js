import { sql } from "@vercel/postgres";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ status: false, message: 'Method not allowed.' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ status: false, message: 'Mohon mengisi semua input.' });
    }

    try {
        const checkUser = await sql`SELECT * FROM users WHERE username = ${username}`;

        if (checkUser.rowCount == 0) {
            return res.status(400).json({ status: false, message: 'Username tidak dapat ditemukan.' });
        }

        const dataUser = checkUser.rows[0];
        if (await bcrypt.compare(password, dataUser?.password) == false) {
            return res.status(400).json({ status: false, message: 'Kata Sandi salah.' });
        }

        return res.status(200).json({ status: true, data: dataUser });
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Terjadi kesalahan yang tidak terduga.', error: error.message });
    }
}
