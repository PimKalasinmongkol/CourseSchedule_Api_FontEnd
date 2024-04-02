import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import queryString from "query-string";
import axios from "axios";
import SidebarTeacher from "./SidebarTeacher";

const EditTeacher = () => {
    const [countstd, setCountstd] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);
    const [selectedType, setSelectedType] = useState('บรรยาย');
    const [selectedRoom, setSelectedRoom] = useState('ห้อง');
    const [selectedRoomSeat, setSelectedRoomSeat] = useState('จำนวนที่นั่ง');
    const [selectedCsec, setSelectedCsec] = useState(800);
    const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedSubOptions, setSelectedSubOptions] = useState([]);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef();
    const navigate = useNavigate();

    const location = useLocation();
    const { subjectID } = queryString.parse(location.search);

    const [courseData, setCourseData] = useState([])
    const [roomData, setRoomData] = useState([])
    const [userData, setUserData] = useState([])
    const [formSumData, setFormSumData] = useState([])

    useEffect(() => {
        (async function () {
            const res = await fetch(`http://localhost:4000/course/getCourse/${subjectID}`)
            const result = await res.json()
            setCourseData(result)

            const resroom = await fetch(`http://localhost:4000/room/getAllRoom`)
            const resultroom = await resroom.json()
            setRoomData(resultroom)

            const resuser = await fetch(`http://localhost:4000/user/getUser`)
            const resultuser = await resuser.json()
            setUserData(resultuser)

            const resformsum = await fetch(`http://localhost:4000/course/getAllCoursesformsum`)
            const resultformsum = await resformsum.json()
            setFormSumData(resultformsum)

        })()

    }, []);




    const selectedSubOptionsString = selectedSubOptions.join(', ');

    const formDataWithEdit = courseData.map(item => ({
        ...item,
        start_time: selectedStartTime,
        end_time: selectedEndTime,
        Day: selectedDay,
        section: selectedCsec,
        major_year: selectedSubOptionsString,
        student_count: countstd,
        room_number: selectedRoom,
        room_seat: selectedRoomSeat,
        lecturer: userData.map(userDataItem => `${userDataItem.name} ${userDataItem.lastname}`)
    }));

    console.log(formDataWithEdit);


    const handleCheckSubmit = async () => {
        try {
            if (selectedSubOptionsString.trim() !== "") {
                if (countstd <= selectedRoomSeat) {
                    if (selectedStartTime < selectedEndTime) {
                        // Iterate over formDataWithEdit array
                        for (const item of formDataWithEdit) {
                            const isDuplicate = formSumData.some(data => {
                                return (
                                    (data.subject_id === item.subject_id &&
                                        data.Day === item.Day &&
                                        data.section === item.section &&
                                        data.lecturer === item.lecturer &&
                                        data.room_number === item.room_number) ||
                                    (data.room_number === item.room_number &&
                                        data.Day === item.Day &&
                                        data.startTime === item.startTime &&
                                        data.endTime === item.endTime) ||
                                    (data.lecturer === item.lecturer &&
                                        data.Day === item.Day)
                                );
                            });
    
                            // If duplicate found, show warning and return
                            if (isDuplicate) {
                                Swal.fire({
                                    icon: "warning",
                                    title: "ไม่สามารถลงทะเบียนได้",
                                });
                                return;
                            }
                        }
                        
                        // If no duplicates found, proceed to handleSubmit
                        await handleSubmit();
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุดใหม่",
                        });
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "กรุณาเลือกห้องใหม่จำนวนที่นั่งไม่เพียงพอ",
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "กรุณาเลือกสาขาและชั้นปี",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleSubmit = async () => {
        for (const item of formDataWithEdit) {
            const response = await axios.post(`http://localhost:4000/course/BookingCourseToMain/${item.subject_id}`, item);
            console.log(response.data);

            // Show success message using Swal
            Swal.fire({
                position: "center",
                icon: "success",
                title: "ลงทะเบียนรายวิชาสำเร็จ",
                showConfirmButton: false,
                timer: 1500
            });
        }
        // Navigate to FormTeacher page after all requests are done
        navigate("/FormTeacher");

    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleCheckboxChange = (optionId, subOption) => {
        const subOptionKey = `${optionId}-${subOption}`;

        if (selectedOptions.includes(subOptionKey)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== subOptionKey));
            setSelectedSubOptions(selectedSubOptions.filter((item) => item !== `${optionId}(${subOption})`));
        } else {
            setSelectedOptions([...selectedOptions, subOptionKey]);
            setSelectedSubOptions([...selectedSubOptions, `${optionId}(${subOption})`]);
        }
    };;

    const dropdownOptions = [
        { id: 'T05', label: 'T05', subOptions: ['1', '2', '3', '4', '4+'] },
        { id: 'T12', label: 'T12', subOptions: ['1', '2', '3', '4', '4+'] },
        { id: 'T13', label: 'T13', subOptions: ['1', '2', '3', '4', '4+'] },
        { id: 'T14', label: 'T14', subOptions: ['1', '2', '3', '4', '4+'] },
        { id: 'T17', label: 'T17', subOptions: ['1', '2', '3', '4', '4+'] },
        { id: 'T18', label: 'T18', subOptions: ['1', '2', '3', '4', '4+'] },
        { id: 'T19', label: 'T19', subOptions: ['1', '2', '3', '4', '4+'] },
        { id: 'T20', label: 'T20', subOptions: ['1', '2', '3', '4', '4+'] },
        { id: 'T21', label: 'T21', subOptions: ['1', '2', '3', '4', '4+'] },
        { id: 'T22', label: 'T22', subOptions: ['1', '2', '3', '4', '4+'] },
        { id: 'T23', label: 'T23', subOptions: ['1', '2', '3', '4', '4+'] },
    ];

    //////////////////
    const handleCountstdChange = (event) => {
        const inputValue = parseInt(event.target.value, 10);
        if (!isNaN(inputValue) && inputValue >= 0) {
            setCountstd(inputValue);
        }
    };

    const handleDayChange = (day) => {
        setSelectedDay(day);
    };

    const handleRoomChange = (roomNumber, roomSeat) => {
        setSelectedRoom(roomNumber);
        setSelectedRoomSeat(roomSeat);
    };


    const handleCsecChange = (csec) => {
        setSelectedCsec(csec);
    };

    const handleStartTimeChange = (startTime) => {
        setSelectedStartTime(startTime);
    };

    const handleEndTimeChange = (endTime) => {
        setSelectedEndTime(endTime);
    };

    const CenteredTextInput = ({ label, value, onChange, type }) => {
        return (
            <div className="ml-5 flex-4 w-36">
                <label htmlFor="text-input" className="text-black mb-2 text-2xl">{label}</label>
                <div className="flex items-center">
                    <input
                        type={type}
                        id="text-input"
                        value={value}
                        onChange={onChange}
                        placeholder={`ป้อน${label}ที่นี่`}
                        className="p-2 bg-white rounded-[15px] text-xl font-normal  focus:outline-none w-full"
                    />
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="bg-white h-screen w-screen flex justify-between items-top mr-20">


                <h1 className="font-IBM font-bold text-black text-4xl mt-5 ml-5 ">แก้ไขข้อมูล</h1>

                <div className="bg-white  rounded-md text-xl  w-[1162px]">
                    <div className="bg-white mt-10 "
                        style={{
                            position: 'absolute',
                            top: '50px',
                            left: '350px',
                            width: '384px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>

                        {
                            courseData.map((item) => (
                                <div>
                                    <div>
                                        <h1 className=" font-bold mb-4 text-black text-2xl">รหัสวิชา</h1>
                                        <form className="bg-rose-100 p-4 rounded-[15px] w-[600px] mb-6 flex items-center mr-10 h-20">
                                            <div className=" flex flex-co  items-start justify-start" style={{ fontSize: '20px', width: '100%' }}>
                                                <p>{item.subject_id}-{item.school_year.slice(2, 4)}</p>
                                            </div>
                                        </form>
                                    </div>


                                    <h1 className="font-bold  text-black mb-2 text-2xl">ชื่อวิชาภาษาอังกฤษ</h1>
                                    <form className="bg-rose-100 p-4 rounded-[15px] w-[600px] mb-6 flex items-center mr-10">
                                        <div className="flex font-IBM space-x-4" style={{ fontSize: '20px' }}>
                                            <p>{item.subject_nameEN}</p>
                                        </div>
                                    </form>

                                    <h1 className="font-bold  text-black mb-2 text-2xl">ชื่อวิชาภาษาไทย</h1>
                                    <form className="bg-rose-100 p-4 rounded-[15px] w-[600px] mb-6 flex items-center mr-10">
                                        <div className="flex font-IBM  space-x-4" style={{ fontSize: '20px' }}>
                                            <p>{item.subject_nameTH}</p>
                                        </div>
                                    </form>

                                    <div className="flex">
                                        <div>
                                            <h1 className="font-IBM font-bold text-black text-2xl">หน่วยกิต</h1>
                                            <form className="bg-rose-100 p-4 rounded-[15px] w-[270px] mb-6 mt-2 mr-10">
                                                <div className="flex items-center justify-center " style={{ fontSize: '20px' }}>
                                                    <p>{item.credit}</p>
                                                </div>
                                            </form>
                                        </div>

                                        <div>

                                            <div className="flex font-bold text-2xl">
                                                <DropdownRoomSection
                                                    label="ห้องเรียน"
                                                    onSelect={handleRoomChange}
                                                    value={{ roomNumber: selectedRoom, roomSeat: selectedRoomSeat }}
                                                >
                                                    {roomData.map((room, index) => (
                                                        <option key={index} value={room.room_number} data-seat={room.room_seat}>
                                                            {`${room.room_number} (${room.room_seat})`}
                                                        </option>
                                                    ))}
                                                </DropdownRoomSection>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        <h1 className="font-IBM font-bold  text-black text-2xl">สาขา</h1>
                        <div style={{ position: 'relative' }}>
                            <div
                                onClick={toggleDropdown}
                                style={{ cursor: 'pointer' }}
                                className={`m-0.5 h-16 btn bg-rose-100 text-black text-xl font-normal rounded-[15px] w-[600px] hover:bg-white`}>
                                {selectedSubOptions.length > 0 ? `${selectedSubOptions.join(', ')}` : 'เลือกสาขาและชั้นปี'}
                            </div>
                            {dropdownOpen && (
                                <div
                                    ref={dropdownRef}
                                    style={{
                                        position: 'absolute',
                                        top: '48px',
                                        left: '0px',
                                        width: '600px',
                                        maxHeight: '100px',
                                        overflowY: 'auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                    className="mt-5 bg-rose-100 p-4 rounded-[15px] w-96 font-IBM font-bold text-black flex-center">
                                    {dropdownOptions.map((option) => (
                                        <div key={option.id} style={{ marginLeft: '50px', marginBottom: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            {option.label}
                                            {option.subOptions && (
                                                <div style={{ marginLeft: '80px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    {option.subOptions.map((subOption) => (
                                                        <label key={subOption} style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedOptions.includes(`${option.id}-${subOption}`)}
                                                                onChange={() => handleCheckboxChange(option.id, subOption)}
                                                                style={{ marginRight: '10px' }}
                                                            />
                                                            {subOption}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-md w-98 ml-60 "
                    style={{
                        position: 'absolute',
                        top: '100px',
                        left: '750px',
                        width: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <div className="bg-rose-100 p-5 rounded-[15px] w-11/12 mb-2 flex items-center justify-end ml-10">
                        <div className="flex font-bold space-x-4 text-lg">
                            {courseData.map((item, index) => (
                                <div key={index} className="flex  font-bold ">
                                    {item.group === "1" && (
                                        <>

                                            <div className=" flex items-center mr-3">
                                                <div >
                                                    <label className="text-2xl">ประเภท</label>
                                                    <div className="bg-white p-2.5 rounded-[15px] w-28 font-xl font-normal">บรรยาย</div>
                                                </div>

                                                <DropdownSection
                                                    label="หมู่เรียน"
                                                    items={[800, 801, 802, 803, 804, 805, 805, 806, 807, 808, 809, 810]}
                                                    align="left"
                                                    onSelect={handleCsecChange}
                                                />
                                                <CenteredTextInput
                                                    label="จำนวนที่นั่ง"
                                                    value={countstd}
                                                    align="right"
                                                    onChange={handleCountstdChange}
                                                    type="number"
                                                />

                                            </div>
                                        </>
                                    )}
                                    {item.group !== "1" && (
                                        <>
                                            <div className=" flex items-center mr-3">
                                                <div >
                                                    <label className="text-2xl">ประเภท</label>
                                                    <div className="bg-white p-2.5 rounded-[15px] w-28 font-xl font-normal ">ปฏิบัติ</div>
                                                </div>

                                                <DropdownSection
                                                    label="หมู่เรียน"
                                                    items={[830, 831, 832, 834, 835, 836, 837, 838, 839, 840]}
                                                    align="left"
                                                    onSelect={handleCsecChange}
                                                />
                                                <CenteredTextInput
                                                    label="จำนวนที่นั่ง"
                                                    value={countstd}
                                                    align="right"
                                                    onChange={handleCountstdChange}
                                                    type="number"
                                                />

                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-rose-100 p-5 rounded-[15px] w-11/12 mt-6 mb-4 flex items-center justify-end ml-10">
                        <div className="flex-1  font-bold w-96 ml-4 self-center text-lg">
                            <DropdownDay
                                label="วัน"
                                items={[1, 2, 3, 4, 5, 6, 7]} // เปลี่ยนชื่อวันเป็นตัวเลข
                                selectedDay={selectedDay}
                                onSelectDay={handleDayChange}
                            />
                            <div className="flex items-start font-bold ">
                                <DropdownTimeRange
                                    label="เวลาเริ่มต้น"
                                    items={['เลือกเวลาเริ่มต้น', '08.00', '08.30', '09.00', '09.30', '10.00', '10.30', '11.00', '11.30',
                                        '12.00', '12.30', '13.00', '13.30', '14.00', '14.30', '15.00', '15.30',
                                        '16.00', '16.30', '17.00', '17.30', '18.00', '18.30', '19.00', '19.30',
                                        '20.00', '20.30', '21.00', '21.30', '22.00', '22.30']}
                                    selectedStartTime={selectedStartTime}
                                    onSelectTime={handleStartTimeChange}
                                />
                                <DropdownTimeRange
                                    label="เวลาสิ้นสุด"
                                    items={['เลือกเวลาสิ้นสุด', '08.00', '09.00', '09.30', '10.00', '10.30', '11.00', '11.30',
                                        '12.00', '12.30', '13.00', '13.30', '14.00', '14.30', '15.00', '15.30',
                                        '16.00', '16.30', '17.00', '17.30', '18.00', '18.30', '19.00', '19.30',
                                        '20.00', '20.30', '21.00', '21.30', '22.00', '22.30']}
                                    selectedEndTime={selectedEndTime}
                                    onSelectTime={handleEndTimeChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white flex items-center justify-center w-96 h-32 ml-20 ">
                        <div className="text-center w-32 btn btn-success font-IBM font-bold text-white text-2xl mr-4" onClick={handleCheckSubmit}>
                            ตกลง
                        </div>

                        <Link to='/FormTeacher'
                            className="text-center w-32 btn btn-error
                                    font-IBM font-bold text-white text-2xl"
                        >
                            ยกเลิก
                        </Link>
                    </div>
                </div>
            </div >
        </div >
    );
};

//////////////////

const useOutsideClick = (ref, callback) => {
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [ref, callback]);
};

const DropdownSection = ({ label, items, align, onSelect }) => {
    const [selectedItem, setSelectedItem] = useState(items[0]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => setIsOpen(false));

    const handleItemClick = (item) => {
        const selectedItemInt = parseInt(item, 10); // แปลง string เป็น integer
        setSelectedItem(selectedItemInt);
        onSelect(selectedItemInt); // ส่งค่าหมู่เรียนที่เลือกไปยังฟังก์ชัน handleCsecChange
        setIsOpen(false);
    };
    return (
        <div className={` ml-5 flex-1 w-28  ${align === 'right' ? 'ml-auto' : ''}`} ref={dropdownRef}>
            <label htmlFor="dropdown" className="text-black  w-24  text-2xl ">
                {label}
            </label>
            <div>
                <details
                    role="button"
                    className="flex items-center dropdown"
                    open={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <summary className="m-0.5 btn bg-white text-black font-normal text-xl rounded-[15px] w-28 hover:bg-white">
                        {selectedItem.toString()}
                    </summary>
                    <ul
                        className={`p-2 shadow menu dropdown-content z-[1] bg-pink-50 text-black 
                            rounded-[15px] w-28 max-h-[10rem] overflow-auto ${align === 'right' ? 'origin-top-right' : ''
                            }`}
                    >
                        <li>
                            {items.map((item) => (
                                <a key={item}
                                    onClick={() => handleItemClick(item)}
                                    className="Hover:bg-black Hover:text-white">
                                    {item}
                                </a>
                            ))}
                        </li>
                    </ul>
                </details>
            </div>
        </div>
    );
};

////////////
const getDayName = (index) => {
    const days = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];
    return days[index - 1]; // ลบ 1 เพื่อให้ index ตรงกับตำแหน่งของวัน
};

const DropdownDay = ({ label, items, align, maxItems, selectedDay, onSelectDay }) => {
    const [selectedItem, setSelectedItem] = useState(selectedDay);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => setIsOpen(false));

    const handleItemClick = (item) => {
        setSelectedItem(item);
        onSelectDay(item);
        setIsOpen(false);
    };

    return (
        <div className={`mb-4 flex-1 w-80  ${align === 'right' ? 'ml-auto' : ''}`}>
            <label htmlFor="dropdown" className="text-black text-2xl text-start mb-2 w-1/4">{label}</label>
            <div>
                <details
                    role="button"
                    className="flex items-center dropdown"
                    open={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <summary className="m-0.5 btn bg-white text-black font-normal text-xl rounded-[15px] w-[400px] hover:bg-white">{getDayName(selectedItem)}</summary>
                    <ul className={`p-1 shadow menu dropdown-content z-[1] bg-pink-50 text-black rounded-[15px] w-[400px]
                                max-h-[10rem] overflow-auto ${align === 'right' ? 'origin-top-right' : ''}`}>
                        <li>
                            {items.slice(0, maxItems).map((item) => (
                                <a key={item} onClick={() => handleItemClick(item)}>{getDayName(item)}</a>
                            ))}
                        </li>
                    </ul>
                </details>
            </div>
        </div>
    );
};

const DropdownTimeRange = ({ label, items, align, maxItems, onSelectTime }) => {
    const [selectedItem, setSelectedItem] = useState(items[0]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => setIsOpen(false));

    const handleItemClick = (item) => {
        setSelectedItem(item);
        onSelectTime(item);
        setIsOpen(false);
    };
    return (
        <div className={`mb-4 flex-1 w-64 ${align === 'right' ? 'ml-auto' : ''}`}>
            <label htmlFor="dropdown" className="text-black mb-2 w-44 text-2xl text-start">{label}</label>
            <div>
                <details role="button"
                    className="flex items-center dropdown"
                    open={isOpen}
                    onClick={() => setIsOpen(!isOpen)}>
                    <summary className=" btn bg-white text-black font-normal text-xl rounded-[15px] w-48 hover:bg-white">{selectedItem}</summary>
                    <ul className={`p-1 shadow menu dropdown-content z-[1] bg-pink-50 text-black rounded-[15px] w-48 max-h-[10rem] overflow-auto ${align === 'right' ? 'origin-top-right' : ''}`}>
                        <li>
                            {items.slice(0, maxItems).map((item) => (
                                <a key={item} onClick={() => handleItemClick(item)}>{item}</a>
                            ))}
                        </li>
                    </ul>
                </details>
            </div>
        </div>
    );
};
const DropdownRoomSection = ({ label, children, align, onSelect, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(value ? value : { roomNumber: 'เลือกห้อง', roomSeat: '' });

    const dropdownRef = useRef(null);

    const handleRoomChange = (roomNumber, roomSeat) => {
        setSelectedRoom({ roomNumber, roomSeat });
        onSelect(roomNumber, roomSeat);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <div className={`mb-4 flex-1 w-64 ${align === 'right' ? 'ml-auto' : ''}`}>
            <label htmlFor="dropdown" className="text-black  mb-2 w-64">
                {label}
            </label>
            <div ref={dropdownRef}>
                <details role="button" className="flex items-center dropdown" open={isOpen} onClick={toggleDropdown}>
                    <summary className="m-0.5 btn h-[60px] bg-rose-100 text-black rounded-[15px] w-72 hover:bg-white font-normal"
                        style={{ fontSize: '20px' }}>{selectedRoom.roomNumber} ({selectedRoom.roomSeat})</summary>
                    <ul className={`p-1 shadow menu dropdown-content z-[1] bg-pink-50 text-black rounded-[15px] w-72 max-h-[10rem] overflow-auto
                                ${align === 'right' ? 'origin-top-right' : ''}`}>
                        {React.Children.map(children, (child) => (
                            <li>
                                {React.cloneElement(child, { onClick: () => handleRoomChange(child.props.value, child.props['data-seat']) })}
                            </li>
                        ))}
                    </ul>
                </details>
            </div>
        </div>
    );
};

export default EditTeacher;