import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export default function Sidebar({user, showingNavigationDropdown, setShowingNavigationDropdown}) {
    const role = user?.role;
    const menu =
        role === 'student'
            ? 'student menu'
            : role === 'qa_officer'
                ? 'qa officer menu'
                : role === 'coordinator'
                    ? 'coordinator menu'
                    : role === 'admin'
                        ? 'admin menu'
                        : 'instructor menu';
    return (
        <aside className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
            showingNavigationDropdown ? 'translate-x-0' : '-translate-x-full'
        }`}>
            <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/" className="border-4 border-white p-2 uppercase text-white font-bold">
                    MSC Application
                </NavLink>
                <button className="block lg:hidden" onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}>
                    <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""></path>
                    </svg>
                </button>
            </div>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2 uppercase">
                            {
                                menu
                            }
                        </h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <NavLink to={`/${role}/dashboard`} className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-columns-gap" viewBox="0 0 16 16">
                                        <path
                                            d="M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z"/>
                                    </svg>
                                    Dashboard
                                </NavLink>
                            </li>
                            {
                                role === 'admin' && (
                                    <>
                                        <li>
                                            <NavLink to="/admin/courses" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-briefcase"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                                                </svg>
                                                Courses
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink to="/admin/programs" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-bounding-box"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M5 2V0H0v5h2v6H0v5h5v-2h6v2h5v-5h-2V5h2V0h-5v2H5zm6 1v2h2v6h-2v2H5v-2H3V5h2V3h6zm1-2h3v3h-3V1zm3 11v3h-3v-3h3zM4 15H1v-3h3v3zM1 4V1h3v3H1z"/>
                                                </svg>
                                                Programs
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink to="/admin/users" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                                    <path
                                                        d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                                                </svg>
                                                Users
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink to="/admin/setting" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-activity" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd"
                                                          d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
                                                </svg>
                                                Settings
                                            </NavLink>
                                        </li>
                                    </>
                                )
                            }

                            {
                                role === 'coordinator' && (
                                    <>
                                        <li>
                                            <NavLink to="/coordinator/programs" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                                                    <path
                                                        d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                                                </svg>
                                                Programs
                                            </NavLink>
                                        </li>
                                    </>
                                )
                            }

                            {
                                role === 'instructor' && (
                                    <>
                                        <li>
                                            <NavLink to="/instructor/courses" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                                                    <path
                                                        d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                                                </svg>
                                                Courses
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink to="/instructor/assessments" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-file-earmark-person"
                                                     viewBox="0 0 16 16">
                                                    <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                    <path
                                                        d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"/>
                                                </svg>
                                                Assessments
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink to="/instructor/students" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-journal-bookmark"
                                                     viewBox="0 0 16 16">
                                                    <path fillRule="evenodd"
                                                          d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"/>
                                                    <path
                                                        d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                                    <path
                                                        d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                                </svg>
                                                Students
                                            </NavLink>
                                        </li>
                                    </>
                                )
                            }

                            {
                                role === 'student' && (
                                    <>
                                        <li>
                                            <NavLink to="/students/programs" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-file-earmark-person"
                                                     viewBox="0 0 16 16">
                                                    <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                    <path
                                                        d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"/>
                                                </svg>
                                                Programs
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink to="/students/courses" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-send-check" viewBox="0 0 16 16">
                                                    <path
                                                        d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"/>
                                                    <path
                                                        d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
                                                </svg>
                                                Courses
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink to="/students/examinations" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-bounding-box"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M5 2V0H0v5h2v6H0v5h5v-2h6v2h5v-5h-2V5h2V0h-5v2H5zm6 1v2h2v6h-2v2H5v-2H3V5h2V3h6zm1-2h3v3h-3V1zm3 11v3h-3v-3h3zM4 15H1v-3h3v3zM1 4V1h3v3H1z"/>
                                                </svg>
                                                Examinations
                                            </NavLink>
                                        </li>
                                    </>
                                )
                            }

                            {
                                role === 'qa_officer' && (
                                    <>
                                        <li>
                                            <NavLink to="/qa_officer/policies" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                                                    <path
                                                        d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                                                </svg>
                                                QA Policies
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink to="/qa_officer/students" className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 cursor-pointer font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 false ${({isActive}) => isActive ? 'bg-graydark dark:bg-meta-4' : ''}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-pencil-square"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fillRule="evenodd"
                                                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                                Students Performance
                                            </NavLink>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    )
}

// prop validation
Sidebar.propTypes = {
    user: PropTypes.object,
    showingNavigationDropdown: PropTypes.bool,
    setShowingNavigationDropdown: PropTypes.func
}