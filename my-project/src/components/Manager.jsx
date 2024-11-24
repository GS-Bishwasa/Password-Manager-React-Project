import React from 'react'

const Manager = () => {
  return (
    <div class="static inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className=" bg-slate-50 mycontainer">
        <h1 className='text-4xl text font-bold text-center'>
          <span className='text-green-700'>  &lt;</span>
          Pass
          <span className='text-green-700'>OP /&gt;</span>
        </h1>

        <p className='text-green-900 text-center text-lg'>Your Own Password Manager</p>
        <div className=" flex flex-col p-4 ml-10 mr-10 ">
          <input placeholder='Website Name' className='rounded-full py-1 px-4 border border-green-500' type="text" />
          <div className="flex mt-6">
            <input placeholder='User Name' className='rounded-full  w-[80%] py-1 px-4 border border-green-500' type="text" />
            <input placeholder='Password' className='rounded-full ml-10 w-[20%] py-1 px-4 border border-green-500' type="password" />

          </div>
          
          <button className='bg-green-500 w-fit rounded-full flex justify-center p-2 text-lg items-center'> <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
            className="w-[250px] h-[250px]">
          </lord-icon>Add Password</button>
        </div>
      </div>

    </div>
  )
}

export default Manager
