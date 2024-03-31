import './SubjectTable.css'
import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from 'react-to-print';

function SubjectTable() {
    const componentPDF = useRef();
    const [courseData, setCourseData] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedLecturer, setSelectedLecturer] = useState("");
    const [selectedSubjectType, setSelectedSubjectType] = useState("");
    const fetchSubjects = async () => {
        try {
            const res = await fetch('http://localhost:4000/course/getAllCoursesformsum');
            const data = await res.json();
            setCourseData(data);
        } catch (error) {
            console.error("Error fetching room data:", error);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, [setCourseData]);

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "ตารางสอน",
        onAfterPrint: () => alert("Data saved in PDF")
    });


    return (
        <div className='mx-5 my-5 ' ref={componentPDF}>
            <div className="flex text-3xl font-bold">
                <p>ตารางสอน</p>
            </div>
            <div className="checkbox-group pt-6">
                <div className='flex justify-items-stretch '>
                    <label className='pr-4'>
                        <input type="radio" name="subjectType" value="" onChange={() => setSelectedSubjectType("")} />
                        ทั้งหมด
                    </label>
                    <label className='pr-4'>
                        <input type="radio" name="subjectType" value="3" onChange={() => setSelectedSubjectType("3")} />
                        วิชาเลือก
                    </label>
                    <label className='pr-4'>
                        <input type="radio" name="subjectType" value="2" onChange={() => setSelectedSubjectType("2")} />
                        วิชาเฉพาะบังคับ
                    </label>
                    <label className='pr-4'>
                        <input type="radio" name="subjectType" value="1" onChange={() => setSelectedSubjectType("1")} />
                        วิชาแกน
                    </label>
                </div>
            </div>
            <div className="group-uidropdown font-medium">
                <div className="group-dropdown">
                    <div className="w-full px-2">
                        <div>อาจารย์</div>
                        <div>
                            <select
                                className="rounded-full px-2 text-sm py-1.5 w-full bg-gray-200"
                                name="lecturer"
                                id="lecturer"
                                onChange={(e) => setSelectedLecturer(e.target.value)}
                                value={selectedLecturer}
                            >
                                <option value="">ทั้งหมด</option>
                                {Array.from(new Set(courseData.map(item => item.lecturer))).map((teacher, index) => (
                                    <option key={index} value={teacher}>{teacher}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-full px-2">
                        <div>ชั้นปี</div>
                        <div>
                            <select className="rounded-full px-2  text-sm py-1.5 w-full bg-gray-200" name="year" id="year">
                                <option value="">ทั้งหมด</option>

                                <option value="2560">1</option>
                                <option value="2565">2</option>
                                <option value="2570">3</option>
                                <option value="2570">4</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full px-2">
                        <div>ห้อง</div>
                        <div>
                            <select
                                className="rounded-full px-2 text-sm py-1.5 w-full bg-gray-200"
                                name="room"
                                id="room"
                                onChange={(e) => setSelectedRoom(e.target.value)}
                                value={selectedRoom}
                            >
                                <option value="">ทั้งหมด</option>
                                {Array.from(new Set(courseData.map(item => `${item.room_number} (${item.room_seat})`))).map((roomWithCount, index) => (
                                    <option key={index} value={roomWithCount}>{roomWithCount}</option>
                                ))}
                            </select>

                        </div>
                    </div>

                </div>
                <div className=" w-1/4 px-2">
                    <div>
                        ข้อผิดพลาด
                    </div>
                    <select className="rounded-full px-2  text-sm py-1.5 w-full bg-gray-200" name="year" id="year">
                        <option value="">All</option>
                        <option value="2560">Abstract Data Types and Problem Solving</option>
                        <option value="2565">Algorithm Design and Analysis</option>
                    </select>
                </div>
            </div>
            <div className='flex'>
                <table>
                    <thead>
                        <tr>
                            <th>วัน/เวลา</th>
                            <th>7:00-7:30</th>
                            <th>7:30-8:00</th>
                            <th>8:00-8:30</th>
                            <th>8:30-9:00</th>
                            <th>9:00-9:30</th>
                            <th>9:30-10:00</th>
                            <th>10:00-10:30</th>
                            <th>10:30-11:00</th>
                            <th>11:00-11:30</th>
                            <th>11:30-12:00</th>
                            <th>12:00-12:30</th>
                            <th>12:30-13:00</th>
                            <th>13:00-13:30</th>
                            <th>13:30-14:00</th>
                            <th>14:00-14:30</th>
                            <th>14:30-15:00</th>
                            <th>15:00-15:30</th>
                            <th>15:30-16:00</th>
                            <th>16:00-16:30</th>
                            <th>16:30-17:00</th>
                            <th>17:00-17:30</th>
                            <th>17:30-18:00</th>
                            <th>18:00-18:30</th>
                            <th>18:30-19:00</th>
                            <th>19:00-19:30</th>
                            <th>19:30-20:00</th>
                            <th>20:00-20:30</th>
                            <th>20:30-21:00</th>
                            <th>21:00-21:30</th>
                            <th>21:30-22:00</th>
                        </tr>
                    </thead>
                    <tbody>
                        {['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสดี', 'วันศุกร์', 'วันเสาร์'].map((day, index) => (
                            <tr key={index}>
                                <td>{day}</td>
                                {Array.from({ length: 30 }, (_, i) => i + 7).map((hour, hourIndex) => (
                                    <td key={hourIndex}>
                                        {courseData
                                            .filter(item =>
                                                item.Day === index + 1 && // Day index starts from 1
                                                item.start_time <= `${hour}:00` && // Check start time
                                                item.end_time >= `${hour}:30` // Check end time
                                            )
                                            .map((subject, subjectIndex) => (
                                                <div key={subjectIndex}>
                                                    {subject.subject_nameEN}
                                                    {/* You can include other subject information here */}
                                                </div>
                                            ))}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <div className='flex justify-between'>
                <div className='text-orange-700 font-semibold pt-2'>
                    หมายเหตุสีแดง คือรายวิชาที่มีการซ้อนทับ
                </div>
                <button className="bg-rose-color font-semibold text-white mt-2 p-1 rounded-full w-1/6 hover:bg-red-900 active:bg-neutral-800 shadow-md"
                    onClick={generatePDF}>
                    ส่งออก
                </button>
            </div>

            <div className='flex'>
                <table>
                    <thead>
                        <tr>
                            <th>วัน</th>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา</th>
                            <th>หน่วยกิต</th>
                            <th>บรรยาย</th>
                            <th>ปฏิบัติ</th>
                            <th>เวลาเริ่ม</th><th>เวลาสิ้นสุด</th>
                            <th>ห้อง</th>
                            <th>จำนวน</th>
                            <th>ชื่ออาจารย์</th>
                            <th>ประเภท</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseData
                            .filter(item =>
                                (selectedRoom === "" || item.room_number.includes(selectedRoom.split(" (")[0])) &&
                                (selectedLecturer === "" || item.lecturer === selectedLecturer) &&
                                (selectedSubjectType === "" || item.type === selectedSubjectType)
                            )
                            .map((item) => (
                                <tr key={item.subject_id}>
                                    <td>{
                                        item.Day === 1
                                            ? "วันอาทิตย์"
                                            : item.Day === 2
                                                ? "วันจันทร์"
                                                : item.Day === 3
                                                    ? "วันอังคาร"
                                                    : item.Day === 4
                                                        ? "วันพุธ"
                                                        : item.Day === 5
                                                            ? "วันพฤหัสบดี"
                                                            : item.Day === 6
                                                                ? "วันศุกร์"
                                                                : item.Day === 7
                                                                    ? "วันเสาร์"
                                                                    : "ไม่พบวันที่"
                                    }</td>
                                    <td>
                                        {item.subject_id}-{item.school_year.slice(2, 4)}
                                    </td>
                                    <td>{item.subject_nameEN}</td>
                                    <td>{item.credit}</td>
                                    <td>{
                                        item.groups === 1
                                            ? "บรรยาย"
                                            : ""
                                    }</td>
                                    <td>{
                                        item.groups === 2
                                            ? "ปฎิบัติ"
                                            : ""
                                    }</td>
                                    <td>{item.start_time}</td>
                                    <td>{item.end_time}</td>
                                    <td>{item.room_number}</td>
                                    <td>{item.student_count}</td>
                                    <td>{item.lecturer}</td>
                                    <td>{item.type === "1"
                                        ? "วิชาแกน"
                                        : item.type === "2"
                                            ? "วิชาเฉพาะบังคับ"
                                            : "วิชาเลือก"}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SubjectTable;