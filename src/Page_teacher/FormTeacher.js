import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import Swal from 'sweetalert2';
import SidebarTeacher from "./SidebarTeacher";

const FormTeacher = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState([]);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/course/getAllCourses");
        const data = await res.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
        // Handle error
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await fetch('http://localhost:4000/admin/getSystemPermissions');
        const result = await res.json();
        setPermission(result.state);

        if (!result.state) {
          Swal.fire({
            title: 'แจ้งเตือนระบบ',
            text: 'ขณะนี้ระบบไม่อนุญาติให้ใช้เพิ่มหรือแก้ไขรายวิชางานได้',
            icon: 'error',
            confirmButtonText: 'ตกลง',
            customClass: {
              popup: 'denied-theme',
              title: 'denied-theme',
              confirmButton: 'denied-theme'
            }
          });
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
        // Handle error
      }
    };
    fetchPermissions();
  }, []);

  return (
    <div className="bg-white  w-screen items-center justify-center">
      <div>
        <h1 className='font-IBM font-bold text-black text-4xl mt-10 ml-10 '>แบบฟอร์มข้อมูลรายวิชา</h1>
      </div>
      <div className="mt-16 flex flex-col items-center justify-center">
        <input
          type="text"
          placeholder="ค้นหาวิชาที่จะเปิดสอน"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-4 bg-rose-100 font-IBM text-xl text-center font-bold rounded-[15px] w-2/4"
        />
      </div>
      <div className="flex flex-col items-center justify-center ml-10 mr-10">
        <table className="font-IBM text-black text-center mt-10 border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black p-2 text-xl">ลำดับ</th>
              <th className="border border-black p-2 w-44 text-xl">รหัสวิชา</th>
              <th className="border border-black p-2 w-96 text-xl">ชื่อวิชาภาษาอังกฤษ</th>
              <th className="border border-black p-2 w-96 text-xl">ชื่อวิชาภาษาไทย</th>
              <th className="border border-black p-2 text-center text-xl">หน่วยกิต</th>
              <th className="border border-black p-2 text-center text-xl">หมู่เรียน</th>
              <th className="border border-black p-2 text-center text-xl" style={{ display: permission ? 'block' : 'none', borderBottomWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px', borderTopWidth: '0px' }}>เพิ่มรายวิชา</th>
            </tr>
          </thead>
          <tbody>
            {tableData
              .filter((row) =>
                row.subject_id.toString().toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                row.subject_nameEN.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                row.subject_nameTH.toLowerCase().includes(searchQuery.trim().toLowerCase())
              )
              .map((row) => (
                <tr key={row.subject_id}>
                  <td className="border border-black p-2">{row.id}</td>
                  <td className="border border-black p-2">{row.subject_id}-{row.school_year}</td>
                  <td className="border border-black p-2">{row.subject_nameEN}</td>
                  <td className="border border-black p-2">{row.subject_nameTH}</td>
                  <td className="border border-black p-2">{row.credit}</td>
                  <td className="border border-black p-2">
                    {row.group === "1" ? "บรรยาย" : row.group === "2" ? "ปฏิบัติ" : ""}
                  </td>
                  <td className="border-black p-3 " style={{ display: permission ? 'block' : 'none', borderBottomWidth: '0px', borderLeftWidth: '0px', borderRightWidth: '0px' }}>
                    <Link to={`/EditTeacher?subjectID=${row.subject_id}`} className="text-red-900 flex items-center justify-center hover:rose-200" >
                      <FiPlusCircle size={15} />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormTeacher;