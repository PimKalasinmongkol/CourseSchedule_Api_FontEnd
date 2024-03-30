import image from '../pic/eng.jpg'
import imageGoogle from '../pic/google.png'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../LoginWithGG/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react'; // เพิ่มการนำเข้า useState เพื่อใช้งาน state ในฟังก์ชัน

function Login({setEmail ,setStage}) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // สถานะการเป็น admin
  const [isTeacher, setIsTeacher] = useState(false); // สถานะการเป็น teacher

  // เมื่อมีการเข้าสู่ระบบแล้ว ตั้งค่าสถานะของผู้ใช้
  const handleLogin = (adminStatus, teacherStatus) => {
    setIsAdmin(adminStatus);
    setIsTeacher(teacherStatus);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { email } = result.user;
      setEmail(email);

      // ตรวจสอบสิทธิ์ผู้ใช้กับเซิร์ฟเวอร์
      const response = await axios.post('http://localhost:4000/user/login', { email });

      if (response.data.status === 'success') {
          // ตรวจสอบสิทธิ์: isAdmin หรือไม่  
          const userRow = response.data.rows;
          const isadmin_data = userRow.map((item) => {
            return item.isadmin
          })
          console.log('user admin:'+isadmin_data);
          if (parseInt(isadmin_data) === 1) {
            setStage(1)
            handleLogin(true, false);
            navigate("/FirstPage"); // นำทางไปยังหน้า admin
          } else if (parseInt(isadmin_data) === 0) {
            setStage(0)
            handleLogin(false, true);
            navigate("/FirstTeacher"); // นำทางไปยังหน้า teacher
          } else {
            await signOut(auth); // ออกจากระบบ
            console.log("ไม่มีสิทธิ์เข้าถึง");
          }
      } else {
        await signOut(auth); // ออกจากระบบหากไม่พบผู้ใช้
        console.log("ไม่อนุญาตให้เข้าสู่ระบบด้วยอีเมลนี้");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${image})`, // ใส่ linear gradient เพื่อทำให้รูปพื้นหลังสีจางลง
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh',
    }} className="flex flex-col">
      <div className="flex text-red-900">
          <div className="text-8xl p-3">KU</div>
          <div className=" p-3">
              <div className="text-6xl">src</div>
              <div className="text-2xl">Course Schedule</div>
          </div>
      </div>
      <diV className="flex justify-center h-screen items-center text-2xl">
              <button className="flex h-1/5  justify-center rounded-2xl bg-white w-3/5 items-center active:bg-red-900 hover:bg-from-color" type="button" onClick={handleGoogleLogin}>
                  <p className="pr-3 font-bold">SIGN IN WITH </p>
                  <img src={imageGoogle} className="w-32 pl-3" alt="รูปภาพ" /> 
              </button>
      </diV>
  </div>
  );
}

export default Login;