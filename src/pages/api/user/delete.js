import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ status: false, message: 'Method not allowed.' });
    }

    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ status: false, message: 'Mohon mengisi semua input.' });
    }

    try {
        const checkUser = await sql`SELECT * FROM users WHERE id = ${id}`;

        if (checkUser.rowCount == 0) {
            return res.status(400).json({ status: false, message: 'Data pengguna tidak dapat ditemukan.' });
        }

        await sql`DELETE FROM users WHERE id = ${id}`;

        return res.status(200).json({ status: true });
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Terjadi kesalahan yang tidak terduga.', error: error.message });
    }
}
