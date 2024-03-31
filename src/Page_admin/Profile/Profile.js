import { FaCircleUser } from "react-icons/fa6";
import { useState, useEffect } from "react";

function Profile() {
  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:4000/user/getUser`)
      const result = await res.json()
      setData(result)
    })()
  }, [])
  return (
    <div className='w-full h-screen bg-white'>
      <div className='mx-5 my-5 flex flex-col justify-start text-black font-bold '>
        <p className='text-3xl '>ข้อมูลบัญชี</p>

        <div className='flex flex-row p-1 text-lg justify-center'>
          <p className=''></p>
        </div>

        <div className='flex flex-row justify-center my-20'>
          <div className='flex flex-col bg-from-color rounded-lg  p-5 mx-12 w-8/12 justify-center '>
            <div className='flex flex-row justify-start'>
            {
          data.map(item => (
              <div className='flex flex-row p-6 items-center'>
                <FaCircleUser size={80} />
                <div className='flex flex-col p-6 justify-start'>
                <p className='flex pl-3 pb-2 text-rose-color text-2xl'>ชื่อ-นามสกุล : <p>{item.name} {item.lastname}</p></p>
                <p className='flex pl-3 pt-2 text-rose-color text-2xl'>สถานะ : <p>{item.isadmin ? "แอดมิน" : "อาจารย์"}</p></p>
                </div>
              </div>
              ))
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;