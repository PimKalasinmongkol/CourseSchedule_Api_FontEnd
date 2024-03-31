import { useNavigate ,useParams } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import image from '../../pic/eng.jpg'
import { useState ,useEffect } from "react";

function FirstPage({email}) {
  const navigate = useNavigate();
  const [data ,setData] = useState([])

  const Go_tosite = () => {
    navigate("/MainPage");
  }

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:4000/user/getUser`)
      const result = await res.json()
      setData(result)
    })()
  }, [])

  return (
    <div
    style={{
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${image})`, // ใส่ linear gradient เพื่อทำให้รูปพื้นหลังสีจางลง
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh',
    }}
    >
      <div className='flex flex-row p-1 text-lg justify-center'>
        <p className=''></p>
      </div>

      <div className='flex flex-row justify-center my-40'>
        <div className='flex flex-col bg-white bg-opacity-70 rounded-lg p-2 mx-12 w-6/12 justify-center relative shadow-md'>

        {
          data.map(item => (
            <div className='flex flex-col items-center py-2 pt-5'>
              <FaCircleUser size={120} />
              <div className='flex flex-col p-6 justify-start'>
                <p className='flex pl-3 pb-2 text-rose-color text-2xl'>ชื่อ-นามสกุล : <p>{item.name} {item.lastname}</p></p>
                <p className='flex pl-3 pt-2 text-rose-color text-2xl'>สถานะ : <p>{item.isadmin ? "แอดมิน" : "อาจารย์"}</p></p>
              </div>
            </div>
          ))
          }
          
          <div className="flex justify-end mt-4 mr-4">
            <button className="bg-white border border-gray-400 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded" type="button" onClick={Go_tosite}>ยินดีต้อนรับเข้าสู่ระบบ</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FirstPage