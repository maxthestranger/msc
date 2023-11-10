import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
} from "recharts";


const data = [
    {
        subject: "Course1",
        A: 120,
        B: 110,
        fullMark: 150
    },
    {
        subject: "Course2",
        A: 98,
        B: 130,
        fullMark: 150
    },
    {
        subject: "Course3",
        A: 86,
        B: 130,
        fullMark: 150
    },
    {
        subject: "Course4",
        A: 99,
        B: 100,
        fullMark: 150
    },
    {
        subject: "Course5",
        A: 85,
        B: 90,
        fullMark: 150
    },
    {
        subject: "Course6",
        A: 65,
        B: 85,
        fullMark: 150
    }
];


export default function CourseChart() {
    return (
        <RadarChart
            cx={150}
            cy={125}
            outerRadius={75}
            width={250}
            height={250}
            data={data}
        >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
                name="Mike"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
            />
        </RadarChart>
    )
}