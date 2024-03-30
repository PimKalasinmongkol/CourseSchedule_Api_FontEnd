import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDashboard, MdAccountCircle, MdLogout } from 'react-icons/md';
import { BsChatLeftText } from 'react-icons/bs';

const Menus = [
  { title: 'หน้าหลัก', link: '/MainTeacher', icon: <MdOutlineDashboard /> },
  { title: 'ตารางสอน', icon: <BsChatLeftText />, link: '/SubjectTableTeacher' },
  { title: 'แบบฟอร์มข้อมูลรายวิชา', icon: <MdAccountCircle />, link: '/FormTeacher' },
];

const Menuslogout = [
  { title: 'ออกจากระบบ', icon: <MdLogout />, link: '/LogoutTeacher' },
];

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-red-900">
      <div className="justify-center mt-3 w-60">
        <h1 className="text-white font-medium font-IBM text-2xl text-center">
          <div className="flex justify-center items-center">
            <Link to = '/ProfileTeacher'><MdAccountCircle className="text-6xl" /></Link>
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
          <Link
            to={Menuslogout[0].link}
            className="text-white font-IBM flex items-center rounded-md p-4 cursor-pointer text-zinc-300 text-sm gap-x-4 hover:bg-slate-50 hover:text-red-900"
          >
            {Menuslogout[0].icon}
            {Menuslogout[0].title}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
