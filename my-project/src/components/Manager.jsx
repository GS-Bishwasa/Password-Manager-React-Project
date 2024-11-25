import React from 'react'
import { useState, useEffect } from 'react'

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordsArray, setpasswordsArray] = useState([])
  
  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      // alert("ALready Exists Password")
      setpasswordsArray(JSON.parse(passwords))
    }
  }, [])

  const showPasssword = () => {
    let a = document.getElementById("pass")
    if (a.type === "text") {
      a.type = "password"
    } else {
      a.type = "text"
    }
  }
  const savePassword = (e) => {
     setpasswordsArray([ ...passwordsArray, form])
    localStorage.setItem("passwords", JSON.stringify([...passwordsArray, form]))
    console.log(...passwordsArray, form)
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }


  return (
    <div className="static inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className=" mycontainer">
        <h1 className='text-4xl text font-bold text-center'>
          <span className='text-green-700'>  &lt;</span>
          Pass
          <span className='text-green-700'>OP /&gt;</span>
        </h1>

        <p className='text-green-900 text-center text-lg'>Your Own Password Manager</p>
        <div className=" flex flex-col p-4 ml-10 mr-10 ">
          <input placeholder='Website URL' onChange={handleChange} className='rounded-full py-1 px-4 border border-green-500' name='site' type="text" value={form.site} />
          <div className="flex mt-6">
            <input placeholder='User Name' onChange={handleChange} className='rounded-full  w-full py-1 px-4 border border-green-500' name='username' type="text" value={form.username} />
            <div className="relative">
              <input placeholder='Password' onChange={handleChange} className=' rounded-full ml-3 w-full py-1 px-4 border border-green-500' name='password' type="password" id='pass' value={form.password} />
              <span className='absolute right-0 top-0 cursor-pointer'> <lord-icon onMouseEnter={showPasssword} onClick={showPasssword}
                src="https://cdn.lordicon.com/fmjvulyw.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#121331,secondary:#ffffff,tertiary:#3a3347,quaternary:#4bb3fd,quinary:#f9c9c0,senary:#f24c00"
                className='w-[250px] h-[250px]'>
              </lord-icon></span>
            </div>

          </div>


        </div>
        <div className='flex justify-center'>
          <button onClick={savePassword} className='bg-green-400 hover:bg-green-300 border-2 border-green-900 transition-all w-fit rounded-full flex justify-center p-2 px-4 text-lg items-center'> <lord-icon
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
