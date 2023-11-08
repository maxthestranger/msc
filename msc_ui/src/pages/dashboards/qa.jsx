import DashboardLayout from '../../layouts/DashboardLayout';
import RoleGraph from "../../components/roleGraph";

export default function QaDashboard() {
    return (
        <DashboardLayout>
            <div
                className="col-span-12 bg-white overflow-hidden shadow-sm sm:rounded-lg p-7.5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
                    <div
                        className="flex items-center justify-between border-b border-stroke pb-5 xl:border-b-0 xl:border-r xl:pb-0">
                        <div>
                            <img src="/images/courses.png" width="100" alt="courses" />
                        </div>
                        <div className="mr-7.5">
                            <h4
                                className="mb-0.5 text-xl font-semibold text-black md:text-title-lg">
                                {
                                    300
                                }
                            </h4>
                            <p className="text-base font-medium">Available Courses</p>
                        </div>
                    </div>
                    <div
                        className="flex items-center justify-between border-b border-stroke pb-5 xl:border-b-0 xl:border-r xl:pb-0">
                        <div className="ml-7.5">
                            <img src="/images/exams.png" width="100" alt="courses" />
                        </div>
                        <div className="mr-7.5">
                            <h4
                                className="mb-0.5 text-xl font-semibold text-black md:text-title-lg">
                                {
                                    300
                                }
                            </h4>
                            <p className="text-base font-medium">Assessments</p>
                        </div>
                    </div>
                    <div
                        className="flex items-center justify-between border-b border-stroke pb-5 xl:border-b-0 xl:border-r xl:pb-0">
                        <div className="ml-7.5">
                            <img src="/images/users.png" width="100" alt="courses" />
                        </div>
                        <div className="mr-7.5">
                            <h4
                                className="mb-0.5 text-xl font-semibold text-black md:text-title-lg">
                                {
                                    300
                                }
                            </h4>
                            <p className="text-base font-medium">Users</p>
                        </div>
                    </div>
                    <div
                        className="flex items-center justify-between border-b border-stroke pb-5 xl:border-b-0 xl:pb-0">
                        <div className="ml-7.5">
                            <img src="/images/apply.png" width="100" height="100" alt="courses" />
                        </div>
                        <div className="mr-7.5">
                            <h4
                                className="mb-0.5 text-xl font-semibold text-black md:text-title-lg">
                                {
                                    300
                                }
                            </h4>
                            <p className="text-base font-medium">Enrollments</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div
                    className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-8 w-2/5">
                    <div className="p-4 md:p-6 xl:p-7.5">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-title-sm2 font-bold text-black">Role Distribution</h2>
                            </div>
                        </div>
                    </div>


                    <div className="p-4 md:p-6 xl:p-7.5">
                        <div className="flex flex-col gap-7">
                            <RoleGraph />
                        </div>
                    </div>
                </div>

                <div
                    className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-8 w-3/5">
                    <div className="p-4 md:p-6 xl:p-7.5">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-title-sm2 font-bold text-black">Course Enrollment</h2>
                            </div>
                        </div>
                    </div>


                    <div className="p-4 md:p-6 xl:p-7.5">
                        <div className="flex flex-col gap-7">

                        </div>
                    </div>
                </div>
            </div>

            <div
                className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-8">
                <div className="p-4 md:p-6 xl:p-7.5">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-title-sm2 font-bold text-black">Program Enrollment</h2>
                        </div>
                    </div>
                </div>


                <div className="p-4 md:p-6 xl:p-7.5">
                    <div className="flex flex-col gap-7">

                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
