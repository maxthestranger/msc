import {Link} from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import useCourses from "../../hooks/useCourses.jsx";
import isEmpty from "lodash/isEmpty"

export default function Courses() {
    const {
        courses,
    } = useCourses();


    return (
        <DashboardLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-row items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-black">Courses</h2>
                        <div className="flex flex-row items-center gap-3">
                            <Link to="/admin/courses/create" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-terminal-plus" viewBox="0 0 16 16">
                                    <path d="M2 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v4a.5.5 0 0 1-1 0V4a1 1 0 0 0-1-1H2Z"/>
                                    <path d="M3.146 5.146a.5.5 0 0 1 .708 0L5.177 6.47a.75.75 0 0 1 0 1.06L3.854 8.854a.5.5 0 1 1-.708-.708L4.293 7 3.146 5.854a.5.5 0 0 1 0-.708ZM5.5 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5ZM16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                                <span className="ml-2">Create Course</span>
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-stroke px-5 pt-6 pb-2.5 sm:px-7.5 xl:pb-1">
                        <h4 className="mb-6 text-xl font-semibold text-black">
                            Course Management
                        </h4>
                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                <tr className="bg-gray-2 text-left">
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11">Course Name</th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black">Created By</th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black">Last Modified</th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black">Resources</th>
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black">Review Status</th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black">Review</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    isEmpty(courses) ?  (
                                        <tr>
                                            <td className="py-5 px-4 pl-9 xl:pl-11 text-center" colSpan="7">
                                                <h5 className="font-medium text-black">No feedbacks Yet</h5>
                                            </td>
                                        </tr>
                                    ) : courses.map((course) => (
                                        <tr key={course?.id}>
                                            <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                                                <div className="flex flex-row items-center gap-3">
                                                    <h5 className="font-medium text-black">{course?.course_name}</h5>
                                                </div>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                                                <h5 className="font-medium text-black">{course?.created_by}</h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4">
                                                <h5 className="font-medium text-sm text-black">{
                                                    new Date(course?.updated_at).toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })
                                                }</h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4">
                                                <a href={course?.resources} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center text-sm font-medium text-blue-700 border border-transparent hover:underline focus:outline-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                    </svg>
                                                    <span className="ml-2">Resources</span>
                                                </a>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4">
                                               <span className="inline-flex items-center justify-center px-2 py-1 text-xs capitalize leading-none text-black bg-gray-400 rounded-full">
                                                    <span className={`rounded-full w-2 h-2 mr-1 ${course?.review_status === 'pending' ? 'bg-yellow-500' : course?.review_status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`} /> {course?.review_status}
                                               </span>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4">
                                                <div className="flex flex-row items-center justify-between">
                                                    {[1, 2, 3, 4, 5].map((starValue) => (
                                                        <span
                                                            key={starValue}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                 className="bi bi-star" viewBox="0 0 16 16" fill={starValue <= course?.rating ? '#3C50E0' : 'currentColor'}>
                                                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                            </svg>
                                                        </span>
                                                    ))}
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
