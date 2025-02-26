import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submited, setSubmited] = useState(false);
    const [error, setError] = useState();

    const handleLogin = async (e) => {
        e.preventDefault();
        setSubmited(false);

        try {
            const checkLogin = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await checkLogin.json();

            if (data?.status == true) {
                sessionStorage.setItem('user', JSON.stringify(data?.data));
                router.push('/');
            } else {
                setError(data?.message ?? 'Terjadi kesalahan yang tidak terduga.');
                setTimeout(() => setError(''), 3000);
            }
        } catch (err) {
            setError('Tidak dapat terhubung ke server.');
        } finally {
            setSubmited(false);
        }
    }

    useEffect(() => {
        const user = window.sessionStorage.getItem('user');
        if (user !== null) {
            router.push('/');
        }
    }, []);

    return (
        <>
            <title>Nugi Template :: Masuk</title>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h1 className="text-2xl font-semibold mb-6 text-center">Member :: Masuk</h1>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan Username"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan Kata Sandi"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-[0.5]"
                            disabled={submited}
                        >
                            {submited ? 'Proses...' : 'Masuk'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
