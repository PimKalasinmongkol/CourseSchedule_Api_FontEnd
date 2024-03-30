import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

const FormTeacher = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState([])

  /* const tableData = [
    { order: 1, subjectCode: '03603212-65', subjectName: 'Abstract Data Types and Problem Solving', credit: 3 },
    { order: 2, subjectCode: '03603213-65', subjectName: 'Algorithm Design and Analysis', credit: 3 },
    // Add more rows as needed
  ]; */
  useEffect(() => {
    (async function () {
      const res = await fetch("http://localhost:4000/course/getAllCourses")
      const data = await res.json()
      setTableData(data)
    })()
  }, [])



  return (
    <div className="bg-white h-screen w-screen items-center justify-center">
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

      <div className="flex flex-col items-center justify-center">
        <table className="font-IBM text-black text-center mt-10 border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black p-2">ลำดับ</th>
              <th className="border border-black p-2 w-44">รหัสวิชา</th>
              <th className="border border-black p-2 w-96">ชื่อวิชาภาษาอังกฤษ</th>
              <th className="border border-black p-2 w-96">ชื่อวิชาภาษาไทย</th>
              <th className="border border-black p-2 text-center">หน่วยกิต</th>
              <th className="border border-black p-2 text-center">เพิ่มรายวิชา</th>
            </tr>
          </thead>
          <tbody>
            {tableData
              .filter((row) =>
                row.subject_id.toString().toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                row.subject_nameEN.toLowerCase().includes(searchQuery.trim().toLowerCase())||
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
                    <Link to={`/EditTeacher?subjectID=${row.subject_id}`} className="text-red-900 flex items-center justify-center">
                      <FiPlusCircle />
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
