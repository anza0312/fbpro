import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ status: false, message: 'Method not allowed.' });
    }

    try {
        const results = await sql`SELECT * FROM users`;

        return res.status(200).json({ status: true, data: results.rows });
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Terjadi kesalahan yang tidak terduga.', error: error.message });
    }
}
