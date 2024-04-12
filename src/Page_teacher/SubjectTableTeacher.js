import '../Page_admin/SubjectTable/SubjectTable.css'
import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from 'react-to-print';

import { Link } from "react-router-dom";

function SubjectTableTeacher() {
    const componentPDF = useRef();
    const [courseData, setCourseData] = useState([]);
    const [selectedError, setSelectedError] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedLecturer, setSelectedLecturer] = useState("");
    const [selectedMajorYear, setSelectedMajorYear] = useState("");
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
    }, [courseData]);

    const getClassname = (item) => {
        const duplicatesByTeacher = courseData.filter(
            course =>
                course.Day === item.Day &&
                course.subject_id !== item.subject_id &&
                (
                    (course.start_time >= item.start_time && course.start_time < item.end_time) ||
                    (course.end_time > item.start_time && course.end_time <= item.end_time) ||
                    (course.start_time <= item.start_time && course.end_time >= item.end_time)
                ) &&
                course.lecturer === item.lecturer

        ).length > 0;


        const duplicatesByRoom = courseData.filter(
            course =>
                course.Day === item.Day &&
                course.subject_id !== item.subject_id &&
                (
                    (course.start_time >= item.start_time && course.start_time < item.end_time) ||
                    (course.end_time > item.start_time && course.end_time <= item.end_time) ||
                    (course.start_time <= item.start_time && course.end_time >= item.end_time)
                ) &&
                course.room_number === item.room_number
        ).length > 0;

        const duplicatesBySubjectType = courseData.filter(
            course =>
                course.Day === item.Day &&
                course.subject_id !== item.subject_id &&
                (
                    (course.start_time >= item.start_time && course.start_time < item.end_time) ||
                    (course.end_time > item.start_time && course.end_time <= item.end_time) ||
                    (course.start_time <= item.start_time && course.end_time >= item.end_time)
                ) &&
                (item.type === "1" || item.type === "2") && // Ensure item.type is either "1" or "2"
                (course.type === "1" || course.type === "2")

        ).length > 0;

        const duplicatesSubjecybyTeacher = courseData.filter(
            course =>
                course.Day === item.Day &&
                course.subject_id === item.subject_id &&
                (
                    (course.start_time >= item.start_time && course.start_time < item.end_time) ||
                    (course.end_time > item.start_time && course.end_time <= item.end_time) ||
                    (course.start_time <= item.start_time && course.end_time >= item.end_time)
                ) &&
                course.lecturer === item.lecturer
        ).length > 1;

        const duplicatesSubjecybyRoom = courseData.filter(
            course =>
                course.Day === item.Day &&
                course.subject_id === item.subject_id &&
                (
                    (course.start_time >= item.start_time && course.start_time < item.end_time) ||
                    (course.end_time > item.start_time && course.end_time <= item.end_time) ||
                    (course.start_time <= item.start_time && course.end_time >= item.end_time)
                ) &&
                course.room_number === item.room_number
        ).length > 1;

        const duplicatesSubjecybyRoomandTeacher = courseData.filter(
            course =>
                course.Day === item.Day &&
                course.subject_id === item.subject_id &&
                (
                    (course.start_time >= item.start_time && course.start_time < item.end_time) ||
                    (course.end_time > item.start_time && course.end_time <= item.end_time) ||
                    (course.start_time <= item.start_time && course.end_time >= item.end_time)
                ) &&
                course.room_number === item.room_number &&
                course.lecturer === item.lecturer

        ).length > 1;

        const duplicatesSec = courseData.filter(
            course =>

                course.subject_id === item.subject_id &&

                course.section === item.section
        ).length > 1;

        if (duplicatesSubjecybyRoomandTeacher || duplicatesSubjecybyTeacher || duplicatesSubjecybyRoom) {
            return "text-red-600";
        }

        else if (duplicatesSec) {
            return "text-blue-600";
        }


        else if (duplicatesByTeacher) {
            return "text-orange-600";
        }

        else if (duplicatesByRoom) {
            return "text-green-600";
        }

        else if (duplicatesBySubjectType) {
            return "text-yellow-600";
        }

        return "";
    };

    const gettableClassname = (item) => {
        const duplicatesByTeacher = courseData.filter(
            course =>
                course.Day === item.Day &&
                course.subject_id !== item.subject_id &&
                (
                    (course.start_time >= item.start_time && course.start_time < item.end_time) ||
                    (course.end_time > item.start_time && course.end_time <= item.end_time) ||
                    (course.start_time <= item.start_time && course.end_time >= item.end_time)
                ) &&
                course.lecturer === item.lecturer

        ).length > 0;

        const duplicatesByRoom = courseData.filter(
            course =>
                course.Day === item.Day &&
                course.subject_id !== item.subject_id &&
                (
                    (course.start_time >= item.start_time && course.start_time < item.end_time) ||
                    (course.end_time > item.start_time && course.end_time <= item.end_time) ||
                    (course.start_time <= item.start_time && course.end_time >= item.end_time)
                ) &&
                course.room_number === item.room_number
        ).length > 0;

        const duplicatesBySubjectType = courseData.filter(
            course =>
                course.Day === item.Day &&
                course.subject_id !== item.subject_id &&
                (
                    (course.start_time >= item.start_time && course.start_time < item.end_time) ||
                    (course.end_time > item.start_time && course.end_time <= item.end_time) ||
                    (course.start_time <= item.start_time && course.end_time >= item.end_time)
                ) &&
                (item.type === "1" || item.type === "2") && // Ensure item.type is either "1" or "2"
                (course.type === "1" || course.type === "2")
        ).length > 0;


        const duplicatesSubjecybyTeacher = courseData.filter(
            course =>
                course.Day === item.Day &&
                course.subject_id === item.subject_id &&
                (
                    (course.start_time >= item.start_time && course.start_time < item.end_time) ||
                    (course.end_time > item.start_time && course.end_time <= item.end_time) ||
                    (course.start_time <= item.start_time && course.end_time >= item.end_time)
                ) &&
                course.lecturer === item.lecturer
        ).length > 1;


        const duplicatesSubjecybyRoom = courseData.filter(
            course =>
                course.Day === item.Day &&
                course.subject_id === item.subject_id &&
                (
                    (course.start_time >= item.start_time && course.start_time < item.end_time) ||
                    (course.end_time > item.start_time && course.end_time <= item.end_time) ||
                    (course.start_time <= item.start_time && course.end_time >= item.end_time)
                ) &&
                course.room_number === item.room_number
        ).length > 1;


        const duplicatesSubjecybyRoomandTeacher = courseData.filter(
            course =>
                course.Day === item.Day &&
                course.subject_id === item.subject_id &&
                (
                    (course.start_time >= item.start_time && course.start_time < item.end_time) ||
                    (course.end_time > item.start_time && course.end_time <= item.end_time) ||
                    (course.start_time <= item.start_time && course.end_time >= item.end_time)
                ) &&
                course.lecturer === item.lecturer &&
                course.room_number === item.room_number
        ).length > 1;

        const duplicatesSec = courseData.filter(
            course =>
                course.subject_id === item.subject_id &&
                course.section === item.section
        ).length > 1;

        /* if (duplicatesByTeacher || duplicatesByRoom || duplicatesBySubjectType) {
            return "bg-red-600";
        } */
        if (duplicatesSubjecybyRoomandTeacher || duplicatesSubjecybyTeacher || duplicatesSubjecybyRoom) {
            return "bg-red-600";
        }

        else if (duplicatesByTeacher) {
            return "bg-orange-600";
        }

        else if (duplicatesSec) {
            return "bg-blue-600";
        }

        else if (duplicatesByRoom) {
            return "bg-green-600";
        }

        else if (duplicatesBySubjectType) {
            return "bg-yellow-600";
        }

        return "";
    };


    const renderDay = (day) => {
        switch (day) {
            case 1:
                return "วันอาทิตย์";
            case 2:
                return "วันจันทร์";
            case 3:
                return "วันอังคาร";
            case 4:
                return "วันพุธ";
            case 5:
                return "วันพฤหัสบดี";
            case 6:
                return "วันศุกร์";
            case 7:
                return "วันเสาร์";
            default:
                return "ไม่พบวันที่";
        }
    };

    const renderTime = (time) => {
        // You can format the time here as needed
        return time;
    };

    const renderSubjectType = (type) => {
        return type === "1" ? "วิชาแกน" : type === "2" ? "วิชาเฉพาะบังคับ" : "วิชาเลือก";
    };

    return (
        <div className='px-5 py-5 bg-white' ref={componentPDF}>
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
                            <select
                                className="rounded-full px-2 text-sm py-1.5 w-full bg-gray-200"
                                name="major_year"
                                id="major_year"
                                onChange={(e) => setSelectedMajorYear(e.target.value)}
                                value={selectedMajorYear}
                            >
                                <option value="">ทั้งหมด</option>
                                {Array.from(new Set(courseData.flatMap(item => item.major_year.split(',')))).map((major_year, index) => (
                                    <option key={index} value={major_year.trim()}>{major_year.trim()}</option>
                                ))}
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
                        {[1, 2, 3, 4, 5, 6, 7].map(day => (
                            <tr key={day}>
                                <td>
                                    {day === 1 ? "วันอาทิตย์" :
                                        day === 2 ? "วันจันทร์" :
                                            day === 3 ? "วันอังคาร" :
                                                day === 4 ? "วันพุธ" :
                                                    day === 5 ? "วันพฤหัสบดี" :
                                                        day === 6 ? "วันศุกร์" :
                                                            day === 7 ? "วันเสาร์" :
                                                                "ไม่พบวันที่"}
                                </td>
                                {[...Array(30)].map((_, index) => {
                                    const startTime = index * 0.5 + 7; // Calculate start time
                                    const endTime = startTime + 0.25; // Calculate end time
                                    const subjects = courseData.filter(item =>
                                        item.Day === day &&
                                        item.start_time <= startTime &&
                                        item.end_time >= endTime &&
                                        (selectedRoom === "" || item.room_number.includes(selectedRoom.split(" (")[0])) &&
                                        (selectedLecturer === "" || item.lecturer === selectedLecturer) &&
                                        (selectedSubjectType === "" || item.type === selectedSubjectType) &&
                                        (selectedMajorYear === "" || item.major_year.includes(selectedMajorYear)) &&
                                        (selectedError === "" || selectedError === item.subject_id || (gettableClassname(item) === "bg-red-600" || gettableClassname(item) === "bg-orange-600" || gettableClassname(item) === "bg-yellow-600" || gettableClassname(item) === "bg-white-600" || gettableClassname(item) === "bg-blue-600" || gettableClassname(item) === "bg-green-600" || gettableClassname(item) === "bg-blue-600")))
                                    return (
                                        <td key={index}>
                                            {subjects.map(subject => (
                                                <Link to={`/EditSubject?subjectID=${subject.id}`} key={subject.subject_id}>
                                                    <button style={{ width: "100%" }} className={gettableClassname(subject)}>
                                                        {subject.subject_id}-{subject.school_year.slice(2, 4)}
                                                        <br />
                                                        {subject.subject_nameEN}
                                                    </button>
                                                </Link>
                                            ))}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <div className='flex justify-between'>
                <div class="grid grid-cols-6 gap-6 font-semibold">
                    <div>หมายเหตุข้อผิดพลาด</div>
                    <div className='text-red-600'>*สีแดง คือ วิชา</div>
                    <div className='text-orange-600'>*สีส้ม คือ อาจารย์</div>

                    <div className='text-green-600'>*สีเขียว คือ ห้อง</div>
                    <div className='text-yellow-600'>*สีเหลือง คือ ประเภท</div>

                    <div className='text-blue-600'>*สีน้ำเงิน คือ เซค</div>
                </div>

            </div>

            <div className='flex'>
                <table>
                    <thead>
                        <tr>
                            <th>วัน</th>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา</th>
                            <th>หน่วยกิต</th>
                            <th>ประเภท</th>
                            <th>หมู่เรียน</th>
                            <th>เวลาเริ่ม</th><th>เวลาสิ้นสุด</th>
                            <th>ห้อง</th>
                            <th>จำนวน</th>
                            <th>ชื่ออาจารย์</th>
                            <th>หมวด</th>
                            <th>ชั้นปี</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseData
                            .filter(item =>
                                (selectedRoom === "" || item.room_number.includes(selectedRoom.split(" (")[0])) &&
                                (selectedLecturer === "" || item.lecturer === selectedLecturer) &&
                                (selectedSubjectType === "" || item.type === selectedSubjectType) &&
                                (selectedMajorYear === "" || item.major_year.includes(selectedMajorYear)) &&
                                (selectedError === "" || (gettableClassname(item) === "bg-red-600" || gettableClassname(item) === "bg-orange-600" || gettableClassname(item) === "bg-yellow-600" || gettableClassname(item) === "bg-green-600" || gettableClassname(item) === "bg-blue-600"))

                            )
                            .map((item) => (
                                <tr key={item.subject_id} className={getClassname(item)}>
                                    <td>{renderDay(item.Day)}</td>
                                    <td>{item.subject_id}-{item.school_year.slice(2, 4)}</td>
                                    <td>{item.subject_nameEN}</td>
                                    <td>{item.credit}</td>
                                    <td>
                                        {item.group === 1
                                            ? "บรรยาย"
                                            : item.group === 2
                                                ? "ปฎิบัติ"
                                                : ""}
                                    </td>
                                    <td>{item.section}</td>
                                    <td>{renderTime(item.start_time)}</td>
                                    <td>{renderTime(item.end_time)}</td>
                                    <td>{item.room_number}</td>
                                    <td>{item.student_count}</td>
                                    <td>{item.lecturer}</td>
                                    <td>{renderSubjectType(item.type)}</td>
                                    <td>{item.major_year}</td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default SubjectTableTeacher;