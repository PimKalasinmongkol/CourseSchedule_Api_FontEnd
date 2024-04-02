import { LuCat } from "react-icons/lu";
import { useState, useEffect } from "react";
import SidebarTeacher from "./SidebarTeacher";

const ProfileTeacher = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:4000/user/getUser`)
            const result = await res.json()
            setData(result)
        })()
    }, [])

    return (
        <div className="bg-white  w-screen h-screen ">
            
            <div>
                <h1 className='font-IBM font-bold text-black text-4xl mt-28 ml-44 '>ข้อมูลบัญชี</h1>
            </div>

            <div className='bg-rose-100 w-[900px] h-2/4 ml-64 mt-10 rounded-[20px]'>
                <div className='bg-red-900 h-40 w-40 m-12 ml-52 rounded-[150px] '
                    style={{
                        position: 'absolute',
                        left: '350px',
                        top: '250px',
                    }}>
                    <div className='text-9xl text-white m-8'>
                        <LuCat size={100} />
                    </div>
                </div>
                <div className="ml-20 mt-10 text-rose-800 "
                    style={{
                        position: 'absolute',
                        left: '400px',
                        top: '225px',
                        width: '700px',
                    }}>
                    {
                        data.map(item => (
                            <div className='flex flex-row p-10 ml-64 items-center mt-10'>

                                <div className='flex flex-col justify-start'>
                                    <p className='text-xl font-bold mb-2'>ชื่อ-นามสกุล : {item.name} {item.lastname}</p>
                                    <p className='text-xl font-bold mb-2'>สถานะ : {item.isadmin ? "แอดมิน" : "อาจารย์"}</p>
                                    <p className="text-xl font-bold mb-2">สังกัดคณะ : คณะวิศวกรรมศาสตร์ ศรีราชา</p>
                                    <p className="text-xl font-bold  w-[800px] ">ภาควิชา : วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์</p>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>
    );
}

export default ProfileTeacher;