import { sql } from "@vercel/postgres";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ status: false, message: 'Method not allowed.' });
    }

    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ status: false, message: 'Mohon mengisi semua input.' });
    }

    if (role !== 'admin' && role !== 'member') {
        return res.status(400).json({ status: false, message: 'Level tidak valid.' });
    }

    try {
        const checkUser = await sql`SELECT * FROM users WHERE username = ${username}`;

        if (checkUser.rowCount >= 1) {
            return res.status(400).json({ status: false, message: 'Username sudah digunakan.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertUser = await sql`INSERT INTO users (username, password, roles) VALUES (${username}, ${hashedPassword}, ${role}) RETURNING id, username, roles, created_at`;

        return res.status(200).json({ status: true, data: insertUser.rows[0] });
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Terjadi kesalahan yang tidak terduga.', error: error.message });
    }
}
