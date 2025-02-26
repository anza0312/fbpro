import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Admin() {
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

    const getUsers = async () => {
        setLoading(true);

        try {
            const checkLogin = await fetch('/api/user/lists', {
                method: 'GET'
            });

            const data = await checkLogin.json();

            if (data?.status == true) {
                setUsers(data?.data);
            } else {
                setError(data?.message ?? 'Terjadi kesalahan yang tidak terduga.');
            }
        } catch (err) {
            setError('Tidak dapat terhubung ke server.');
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async (id) => {
        const confirmation = confirm(`Apakah Anda yakin ingin menghapus pengguna dengan ID ${id}?`);
        if (confirmation) {
            const deleteUsers = await fetch('/api/user/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            const data = await deleteUsers.json();

            if (data?.status == true) {
                await getUsers();
            } else {
                setError(data?.message ?? 'Terjadi kesalahan yang tidak terduga.');
            }
        }
    }

    useEffect(() => {
        const user = window.sessionStorage.getItem('user');
        if (user == null) {
            router.push('/login');
        } else {
            var dataUser = JSON.parse(user);
            checkUser(dataUser);

            if (dataUser?.roles !== 'admin') {
                router.push('/');
            } else {
                getUsers();
            }
        }
    }, []);

    return (
        <>
            <title>Nugi Template :: Admin Dashboard</title>
            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex gap-[10px]">
                        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
                        <button className="text-3xl font-semibold text-red-600 hover:text-red-900" onClick={() => {
                            sessionStorage.removeItem('user');

                            return router.push('/login');
                        }}>Keluar</button>
                    </div>

                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="mt-6 grid grid-cols-12 gap-[10px]">
                            <div className="col-span-12">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h2 className="text-xl font-semibold text-gray-700">Total Pengguna</h2>
                                    <p className="text-3xl font-bold text-gray-900 mt-4">{users.length}</p>
                                    <button
                                        className="text-blue-600 hover:text-blue-900"
                                        onClick={() => {
                                            return router.push('/admin/user_add')
                                        }}
                                    >
                                        Tambah Pengguna
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                                    <table className="min-w-full table-auto">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Username</th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Level</th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dibuat Pada</th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user?.id} className="border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user?.id}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user?.username}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        <span
                                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${user?.roles === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                                                        >
                                                            {user?.roles}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user?.created_at}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        <button
                                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                                            onClick={() => {
                                                                return router.push(`/admin/user_edit/${user?.id}`);
                                                            }}
                                                        >
                                                            Ubah
                                                        </button>
                                                        <button
                                                            className="text-red-600 hover:text-red-900"
                                                            onClick={() => deleteUser(user?.id)}
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}