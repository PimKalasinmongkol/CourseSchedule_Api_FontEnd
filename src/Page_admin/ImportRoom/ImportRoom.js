import React, { useState, useEffect } from "react";
import * as XLXS from 'xlsx';
import axios from "axios";
import Swal from 'sweetalert2';


function ImportRoom() {
    const [data, setData] = useState([])
    const [room_number, setRoom_number] = useState("");
    const [room_seat, setRoom_seat] = useState(0);
    const [courseData, setCourseData] = useState([]);
    const [filteredCourseData, setFilteredCourseData] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [selectedItems_delete, setSelectedItems_delete] = useState({});
    const [buttonText_delete, setButtonText_delete] = useState("เลือกทั้งหมด")


    ///////////////////delete/////////////////
    const handleCheckboxChange_delete = (id) => {
        setSelectedItems_delete({
            ...selectedItems_delete,
            [id]: !selectedItems_delete[id]
        });
    };

    const handleCheckboxChange_delete_unChecked = (id) => {
        const updatedItems = { ...selectedItems_delete };
        delete updatedItems[id];
        setSelectedItems_delete(updatedItems);
    };

    const handleCheckAll_delete = () => {
        const allSelected_delete = {};
        const allSelected = Object.values(selectedItems_delete).every(value => value);

        filteredCourseData.forEach(item => {
            allSelected_delete[item.room_id] = !allSelected;
        });

        setSelectedItems_delete(allSelected_delete);

        if (allSelected) {
            setButtonText_delete("เลือกทั้งหมด");
        } else {
            setButtonText_delete("ยกเลิกทั้งหมด");
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const shouldDelete = await Swal.fire({
                title: 'ยืนยันการลบห้อง',
                text: 'คุณต้องการลบห้องเรียนในระบบหรือไม่?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก'

            });

            if (shouldDelete.isConfirmed) {
                await Promise.all(
                    Object.entries(selectedItems_delete)
                        .filter(([key, value]) => value)
                        .map(async ([key, value]) => {
                            const response = await fetch(`http://localhost:4000/room/deleteRoom/${key}`, {
                                method: "GET",
                                headers: { "Content-Type": "application/json" },
                            });
                            if (!response.ok) {
                                throw new Error(`Failed to delete item with ID: ${key}`);
                            }
                        })
                );
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "ลบห้องเรียนสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500
                });
                fetchRooms();
            }
        } catch (error) {
            console.error("Error deleting selected items:", error);
            Swal.fire('Error', 'Failed to delete selected items', 'error');
        }
    };


    async function handleImportroom(event) {
        if (!room_number || !room_seat) {
            event.preventDefault();
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: "กรุณากรอกข้อมูลให้ครบ",
              confirmButtonColor: "rgb(227, 1, 55)",
              confirmButtonText:"ตกลง"
            }); 
            return
          } 
        try {
            await fetch("http://localhost:4000/room/importRoom", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    room_number: room_number,
                    room_seat: room_seat,
                }),
            });
            fetchRooms();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "เพิ่มห้องเรียนสำเร็จ",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (e) {
            console.error(e);
            Swal.fire('Error', 'Failed to delete selected items', 'error');
        }
    }

    const fetchRooms = async () => {
        try {
            const res = await fetch('http://localhost:4000/room/getAllRoom');
            const data = await res.json();
            setCourseData(data);
        } catch (error) {
            console.error("Error fetching room data:", error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);


    const handleUplodefile = async (e) => {
        e.preventDefault();
        if (data.length === 0) {
            // Show SweetAlert2 alert for missing file
            Swal.fire({
                title: "กรุณาเลือกไฟล์",
                text: "โปรดเลือกไฟล์ Excel ที่ต้องการอัพโหลด",
                icon: "warning",
                confirmButtonColor: "rgb(227, 1, 55)",
                confirmButtonText:"ตกลง"
            });
            return; // Prevent further execution
        }
        const formData = data.map(item => ({
            ...item,
        }));
        console.log(formData)
        formData.map(async (item) => {
            try {
                const response = await axios.post('http://localhost:4000/room/importFromExcelroom', item);
                console.log(response.data);
                fetchRooms();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "อัพโหลดไฟล์ห้องเรียนสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                console.error(error);
            }
        })
    };


    const handleFileUpload = (e) => {
        setData([]);
        const reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
    
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLXS.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLXS.utils.sheet_to_json(sheet);
    
            const columnNames = Object.keys(parsedData[0]);
            if (columnNames.length !== 2 || !columnNames.includes("room_number") || !columnNames.includes("room_seat")) {
                Swal.fire({
                    title: "รูปแบบไฟล์ไม่ถูกต้อง",
                    text: "กรุณาตรวจสอบไฟล์ Excel ว่ามีหน้าชีทมีคอลัมน์ room_number และ room_seat อย่างละ 1 คอลัมน์",
                    icon: "error",
                    confirmButtonColor: "rgb(227, 1, 55)",
                });
                return; 
            }
            setData(parsedData);
        };
    };
    

    useEffect(() => {
        const filteredData = courseData.filter(item => {
            if (item.room_number !== null && item.room_number !== undefined) {
                return (
                    item.room_seat.toString().toLowerCase().includes(filterValue.toLowerCase()) ||
                    item.room_number.toString().toLowerCase().includes(filterValue.toLowerCase())
                );
            } else {
                return false;
            }
        });

        setFilteredCourseData(filteredData);
    }, [filterValue, courseData]);


    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    return (
        <div className="px-5 py-5 w-full bg-white">
            <div className="flex text-3xl font-bold">
                <p>นำเข้าห้องเรียน</p>
            </div>
            <div className="flex flex-row justify-between pt-5 h-90">
                {/* Add Course Form */}
                <form className="bg-from-color p-2 m-2 w-3/5 rounded-lg h-90 text-base"
                    onSubmit={handleUplodefile}>
                    {/* File Input for Course */}
                    <div className="flex flex-col justify-center ">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex items-center justify-between w-full bg-white rounded-full  p-1.5 m-1.5">
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileUpload}
                                    className="rounded-full pl-1 text-sm py-1.5 w-3/4"
                                    placeholder="ไฟล์หลักสูตรปีการศึกษา" />
                            </div>
                        </div>
                    </div>
                    <form className="bg-white flex m-2 p-2 rounded h-72">
                        {data.length > 0 && (
                            <table className="table-auto">
                                <thead>
                                    <tr>
                                        {Object.keys(data[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index}>
                                            {Object.values(row).map((value, index) => (
                                                <td key={index}>{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                    </form>
                    <div className="flex justify-end pt-2 pr-3">
                        <button className="bg-rose-color font-semibold text-white m-1 p-1 rounded-full w-1/4 hover:bg-red-900 active:bg-neutral-800">
                            อัพโหลด
                        </button>
                    </div>
                </form>
                {/* Add Room Form */}
                <form
                    className="bg-from-color p-2 m-2 w-2/5 rounded-lg h-90 justify-center"
                    onSubmit={handleImportroom}>
                    {/* Header */}
                    <div className="flex justify-center text-lg font-semibold pt-2">
                        <p>เพิ่มห้องเรียน</p>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex flex-col justify-center text-base pt-2 w-9/12">
                            {/* Room Number Input */}
                            <div className="flex flex-row justify-between  w-full items-center py-2">
                                <label htmlFor="name">
                                    <p className="pr-1">เลขห้องเรียน</p>
                                </label>
                                <input
                                    type="text"
                                    className="rounded-full p-3 text-sm py-1.5 w-3/5  "
                                    placeholder="เลขห้อง"
                                    onChange={(event) => setRoom_number(event.target.value)}
                                />
                            </div>
                            {/* Number of Students Input */}
                            <div className="flex flex-row justify-between  w-full items-center py-2">
                                <label htmlFor="name">
                                    <p className="pr-1">จำนวนนิสิตที่รับ</p>
                                </label>
                                <input
                                    type="int"
                                    className="rounded-full p-3 text-sm py-1.5 w-3/5  "
                                    placeholder="จำนวนคน"
                                    onChange={(event) => setRoom_seat(parseInt(event.target.value))}
                                />

                            </div>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-end pt-2 pr-3">
                        <button
                            className="bg-rose-color font-semibold text-white m-1 p-1 rounded-full w-1/4 hover:bg-red-900 active:bg-neutral-800"
                            type="submit"
                        >
                            เพิ่ม
                        </button>
                    </div>
                </form>
            </div>
            {/* Table of Courses */}
            <form className="justify-center">

                <div className="flex flex-col justify-center w-full bg-white rounded-full pt-3 px-2">
                    <div className="font-semibold">ค้นหา</div>
                    <input
                        className="rounded-full px-2 text-sm py-2 w-full border-2 border-rose-color"
                        placeholder="กรองข้อมูล"
                        value={filterValue}
                        onChange={handleFilterChange}
                    ></input>
                    {/* ส่วนอื่นๆของ input กรองข้อมูล */}
                </div>
                <table className="table-auto">
                    <thead>
                        <tr>
                            
                            <th>ชื่อห้องเรียน</th>
                            <th>จำนวนนักศึกษา</th>

                            <th>
                                <div className="justify-center items-center">
                                    <div className="flex flex-row">
                                        <button
                                            type='button'
                                            className="p-2 my-2 mx-2 bg-red-300 rounded-lg w-1/2 hover:bg-zinc-500"
                                            onClick={handleCheckAll_delete}
                                        >
                                            {buttonText_delete}
                                        </button>
                                        <button
                                            type='button'
                                            className="p-2 my-2 mx-2 rounded-lg bg-no-color w-1/2 hover:bg-zinc-500"
                                            onClick={handleDelete}
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredCourseData.map((item) => (
                                <tr key={item.room_number}>
                                    <td>
                                        <p>{item.room_number}</p>
                                    </td>
                                    <td>
                                        <p>{item.room_seat}</p>
                                    </td>

                                    <td>
                                        <input
                                            type="checkbox"
                                            className="accent-rose-color w-7 h-7"
                                            onChange={(event) => event.target.checked ? handleCheckboxChange_delete(item.room_id) : handleCheckboxChange_delete_unChecked(item.room_id)}
                                            checked={selectedItems_delete[item.room_id]}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default ImportRoom;