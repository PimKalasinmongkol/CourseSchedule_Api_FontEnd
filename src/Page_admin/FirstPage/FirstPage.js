import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import image from "../../pic/eng.jpg"
function FirstPage() {
  const navigate = useNavigate();

  const Go_insite = () => {
    navigate("/MainPage");
  }
    return (
      <div
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${image})`, // ใส่ linear gradient เพื่อทำให้รูปพื้นหลังสีจางลง
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh',
      }}
    >
      <div className='flex flex-row justify-center h-screen items-center'>
        <div className='flex flex-col bg-white bg-opacity-70 h-2/4 rounded-lg p-2 mx-12 w-6/12 justify-center relative shadow-md'>

          <div className='flex flex-col items-center py-2 pt-5'>
            <FaCircleUser size={120} />
            <div className='flex flex-col p-6 justify-start font-semibold'>
              <p className='flex pl-3 pb-2 text-rose-color text-2xl'><span>ชื่อ : คุณสมศรี สนุกซุกซน</span></p>
              <p className='flex pl-3 pt-2 text-rose-color text-2xl'>สถานะ : <p>แอดมิน</p></p>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 mr-4">
            <button className="bg-white border  border-gray-400 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded" type="button" onClick={Go_insite}>ยินดีต้อนรับเข้าสู่ระบบ</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FirstPage