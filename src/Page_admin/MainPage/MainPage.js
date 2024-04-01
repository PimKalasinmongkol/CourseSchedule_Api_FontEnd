import { FaCircleUser } from "react-icons/fa6";
import Swal from 'sweetalert2'
import { TiDelete } from "react-icons/ti";
import React, { useState, useEffect } from "react";

function MainPage() {
    const [announceText, setAnnounceText] = useState('');
    const [announceTextData, setAnnounceTextData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])

    const fetchAnnouncement = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:4000/admin/getAnnouncement');
            const data = await res.json();
            setAnnounceTextData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSession = async () => {
        try {
            const res = await fetch(`http://localhost:4000/user/getUser`)
            const result = await res.json()
            setData(result)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAnnouncement();
        fetchSession();
    }, [announceText]);

    const handleAddAnnounce = async (e) => {
        e.preventDefault();
        if (!announceText.trim()) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "กรุณากรอกข้อมูลให้ครบถ้วน",
                showConfirmButton: false,
                timer: 1500
            });
            return; // Exit the function if announceText is empty
        }
        try {
            await fetch('http://localhost:4000/admin/createAnnouncement', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    announce_text: announceText
                })
            });
            setAnnounceText('');
            fetchAnnouncement();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "เพิ่มข้อมูลสำเร็จ",
                showConfirmButton: false,
                timer: 1500
            });
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

    };


    const handleDeleteAnnouncement = async (id ,event) => {
        try {
            await fetch(`http://localhost:4000/admin/deleteAnnouncement/${id}`);
            fetchAnnouncement();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "ลบข้อมูลสำเร็จ",
                showConfirmButton: false,
                timer: 1500
            });
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
    };

    return (
        <div className='w-screen bg-white'>
            <div className='mx-5 my-5 h-screen flex flex-col justify-start text-black font-bold '>
                <p className='text-3xl '>ยินดีต้อนรับเข้าสู่ระบบ</p>
                <div className="flex justify-between">
                    {
                        data.map(item => (
                            <div className='flex flex-row p-6 items-center w-2/3'>
                                <FaCircleUser size={60} />
                                <p className='pl-6 text-rose-color text-2xl '>{item.name} {item.lastname}</p>
                            </div>
                        ))
                    }
                    <div className='flex flex-row p-6 items-center w-1/5'>

                    </div>

                </div>

                <div className='flex flex-row  text-lg justify-center'>
                    <p className=''>ประกาศเพิ่มเติม</p>
                </div>

                <div className='flex flex-row justify-center h-2/5 my-3 rounded-lg'>
                    <div className='flex flex-row justify-center  my-3 w-9/12 py-3 rounded-lg bg-from-color'>
                        <form className='flex flex-col h-full  m-1 mx-10 w-full p-2 justify-start'>
                            {loading ? (
                                <div className='flex flex-row justify-center text-xl'>
                                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                    </svg>
                                    Loading...
                                </div>
                            ) : announceTextData.length > 0 ? (
                                announceTextData.map((item) => (
                                    <div key={item.announce_id} className='flex flex-col justify-center' >
                                        <div className='flex justify-end'>
                                            <button onClick={(event) => {event.preventDefault(); handleDeleteAnnouncement(item.announce_id); setAnnounceText("")}} className='rounded hover:bg-neutral-50 active:bg-neutral-800 justify-self-end '>
                                                <TiDelete size={30} color='#7A1E1E' />
                                            </button>
                                        </div>
                                        <div className='flex w-full justify-center'><p className='text-center text-base'>{item.announce_text}</p></div>
                                    </div>
                                ))
                            ) : (
                                <div className='flex flex-row justify-center text-xl'>ไม่มีประกาศขณะนี้</div>
                            )}
                        </form>
                    </div>

                </div>

                <form className='flex flex-row justify-center h-1/5' onSubmit={handleAddAnnounce}>
                    <div className='flex flex-col bg-from-color rounded-lg  p-5 mx-10 w-9/12 justify-start '>
                        <textarea rows="5" cols="10" className='p-3 bg-white' value={announceText} onChange={(event) => setAnnounceText(event.target.value)}></textarea>
                        <div className='flex flex-row justify-end pt-2'>
                            <button type='submit' className='bg-rose-color rounded hover:bg-rose-900 active:bg-neutral-800 justify-self-end p-2 text-white'>
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <p></p>
        </div>
    );
}

export default MainPage;