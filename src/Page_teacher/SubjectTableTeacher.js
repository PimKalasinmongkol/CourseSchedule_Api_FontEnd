import React from 'react';
import '../index.css'

const SubjectTableTeacher = () => {
  return (
    <div className='ml-28 mx-5 my-5'>
      <div className="flex text-3xl font-bold">
        <p>ตารางสอน</p>
      </div>

      
        <div class="checkbox-group pt-6">
          <div className='flex justify-items-stretch'>
            <label className='pr-10 pt-5'>
              <input type="radio" name="subjectType" value="elective" />
              วิชาเลือก
            </label>
            <label className='pr-10 pt-5'>
              <input type="radio" name="subjectType" value="compulsory-elective" />
              วิชาเฉพาะบังคับ
            </label>
            <label className='pr-5 pt-5'>
              <input type="radio" name="subjectType" value="core" />
              วิชาแกน
            </label>
            
            <div className='flex flex-row px-20'>
              <div class="select-dropdown px-10">
                <div className='ml-2'>อาจารย์</div>
                  <div>
                    <select className="rounded-full px-9  text-sm py-1.5 w-full bg-gray-200" name="year" id="year">
                      <option value="">All</option>
                      <option value="2560">2560</option>
                      <option value="2565">2565</option>
                      <option value="2570">2570</option>
                    </select>
                </div>
              </div>

              <div class="select-dropdown px-10">
                <div className='ml-2'>ชั้นปี</div>
                <div>
                  <select className="rounded-full p-9  text-sm py-1.5 w-full bg-gray-200" name="year" id="year">
                    <option value="">All</option>
                    <option value="2560">2560</option>
                    <option value="2565">2565</option>
                    <option value="2570">2570</option>
                  </select>
                </div>
              </div>

              <div class="select-dropdown px-10">
                <div className='ml-2'>ห้อง</div>
                  <div>
                    <select className="rounded-full p-9  text-sm py-1.5 w-full bg-gray-200" name="year" id="year">
                      <option value="">All</option>
                      <option value="2560">2560</option>
                      <option value="2565">2565</option>
                      <option value="2570">2570</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="select-dropdown ">
                <div>ค้นหา</div>
                <input className='rounded-full p-5  text-sm py-1.5 w-full bg-gray-200' type="text" id="search-input" placeholder="Search..." />
              </div>

          </div>
        </div>

      <div className='flex'>
        <table className='mt-5 border-collapse w-full'>
          <thead>
            <tr>
              <th>DAY/TIME</th>
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
              <td>Sunday</td>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
              <td>Monday</td>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
              <td>Tuesday</td>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
              <td>Wednesday</td>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
              <td>Thursday</td>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
              <td>Friday</td>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
              <td>Saturday</td>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        *หมายเหตุสีแดง คือรายวิชาที่มีการซ้อนทับ
      </div>
      <div className="flex justify-end pt-2 pr-3">
        <button className="bg-rose-color font-semibold text-white m-1 p-1 rounded-full w-1/6 hover:bg-red-900 active:bg-neutral-800">
          ส่งออก
        </button>
      </div>
      <div className='flex px-10'>
        <table className='mt-5 border-collapse w-full'>
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
            <tr>
              <td></td>
               <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
              <td></td>
               <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
              <td></td>
               <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
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
  );
};
export default SubjectTableTeacher;