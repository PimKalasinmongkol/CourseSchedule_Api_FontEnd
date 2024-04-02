import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDashboard, MdAccountCircle, MdLogout } from 'react-icons/md';
import { BsChatLeftText } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { LuCat } from "react-icons/lu";

const SidebarTeacher = () => {

  const navigate = useNavigate();

  const Menus = [
    { title: 'หน้าหลัก', link: '/MainTeacher', icon: <MdOutlineDashboard /> },
    { title: 'ตารางสอน', icon: <BsChatLeftText />, link: '/SubjectTableTeacher' },
    { title: 'แบบฟอร์มข้อมูลรายวิชา', icon: <MdAccountCircle />, link: '/FormTeacher' },
  ];

  const Menuslogout = [
    { title: 'ออกจากระบบ', icon: <MdLogout />, link: '/' },
  ];

  const AltLogOut = () => {
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
        localStorage.setItem('sidebarClosed', 'false');
        navigate("/");
      }
    });
  };

  return (
    <div className="w-60  bg-red-900">
      <div className="justify-center mt-16 w-60">
        <h1 className="text-white font-medium font-IBM text-2xl text-center">
          <div className="flex justify-center items-center">
            <Link to='/ProfileTeacher'>
              <div className="p-2">
                <LuCat className="text-7xl text-red-200" />
              </div>
            </Link>
          </div>
        </h1>
      </div>
      <ul className="pt-7">
        {Menus.map((menu, index) => (
          <li key={index}>
            <Link
              to={menu.link}
              className="text-white font-IBM flex items-center rounded-md p-4 cursor-pointer text-zinc-300 text-sm gap-x-4 hover:bg-slate-50 hover:text-red-900"
            >
              {menu.icon}
              {menu.title}
            </Link>
          </li>
        ))}
        <div className='bg-red-900 h-96'></div>
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
      </ul>
    </div>
  );
};

export default SidebarTeacher;

