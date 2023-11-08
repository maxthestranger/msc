import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import useUsers from "../../hooks/useUsers";
import isEmpty from "lodash/isEmpty"

export default function Users() {
    const {
        users,
    } = useUsers();


    return (
        <DashboardLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-row items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-black">Users</h2>
                        <div className="flex flex-row items-center gap-3">
                            <Link to="/users/create" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-terminal-plus" viewBox="0 0 16 16">
                                    <path d="M2 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v4a.5.5 0 0 1-1 0V4a1 1 0 0 0-1-1H2Z"/>
                                    <path d="M3.146 5.146a.5.5 0 0 1 .708 0L5.177 6.47a.75.75 0 0 1 0 1.06L3.854 8.854a.5.5 0 1 1-.708-.708L4.293 7 3.146 5.854a.5.5 0 0 1 0-.708ZM5.5 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5ZM16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                                <span className="ml-2">Register User</span>
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-stroke px-5 pt-6 pb-2.5 sm:px-7.5 xl:pb-1">
                        <h4 className="mb-6 text-xl font-semibold text-black">
                            User Management
                        </h4>
                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                <tr className="bg-gray-2 text-left">
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11">First Name</th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black">Last Name</th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black">Email</th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black">Role</th>
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black">Verified</th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black">Joined On</th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    isEmpty(users) ?  (
                                        <tr>
                                            <td className="py-5 px-4 pl-9 xl:pl-11 text-center" colSpan="7">
                                                <h5 className="font-medium text-black">
                                                    No users found.
                                                </h5>
                                            </td>
                                        </tr>
                                    ) : users.map((user) => (
                                        <tr key={user?.id}>
                                            <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                                                <div className="flex flex-row items-center gap-3">
                                                    <h5 className="font-medium text-black">{user?.first_name}</h5>
                                                </div>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                                                <div className="flex flex-row items-center gap-3">
                                                    <h5 className="font-medium text-black">{user?.last_name}</h5>
                                                </div>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                                                <h5 className="font-medium text-black">{user?.email}</h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                                                <h5 className="font-medium text-black uppercase">{user?.role}</h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4">
                                               <span className="inline-flex items-center justify-center px-2 py-1 text-xs capitalize leading-none text-black bg-gray-400 rounded-full">
                                                    <span className={`rounded-full w-2 h-2 mr-1 ${user?.email_verified ? 'bg-green-500' : 'bg-yellow-500'}`} /> {user?.email_verified ? 'Verified' : 'Unverified'}
                                               </span>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4">
                                                <h5 className="font-medium text-sm text-black">{
                                                    new Date(user?.created_at).toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })
                                                }</h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4">
                                                <div className="flex flex-row items-center gap-3">
                                                    <Link to={`/users/${user?.id}/edit`} className="p-3 bg-gray text-blue-600 rounded-md hover:bg-gray-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                        </svg>
                                                    </Link>

                                                    <button className="p-3 bg-gray text-red-600 rounded-md hover:bg-gray-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
