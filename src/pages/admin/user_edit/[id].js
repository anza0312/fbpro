import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserEdit() {
    const router = useRouter();
    const { id } = router.query;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [created_at, setCreatedAt] = useState('');
    const [error, setError] = useState('');
    const [submited, setSubmited] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmited(true);

        try {
            const editUser = await fetch('/api/user/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, username, password, role }),
            });

            const data = await editUser.json();

            if (data?.status == true) {
                router.push('/admin');
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
        if (user == null) {
            router.push('/login');
        } else {
            var dataUser = JSON.parse(user);

            const checkUser = async (dataUser) => {
                try {
                    const checkLogin = await fetch('/api/user/detail', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: dataUser?.id }),
                    });

                    const data = await checkLogin.json();

                    if (data?.status == true) {
                        sessionStorage.setItem('user', JSON.stringify(data?.data));
                        dataUser = data?.data;
                    } else {
                        sessionStorage.removeItem('user');
                        router.push('/login');
                    }
                } catch (err) {
                    sessionStorage.removeItem('user');
                    alert('Tidak dapat terhubung ke server.');
                    router.push('/login');
                }
            }

            const getDetail = async (id) => {
                try {
                    const getDetails = await fetch('/api/user/detail', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id })
                    });

                    const data = await getDetails.json();

                    if (data?.status == true) {
                        setUsername(data?.data.username);
                        setRole(data?.data.roles);
                        setCreatedAt(data?.data.created_at);
                    } else {
                        setError(data?.message ?? 'Terjadi kesalahan yang tidak terduga.');
                    }
                } catch (err) {
                    setError('Tidak dapat terhubung ke server.');
                }
            }

            checkUser(dataUser);

            if (dataUser?.roles !== 'admin') {
                router.push('/');
            } else {
                if (id) {
                    getDetail(id);
                }
            }
        }
    }, [id]);

    return (
        <>
            <title>Nugi Template :: Ubah Pengguna</title>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">Ubah User</h1>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                            <input
                                type="text"
                                id="id"
                                value={id}
                                readOnly
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-600 bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                readOnly
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-600 bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-600"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-600"
                            >
                                <option value="member">Member</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="created_at" className="block text-sm font-medium text-gray-700">Created At</label>
                            <input
                                type="text"
                                id="created_at"
                                value={created_at}
                                readOnly
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-600 bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {submited ? 'Proses...' : 'Simpan Perubahan'}
                        </button>
                        <button
                            type="button"
                            className="w-full py-2 px-4 bg-black text-white rounded-md mt-[5px]"
                            onClick={() => {
                                return router.push('/admin');
                            }}
                        >
                            Kembali
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}