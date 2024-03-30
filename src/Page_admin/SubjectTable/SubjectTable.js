import './SubjectTable.css'

function SubjectTable() {
    return (
        <div className='mx-5 my-5 '>
            <div className="flex text-3xl font-bold">
                <p>ตารางสอน</p>
            </div>
            <div className="checkbox-group pt-6">
                <div className='flex justify-items-stretch '>
                    <label className='pr-4'>
                        <input type="radio" name="subjectType" value="elective" />
                        วิชาเลือก
                    </label>
                    <label className='pr-4'>
                        <input type="radio" name="subjectType" value="compulsory-elective" />
                        วิชาเฉพาะบังคับ
                    </label>
                    <label className='pr-4'>
                        <input type="radio" name="subjectType" value="core" />
                        วิชาแกน
                    </label>
                </div>
            </div>
            <div className="group-uidropdown font-medium">
                <div className="group-dropdown">
                    <div className="w-full px-2">
                        <div>อาจารย์</div>
                        <div>
                            <select className="rounded-full px-2  text-sm py-1.5 w-full bg-gray-200" name="year" id="year">
                                <option value="">All</option>
                                <option value="1">พิม กาฬสินธุ์มงคล</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full px-2">
                        <div>ชั้นปี</div>
                        <div>
                            <select className="rounded-full px-2  text-sm py-1.5 w-full bg-gray-200" name="year" id="year">
                                <option value="">All</option>
                                <option value="2560">1</option>
                                <option value="2565">2</option>
                                <option value="2570">3</option>
                                <option value="2570">4</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full px-2">
                        <div>ห้อง</div>
                        <div>
                            <select className="rounded-full px-2  text-sm py-1.5 w-full bg-gray-200" name="year" id="year">
                                <option value="">All</option>
                                <option value="2560">17203(100)</option>
                                <option value="2565">17204(100)</option>
                                <option value="2570">17205(100)</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full ">
                        <div>ค้นหา</div>
                        <input className='rounded-full px-2   text-sm py-1.5 w-full bg-gray-200' type="text" id="search-input" placeholder="Search..." />
                    </div>
                </div>
                <div className=" w-1/4 px-2">
                        <div>
                            ข้อผิดพลาด
                        </div>
                        <select className="rounded-full px-2  text-sm py-1.5 w-full bg-gray-200" name="year" id="year">
                            <option value="">All</option>
                            <option value="2560">Abstract Data Types and Problem Solving</option>
                            <option value="2565">Algorithm Design and Analysis</option>
                        </select>
                </div>
            </div>
            <div className='flex'>
                <table>
                    <thead>
                        <tr>
                            <th>วัน/เวลา</th>
                            <th>7:00-7:30</th>
                            <th>7:30-8:00</th>
                            <th>8:00-8:30</th>
                            <th>8:30-9:00</th>
                            <th>9:00-9:30</th>
                            <th>9:30-10:00</th>
                            <th>10:00-10:30</th>
                            <th>10:30-11:00</th>
                            <th>11:00-11:30</th>
                            <th>11:30-12:00</th>
                            <th>12:00-12:30</th>
                            <th>12:30-13:00</th>
                            <th>13:00-13:30</th>
                            <th>13:30-14:00</th>
                            <th>14:00-14:30</th>
                            <th>14:30-15:00</th>
                            <th>15:00-15:30</th>
                            <th>15:30-16:00</th>
                            <th>16:00-16:30</th>
                            <th>16:30-17:00</th>
                            <th>17:00-17:30</th>
                            <th>17:30-18:00</th>
                            <th>18:00-18:30</th>
                            <th>18:30-19:00</th>
                            <th>19:00-19:30</th>
                            <th>19:30-20:00</th>
                            <th>20:00-20:30</th>
                            <th>20:30-21:00</th>
                            <th>21:00-21:30</th>
                            <th>21:30-22:00</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>วันอาทิตย์</td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>วันจันทร์</td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>วันอังคาร</td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>วันพุธ</td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>วันพฤหัสดี</td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>วันศุกร์</td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>วันเสาร์</td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='flex justify-between'>
                <div className='text-orange-700 font-semibold pt-2'>
                    หมายเหตุสีแดง คือรายวิชาที่มีการซ้อนทับ
                </div>
                <button className="bg-rose-color font-semibold text-white mt-2 p-1 rounded-full w-1/6 hover:bg-red-900 active:bg-neutral-800 shadow-md">
                    ส่งออก
                </button>
            </div>

            <div className='flex'>
                <table>
                    <thead>
                        <tr>
                            <th>วัน</th>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา</th>
                            <th>หน่วยกิต</th>
                            <th>บรรยาย</th>
                            <th>เวลาเริ่ม</th>
                            <th>เวลาสิ้นสุด</th>
                            <th>ปฏิบัติ</th>
                            <th>เวลาเริ่ม</th><th>เวลาสิ้นสุด</th>
                            <th>ห้อง</th>
                            <th>จำนวน</th>
                            <th>ชื่ออาจารย์</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SubjectTable;