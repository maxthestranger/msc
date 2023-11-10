import DashboardLayout from '../../layouts/DashboardLayout';
import RoleGraph from "../../components/roleGraph";
import CourseChart from "../../components/courseChart.jsx";
import ProgramChart from "../../components/programChart.jsx";

export default function Reports() {
    return (
        <DashboardLayout>
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
                        <div className="flex items-center justify-center">
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
                        <div className="flex items-center justify-center">
                            <CourseChart />
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
                    <div className="flex items-center justify-center">
                        <ProgramChart />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
