import { Link } from 'react-router-dom';
import { LuCat } from "react-icons/lu";

const ProfileTeacher = () => {
    const userData = {
        name: 'สมศรี',
        lastname: 'สนุกซุกซน',
        status: 'อาจารย์',
        faculty: 'คณะวิศวกรรมศาสตร์ ศรีราชา',
        major: 'วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์',
    };

    return (
        <div className="bg-white  w-screen h-screen">
            <div>
                <h1 className='font-IBM font-bold text-black text-4xl mt-28 ml-44 '>ข้อมูลบัญชีผู้ใช้</h1>
            </div>

            <div className='bg-rose-100 w-[1000px] h-2/4 ml-32 mt-10 rounded-[20px]'>
                <div className='bg-red-900 h-40 w-40 ml-10 rounded-[100px]'
                    style={{
                        position: 'absolute',
                        left: '400px',
                        top: '250px',
                    }}>
                    <div className='text-9xl text-white ml-3.5 mt-5'>
                        <LuCat />
                    </div>
                </div>
                <div className="ml-64 mt-10 text-rose-800  font-IBM p-2"
                    style={{
                        position: 'absolute',
                        left: '400px',
                        top: '225px',
                        width: '700px',
                    }}>
                    <p className="text-2xl font-bold mb-2">ชื่อ-นามสกุล : {userData.name} {userData.lastname}</p>
                    <p className="text-2xl font-bold mb-2">สถานะ : {userData.status}</p>
                    <p className="text-2xl font-bold mb-2">สังกัดคณะ : {userData.faculty}</p>
                    <p className="text-2xl font-bold mb-2">ภาควิชา : {userData.major}</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileTeacher;
