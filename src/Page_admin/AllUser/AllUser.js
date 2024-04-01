import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { IoAddCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2'

function AllUser() {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState(true)

    useEffect(() => {
        (async function () {
            const res = await fetch('http://localhost:4000/user/getAllUser')
            const data = await res.json()
            setData(data)
        })()
    }, [])

    async function deleteUser(id) {
        try {
            const result = await Swal.fire({
                title: "ลบผู้ใช้งาน",
                text: "คุณต้องการลบ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก"
            });
            if (result.isConfirmed) {
                await fetch(`http://localhost:4000/admin/deleteUser/${id}`);
                setData(data.filter(item => item.id !== id));
                await Swal.fire({
                    title: "สำเร็จ",
                    text: "คุณได้ลบผู้ใช้งานเรียบร้อยแล้ว",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    }


    return (
        <div className='flex-row justify-start w-full h-screen bg-white'>

            <div style={{ flex: 20 }} className='mx-5 my-5'>
                <div style={{ flex: 5 }} className="flex flex-row justify-start text-black text-3xl font-bold">
                    <div className='pr-1'>ข้อมูลผู้ใช้งาน</div>
                    <div className='text-rose-color'>{filter ? 'แอดมิน' : 'อาจารย์'}</div>
                </div>
                <div style={{ flex: 5 }} className='flex flex-row justify-center text-gray-50 text-xl font-bold p-5'>
                    <button onClick={() => setFilter(false)} className='flex flex-col rounded-md bg-button-color  w-1/5 p-5 m-5  hover:bg-rose-800 active:bg-neutral-800 justify-center items-center'>
                        <p>อาจารย์</p>
                        <p>{data.filter(item => item.isadmin === 0).length}</p>
                    </button>
                    <button onClick={() => setFilter(true)} className='flex flex-col rounded-md bg-button-color  w-1/5 m-5 p-5  hover:bg-rose-800 active:bg-neutral-800 justify-center items-center' >
                        <p>ผู้ดูแลระบบ</p>
                        <p>{data.filter(item => item.isadmin === 1).length}</p>
                    </button>
                </div>


                <div style={{ flex: 10 }} className='flex flex-row justify-center'>
                    <div className='bg-from-color rounded-lg  p-5 mx-10 w-9/12'>
                        <div className="flex justify-between">
                            <div></div>
                            <button className="justify-end rounded-full active:bg-neutral-100 hover:bg-button-color ">
                                <Link to="/AddUser">
                                    <IoAddCircleOutline size={40} />
                                </Link>
                            </button>
                        </div>
                        <form className=" h-60 touch-none justify-brtween m-4 text-name-color">

                            {
                                data.map((item) => {
                                    if (filter === true) {
                                        if (item.isadmin === 1) {
                                            return (
                                                <div className='justify-between flex flex-row  bg-white rounded-full m-3'>
                                                    <div className='flex items-center'>
                                                        <img className='m-2' src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-256.png" width={40} alt="add user" />
                                                        <div className='flex flex-col font-bold'>
                                                            <p>{item.name} {item.lastname}</p>
                                                            <p>สถานะ: {item.isadmin === 0 ? "อาจารย์" : "แอดมิน"}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center mr-2'>
                                                        <img className='m-2 cursor-pointer' src="https://cdn1.iconfinder.com/data/icons/line-free/24/Recycle_bin_-256.png" width={20} alt="delete" onClick={() => deleteUser(item.id)} />
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div></div>
                                            )
                                        }
                                    } else {
                                        if (item.isadmin === 0) {
                                            return (
                                                <div className='justify-between flex flex-row  bg-white rounded-full m-3'>
                                                    <div className='flex items-center'>
                                                        <img className='m-2' src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-256.png" width={40} alt="add user" />
                                                        <div className='flex flex-col font-bold'>
                                                            <p>{item.name} {item.lastname}</p>
                                                            <p>สถานะ: {item.isadmin === 0 ? "อาจารย์" : "แอดมิน"}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center mr-2'>
                                                        <img className='m-2 cursor-pointer' src="https://cdn1.iconfinder.com/data/icons/line-free/24/Recycle_bin_-256.png" width={20} alt="delete" onClick={() => deleteUser(item.id)} />
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div></div>
                                            )
                                        }
                                    }
                                })
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllUser;