import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import queryString from "query-string";
import axios from "axios";

function EditSubject() {
    const navigate = useNavigate();
    const location = useLocation();
    const [courseData, setCourseData] = useState([]);
    const [roomData, setRoomData] = useState([])
    const { subjectID } = queryString.parse(location.search);

    const [start_time, setStart_time] = useState('')
    const [end_time, setEnd_time] = useState('')
    const [day, setDay] = useState(null)
    const [room_number, setRoom_number] = useState('')

    useEffect(() => {
        (async function () {
            const res = await fetch(`http://localhost:4000/course/getCoursesformsum/${subjectID}`)
            const result = await res.json()
            setCourseData(result)

            const resroom = await fetch(`http://localhost:4000/room/getAllRoom`)
            const resultroom = await resroom.json()
            setRoomData(resultroom)
        })()



    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!start_time) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "กรุณาเลือกเวลาเริ่ม",
                showConfirmButton: false,
                timer: 1500
            });
            return
        } else if (!end_time) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "กรุณาเลือกเวลาสิ้นสุด",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }else if (!day) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "กรุณาเลือกวัน",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }else if (!room_number) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "กรุณาเลือกห้อง",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }
        try {
            await fetch('http://localhost:4000/course/editCourse', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    subject_id: subjectID,
                    start_time: start_time,
                    end_time: end_time,
                    Day: day,
                    room_number: room_number
                })
            })

        } catch (error) {
            console.error('Error updating data:', error);
        }
        Swal.fire({
            position: "center",
            icon: "success",
            title: "ลงทะเบียนรายวิชาสำเร็จ",
            showConfirmButton: false,
            timer: 1500
        });
        navigate("/SubjectTable")

    }
    // Navigate to FormTeacher page after all requests are done

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

    const timeOptionsStart = [];
    for (let hour = 8; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            timeOptionsStart.push(<option key={time} value={time}>{time}</option>);
        }
    }

    const timeOptionsStop = [];
    for (let hour = 8; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            timeOptionsStop.push(<option key={time} value={time}>{time}</option>);
        }
    }


    return (
        <div className="h-screen w-screen px-5 py-5">
            <div className="flex text-3xl font-bold">
                <p>แก้ไขข้อมูล</p>
            </div>
            {courseData.map((item) => (
                <form className="flex flex-row justify-center w-full" onSubmit={handleSubmit}>
                    <div className="  w-full m-5 p-10 flex flex-col">
                        <div className="font-semibold text-xl">รหัสวิชา</div>
                        <input className=" rounded-xl bg-from-color p-2 mb-5" value={item.subject_id} disabled></input>
                        <div className="font-semibold text-xl">ชื่อวิชาภาษาอังกฤษ</div>
                        <input className=" rounded-xl bg-from-color p-2 mb-5" value={item.subject_nameEN} disabled></input>
                        <div className="font-semibold text-xl">ชื่อวิชาภาษาไทย</div>
                        <input className=" rounded-xl bg-from-color p-2 mb-5" value={item.subject_nameTH} disabled></input>
                        <div className="flex flex-row w-full">
                            <div className="w-full">
                                <div className="font-semibold text-xl">หน่วยกิต</div>
                                <input className=" rounded-xl bg-from-color p-2 mb-5 mr-2" value={item.credit} disabled></input>
                            </div>
                            <div className="w-full">
                                <div className="font-semibold text-xl">ห้องเรียน</div>
                                <select className=" rounded-xl bg-from-color w-full p-2 mb-5" value={item.room_number} onChange={(event) => setRoom_number(event.target.value)}>
                                    {roomData.map((room, index) => (
                                        <option key={index} value={room.room_number} data-seat={room.room_seat}>
                                            {`${room.room_number} (${room.room_seat})`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="font-semibold text-xl">สาขา</div>
                        <input disabled className=" rounded-xl bg-from-color p-2 mb-5" value={item.major_year}></input>

                    </div>
                    <div className="  w-full m-5 p-10 ">
                        <div className="bg-from-color rounded-lg p-3 flex flex-row">
                            <div>
                                <div className="font-semibold text-xl">ประเภท</div>
                                <input className=" rounded-lg p-1 m-1" disabled type="text" value={item.type === '1'
                                    ? "วิชาแกน"
                                    : item.type === '2'
                                        ? "วิชาเฉพาะ"
                                        : item.type === '3' ? "วิชาเลือก" : ""}></input>
                            </div>
                            <div>
                                <div className="font-semibold text-xl">หมู่เรียน</div>
                                <input className=" rounded-lg p-1 m-1" disabled type="text" value={item.section}></input>
                            </div>
                            <div>
                                <div className="font-semibold text-xl">จำนวนที่นั่ง</div>
                                <input className=" rounded-lg p-1 m-1" disabled type="text" value={item.room_seat}></input>
                            </div>
                        </div>
                        <div className="bg-from-color rounded-lg p-3 py-3 my-6">
                            <div>
                                <div className="font-semibold text-xl">วัน</div>
                                <select className="rounded-lg px-2 text-sm py-1.5 my-2 w-full" onChange={(event) => setDay(event.target.value)}>
                                    <option value={item.Day}>{renderDay(item.Day)}</option>
                                    <option value={1}>วันอาทิตย์</option>
                                    <option value={2}>วันจันทร์</option>
                                    <option value={3}>วันอังคาร</option>
                                    <option value={4}>วันพุธ</option>
                                    <option value={5}>วันพฤหัสบดี</option>
                                    <option value={6}>วันศุกร์</option>
                                    <option value={7}>วันเสาร์</option>
                                </select>
                            </div>
                            <div className="flex flex-row ">
                                <div className="w-full mr-2" >
                                    <div className="font-semibold text-xl">เวลาเริ่มต้น</div>
                                    <select className="rounded-lg px-2 text-sm py-1.5 my-2 w-full" onChange={(event) => setStart_time(event.target.value)}>
                                        <option value={item.start_time}>{item.start_time}</option>
                                        {timeOptionsStart}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <div className="font-semibold text-xl">เวลาสิ้นสุด</div>

                                    <select className="rounded-lg px-2 text-sm py-1.5 my-2 w-full" onChange={(event) => setEnd_time(event.target.value)}>
                                        <option value={item.end_time}>{item.end_time}</option>
                                        {timeOptionsStop}
                                    </select>
                                </div>
                            </div>


                        </div>
                        <button className="p-3 w-40 text-xl bg-yes-color text-white rounded-lg font-semibold mx-3" type="submit">
                            ตกลง
                        </button>
                        <Link to={"/SubjectTable"}>
                            <button className="p-3 w-40 text-xl bg-no-color text-white rounded-lg font-semibold mx-3">
                                ยกเลิก
                            </button>
                        </Link>
                    </div>

                </form>


            ))}

        </div>
    )

}

export default EditSubject;