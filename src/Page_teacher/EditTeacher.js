import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { useParams ,useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import queryString from "query-string";
import axios from "axios";

const EditTeacher = () => {
    const [countstd, setCountstd] = useState(1);
    const [selectedDay, setSelectedDay] = useState('1');
    const [selectedType, setSelectedType] = useState('บรรยาย');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedRoomSeat, setSelectedRoomSeat] = useState('');
    const [selectedCsec, setSelectedCsec] = useState('800');
    const [selectedStartTime, setSelectedStartTime] = useState('8:00');
    const [selectedEndTime, setSelectedEndTime] = useState('9:00');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedSubOptions, setSelectedSubOptions] = useState([]);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef();
    const navigate = useNavigate();

    const location = useLocation();
    const { subjectID } = queryString.parse(location.search);

    const [courseData, setCourseData] = useState([])
    const [roomData, setRoomData] = useState([])

    useEffect(() => {
        (async function () {
            const res = await fetch(`http://localhost:4000/course/getCourse/${subjectID}`)
            const result = await res.json()
            setCourseData(result)

            const resroom = await fetch(`http://localhost:4000/room/getAllRoom`)
            const resultroom = await resroom.json()
            setRoomData(resultroom)

        })()
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    const formDataWithEdit = courseData.map(item => ({
        ...item,
        start_time: selectedStartTime,
        end_time: selectedEndTime,
        Day: selectedDay,
        section: selectedCsec,
        major_year: selectedSubOptions,
        student_count: countstd,
        room_number: selectedRoom,
        room_seat: selectedRoomSeat
    }));

    console.log(formDataWithEdit);

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
        if (selectedStartTime < selectedEndTime && countstd < selectedRoomSeat ) {
            for (const item of formDataWithEdit) {
                const response = await axios.post(`http://localhost:4000/course/BookingCourseToMain/${item.subject_id}`, item);
                console.log(response.data);
    
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
        } else {
            Swal.fire({
                icon: "error",
                title: "โปรดเลือกเวลาเริ่มต้นและเวลาสิ้นสุดใหม่",
            });
        }
    } catch (error) {
        console.error(error);
    }
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

    const success = (e) => {
        if (selectedStartTime < selectedEndTime) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "บันทึกเรียบร้อยแล้ว",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "โปรดเช็คข้อมูลอีกครั้ง",
            });
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
            <div className="flex-4 mx-5 w-24">
                <label htmlFor="text-input" className="text-black font-IBM mb-2">{label}</label>
                <div className="flex items-center">
                    <input
                        type={type}
                        id="text-input"
                        value={value}
                        onChange={onChange}
                        placeholder={`ป้อน${label}ที่นี่`}
                        className="p-3 bg-white rounded-[15px] focus:outline-none w-full"
                    />
                </div>
            </div>
        );
    };


    return (
        <div>
            <div className="bg-white h-screen flex justify-between items-top mr-20">
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
                                        <h1 className="font-IBM font-bold mb-4 text-black">รหัสวิชา</h1>
                                        <form className="bg-rose-100 p-4 rounded-[15px] w-[500px] mb-6 flex items-center mr-10 h-15">
                                            <div className=" flex flex-col font-bold items-center justify-center">
                                                <p>{item.subject_id}</p>
                                            </div>
                                        </form>
                                    </div>


                                    <h1 className="font-IBM font-bold  text-black mb-2">ชื่อวิชาภาษาอังกฤษ</h1>
                                    <form className="bg-rose-100 p-4 rounded-[15px] w-[500px] mb-6 flex items-center mr-10">
                                        <div className="flex font-IBM font-bold space-x-4">
                                            <p>{item.subject_nameEN}</p>
                                        </div>
                                    </form>

                                    <h1 className="font-IBM font-bold  text-black mb-2">ชื่อวิชาภาษาไทย</h1>
                                    <form className="bg-rose-100 p-4 rounded-[15px] w-[500px] mb-6 flex items-center mr-10">
                                        <div className="flex font-IBM font-bold space-x-4">
                                            <p>{item.subject_nameTH}</p>
                                        </div>
                                    </form>

                                    <div className="flex">
                                        <div>
                                            <h1 className="font-IBM font-bold text-black">หน่วยกิต</h1>
                                            <form className="bg-rose-100 p-4 rounded-[15px] w-56 mb-6 mr-10">
                                                <div className="flex items-center font-IBM font-bold justify-center ">
                                                    <p>{item.credit}</p>
                                                </div>
                                            </form>
                                        </div>

                                        <div>
                                           
                                            <div className="flex font-IBM font-bold">
                                            <DropdownRoomSection 
                                                label="ห้องเรียน" 
                                                onSelect={handleRoomChange} 
                                                value={selectedRoom}
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

                        <h1 className="font-IBM font-bold  text-black ">สาขา</h1>
                        <div style={{ position: 'relative' }}>
                            <div
                                onClick={toggleDropdown}
                                style={{ cursor: 'pointer' }}
                                className={`m-0.5 btn bg-rose-100 text-black text-lg font-IBM rounded-[15px] w-[500px] hover:bg-white`}>
                                {selectedSubOptions.length > 0 ? `${selectedSubOptions.join(', ')}` : 'สาขา'}
                            </div>
                            {dropdownOpen && (
                                <div
                                    ref={dropdownRef}
                                    style={{
                                        position: 'absolute',
                                        top: '30px',
                                        left: '0',
                                        width: '500px',
                                        maxHeight: '150px',
                                        overflowY: 'auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                    className="mt-5 bg-rose-100 p-4 rounded-[15px] w-96 font-IBM font-bold text-black flex-center">
                                    {dropdownOptions.map((option) => (
                                        <div key={option.id} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            {option.label}
                                            {option.subOptions && (
                                                <div style={{ marginLeft: '65px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    {option.subOptions.map((subOption) => (
                                                        <label key={subOption} style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedOptions.includes(`${option.id}-${subOption}`)}
                                                                onChange={() => handleCheckboxChange(option.id, subOption)}
                                                                style={{ marginRight: '5px' }}
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
                        top: '50px',
                        left: '750px',
                        width: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>


                    <div className="bg-rose-100 p-4 rounded-[15px] w-96 mb-2 flex items-center justify-end ml-10">
                        <h2 className="mr-6 mt-5 text-black font-bold">หมู่เรียน</h2>
                        <div className="flex font-IBM font-bold space-x-4 text-lg">
                            {courseData.map((item, index) => (
                                <div key={index} className="flex font-IBM font-bold ">
                                    {item.group === "1" && (
                                        <>
                                            <p>บรรยาย</p>
                                            <DropdownSection
                                                label="เซค"
                                                items={[800, 801, 802, 803, 804, 805, 805, 806, 807, 808, 809, 810]}
                                                align="right"
                                                onSelect={handleCsecChange}
                                            />
                                        </>
                                    )}
                                    {item.group === "2" && (
                                        <>
                                            <p>ปฏิบัติ</p>
                                            <DropdownSection
                                                label="เซค"
                                                items={[830, 831, 832, 833, 834]}
                                                align="right"
                                                onSelect={handleCsecChange}
                                            />
                                        </>
                                    )}
                                </div>
                            ))}
                            <CenteredTextInput
                                label="จำนวนที่นั่ง"
                                value={countstd}
                                onChange={handleCountstdChange}
                                type="number"
                            />
                        </div>
                    </div>


                    <div className="bg-rose-100 p-4 rounded-[15px] w-96 mb-2 flex items-center justify-end ml-10">
                        <div className="flex-1 font-IBM font-bold w-96 self-center text-lg">
                            <DropdownDay
                                label="วัน"
                                items={[1, 2, 3, 4, 5, 6, 7]} // เปลี่ยนชื่อวันเป็นตัวเลข
                                selectedDay={selectedDay}
                                onSelectDay={handleDayChange}
                            />
                            <div className="flex items-start font-IBM font-bold ">
                                <DropdownTimeRange
                                    label="เวลาเริ่มต้น"
                                    items={['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                                        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
                                        '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
                                        '20:00', '20:30', '21:00', '21:30', '22:00', '22:30']}
                                    selectedStartTime={selectedStartTime}
                                    onSelectTime={handleStartTimeChange}
                                />
                                <DropdownTimeRange
                                    label="เวลาสิ้นสุด"
                                    items={['09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                                        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
                                        '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
                                        '20:00', '20:30', '21:00', '21:30', '22:00', '22:30']}
                                    selectedEndTime={selectedEndTime}
                                    onSelectTime={handleEndTimeChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white flex items-center justify-center w-96 h-32 ml-10">
                        <div className="text-center w-32 btn btn-success font-IBM font-bold text-white text-2xl mr-4" onClick={handleSubmit}>
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
        onSelect(selectedItemInt);
        setIsOpen(false);
    };
    return (
        <div className={` mb-4 flex-1 w-28 ${align === 'right' ? 'ml-auto' : ''}`} ref={dropdownRef}>
            <label htmlFor="dropdown" className="text-black font-IBM mb-2 w-24  ">
                {label}
            </label>
            <div>
                <details
                    role="button"
                    className="flex items-center dropdown"
                    open={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <summary className="m-0.5 btn bg-white text-black font-IBM rounded-[15px] w-28 hover:bg-white">
                        {selectedItem.toString()}
                    </summary>
                    <ul
                        className={`p-1 shadow menu dropdown-content z-[1] bg-pink-50 text-black 
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

// เรียกใช้ฟังก์ชัน
console.log(getDayName(1)); // ผลลัพธ์ควรจะเป็น 'จันทร์'

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
            <label htmlFor="dropdown" className="text-black font-IBM mb-2 w-1/4">{label}</label>
            <div>
                <details
                    role="button"
                    className="flex items-center dropdown"
                    open={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <summary className="m-0.5 btn bg-white text-black font-IBM rounded-[15px] w-74 hover:bg-white">{getDayName(selectedItem)}</summary>
                    <ul className={`p-1 shadow menu dropdown-content z-[1] bg-pink-50 text-black rounded-[15px] w-80
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
        <div className={`mb-4 flex-1 w-32 ${align === 'right' ? 'ml-auto' : ''}`}>
            <label htmlFor="dropdown" className="text-black font-IBM mb-2 w-32">{label}</label>
            <div>
                <details role="button"
                    className="flex items-center dropdown"
                    open={isOpen}
                    onClick={() => setIsOpen(!isOpen)}>
                    <summary className="m-0.5 btn bg-white text-black font-IBM rounded-[15px] w-28 hover:bg-white">{selectedItem}</summary>
                    <ul className={`p-1 shadow menu dropdown-content z-[1] bg-pink-50 text-black rounded-[15px] w-32 max-h-[10rem] overflow-auto ${align === 'right' ? 'origin-top-right' : ''}`}>
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
    const handleRoomChange = (event) => {
        const roomNumber = event.target.value;
        const roomSeat = event.target.selectedOptions[0].getAttribute('data-seat');
        onSelect(roomNumber, roomSeat);
    };

    return (
        <div className={`mb-4 flex-1 w-28 ${align === 'right' ? 'ml-auto' : ''}`}>
            <label htmlFor="dropdown" className="text-black font-IBM mb-2 w-24">
                {label}
            </label>
            <div>
                <select
                    id="dropdown"
                    className="btn bg-rose-100 text-black font-IBM rounded-[15px] w-56 h-14 hover:bg-white"
                    value={value}
                    onChange={handleRoomChange}
                >
                    <option value="">เลือกห้อง</option>
                    {children}
                </select>
            </div>
        </div>
    );
};



export default EditTeacher;