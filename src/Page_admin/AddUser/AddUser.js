import './AddUser.css';
import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(0)
    const navigate = useNavigate();

    async function handleAddUser(event) {
        event.preventDefault();
        if (!name || !email || !isAdmin) {
            event.preventDefault();
            Swal.fire({
                position: "center",
                icon: "error",
                title: "กรอกข้อมูลให้ครบถ้วน",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }
        try {
            await fetch('http://localhost:4000/admin/addUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: name,
                    email: email,
                    isAdmin: isAdmin
                })
            })
            Swal.fire({
                position: "center",
                icon: "success",
                title: "เพิ่มข้อมูลสำเร็จ",
                showConfirmButton: false,
                timer: 1500
            });
            setName('');
            setEmail('');
            setIsAdmin(0);
            navigate("/AllUser");

        } catch (error) {
            console.error(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div className='mx-5 my-5 w-full h-screen bg-white'>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-3xl font-bold p-5 ' >บัญชีผู้ใช้งาน</p>

                <form className="bg-from-color p-8  w-9/12 rounded-lg h-90 text-base" onSubmit={handleAddUser}>
                    <div className='items-center justify-center'>
                        <div className='flex pt-2 pb-1 font-semibold'>
                            <p>ชื่อ</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <input placeholder='กรุณากรอกชื่อ-สกุล' className='w-9/12 p-2 rounded' id='name' type='text' onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className='flex pt-2 pb-1 font-semibold'>
                            <p>อีเมล</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <input placeholder='กรุณากรอกอีเมล ตัวอย่าง sophie@example.com' className='w-9/12 p-2 rounded' id='name' type="email" onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <diV className='flex pt-2 pb-1 font-semibold'>
                            <p>สถานะ</p>
                        </diV>
                        <div className='flex items-center justify-center border-2 border-button-color border-dashed rounded-lg p-2'>
                            <div className="radio-inputs">
                                <label className="radio">
                                    <input type="radio" name="radio" value={0} onChange={(event) => setIsAdmin(event.target.value)} />
                                    <span className="name">อาจารย์</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="radio" value={1} onChange={(event) => setIsAdmin(event.target.value)} />
                                    <span className="name">แอดมิน</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='flex pt-6 w-full rounded-lg  justify-center items-center'>
                        <button
                            className='bg-yes-color p-2 rounded-lg text-white w-1/5 ml-2 drop-shadow-md hover:bg-green-900 active:bg-neutral-800' type='submit'>
                            ตกลง
                        </button>
                        <button
                            className='bg-no-color p-2 rounded-lg text-white w-1/5 ml-2 drop-shadow-md hover:bg-red-900 active:bg-neutral-800' type='reset'>
                            ยกเลิก
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUser;