import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDashboard, MdAccountCircle, MdLogout } from 'react-icons/md';
import { CgInsertAfterR } from "react-icons/cg";
import { BsChatLeftText } from 'react-icons/bs';
import { MdOutlineDomainAdd } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [isChecked, setIsChecked] = useState(true)
  const navigate = useNavigate();

  const handleCheckboxChange = async() => {
    setIsChecked(!isChecked)
    await fetch('http://localhost:4000/admin/setSystemPermissions',{
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({
        state: isChecked
      })
    })
  }

  const Menus = [
    { title: 'หน้าหลัก', link: '/MainPage', icon: <MdOutlineDashboard /> },
    { title: 'ตารางสอน', icon: <BsChatLeftText />, link: '/SubjectTable' },
    { title: 'นำเข้าหลักสูตร', icon: <CgInsertAfterR />, link: '/ImportSubject' },
    { title: 'นำเข้าห้องเรียน', icon: <MdOutlineDomainAdd />, link: '/ImportRoom' },
    { title: 'ข้อมูลผู้ใช้งาน', icon: <FaUserCheck />, link: '/AllUser' },
  ];

  const Menuslogout = [
    { title: 'ออกจากระบบ', icon: <MdLogout />, link: '/' },
  ];

  const AltLogOut = () =>{
    Swal.fire({
      title: "ออกจากระบบ",
      text: "คุณต้องการออกจากระบบหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ออกจากระบบ",
      cancelButtonText: "ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "ออกจากระบบสำเร็จ",
          text: "คุณได้ออกจากระบบเรียบร้อยแล้ว",
          icon: "success"
        });
        navigate("/");
      }
    });
  }

  return (
    <div className="w-60 bg-red-900">
      <div className="justify-center mt-3 w-60">
        <h1 className="text-white font-medium font-IBM text-2xl text-center">
          <div className="flex justify-center items-center">
            <Link to='/Profile'><MdAccountCircle size={90} /></Link>
          </div>
        </h1>
      </div>
      <ul className="pt-7">
        {Menus.map((menu, index) => (
          <li key={index}>
            <Link
              to={menu.link}
              className=" font-IBM flex items-center rounded-md p-4 cursor-pointer text-zinc-300 text-sm gap-x-4 hover:bg-slate-50 hover:text-red-900"
            >
              {menu.icon}
              {menu.title}
            </Link>
          </li>
        ))}
        <div className='bg-red-900 h-full'></div>

        <li>
          <button
            /* to={Menuslogout[0].link} */
            className=" font-IBM flex w-full items-center rounded-md p-4 cursor-pointer text-zinc-300 text-sm gap-x-4 hover:bg-slate-50 hover:text-red-900"
            onClick={AltLogOut}
          >
            {Menuslogout[0].icon}
            {Menuslogout[0].title}
          </button>
        </li>


        <li>
          <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center w-full justify-center p-3'>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={handleCheckboxChange}
              className='sr-only'
            />
            <span className='label flex items-center text-sm font-medium text-zinc-300'>
              เปิด
            </span>
            <span
              className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${isChecked ? 'bg-[#bfc5cc]' : 'bg-[#08ad1e]'
                }`}
            >
              <span
                className={`dot h-6 w-6 rounded-full bg-white duration-200 ${isChecked ? 'translate-x-[28px]' : ''
                  }`}
              ></span>
            </span>
            <span className='label flex items-center text-sm font-medium text-zinc-300'>
              ปิด
            </span>
          </label>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;