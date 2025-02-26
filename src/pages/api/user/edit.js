import { sql } from "@vercel/postgres";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ status: false, message: 'Method not allowed.' });
    }

    const { id, password, role } = req.body;

    if (!id || !role) {
        return res.status(400).json({ status: false, message: 'Mohon mengisi semua input.' });
    }

    if (role !== 'admin' && role !== 'member') {
        return res.status(400).json({ status: false, message: 'Level tidak valid.' });
    }

    try {
        const checkUser = await sql`SELECT * FROM users WHERE id = ${id}`;

        if (checkUser.rowCount == 0) {
            return res.status(400).json({ status: false, message: 'Data pengguna tidak dapat ditemukan.' });
        }

        var hashedPassword = checkUser.rows[0]?.password;
        if (password != '') {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updateUser = await sql`UPDATE users SET password = ${hashedPassword}, roles = ${role} WHERE id = ${id} RETURNING id, username, roles, created_at`;

        return res.status(200).json({ status: true, data: updateUser.rows[0] });
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Terjadi kesalahan yang tidak terduga.', error: error.message });
    }
}
