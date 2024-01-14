import React from 'react'

export default function Taginput() {
  return (
    <div className='w-20 text-black'>
      <select className='px-2 py-[7px] shadow shadow-blue-300 border-blue-300 border-2 bg-blue-300 rounded-r-lg' name="cars" id="cars">
        <option value="">Tag</option>
        <option value="General">General</option>
        <option value="Relations">Relations</option>
        <option value="Finance">Finance</option>
        <option value="personal">personal</option>
      </select>
    </div>
  );
} 
