import { Link } from 'react-router-dom';
import { LuCat } from "react-icons/lu";

const MainTeacher = () => {
    const userData = {
        name: 'สมศรี',
        lastname: 'สนุกซุกซน',
        status: 'อาจารย์',
        faculty: 'คณะวิศวกรรมศาสตร์ ศรีราชา',
        major: 'วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์',
    };

    const newsdata = [
        { new1: 'สวัสดีชาวโลก วันนี้เป็นวันที่จะได้ลงทะเบียนวันสุดท้าย โปรดลงทะเบียนให้เรียบร้อยตามที่กำหนดด้วยเน้ออ' },
    ];

    return (
        <div className="bg-white w-screen h-screen">
            <div>
                <h1 className='font-IBM font-bold text-black text-4xl mt-20 ml-32 '>ยินดีต้อนรับเข้าสู่ระบบ</h1>
            </div>

            <div className='bg-red-900 h-28 w-28 ml-10 rounded-[100px]'
                style={{
                    position: 'absolute',
                    left: '350px',
                    top: '150px',
                }}>
                <div className='text-7xl text-white ml-5 mt-5'>
                    <LuCat />
                </div>
            </div>

            <div className="ml-64 mt-10 text-red-400 font-IBM p-2"
                style={{
                    position: 'absolute',
                    left: '275px',
                    top: '135px',
                    width: '700px',
                }}>
                <p className="text-3xl font-bold mb-2">คุณ{userData.name} {userData.lastname}</p>
            </div>

            <div className='bg-rose-100 w-[750px] h-2/4 ml-72 mt-32 rounded-[20px]'>
                <div className="ml-10 mt-10 text-rose-800 text-2xl font-IBM p-2 ">
                    <p className="text-3xl font-bold mb-2 text-center mt-5">ประกาศเพิ่มเติม</p>
                    <p className="text-xl font-IBM mt-4">{newsdata[0].new1}</p>
                </div>
            </div>
        </div>
    );
}

export default MainTeacher;
