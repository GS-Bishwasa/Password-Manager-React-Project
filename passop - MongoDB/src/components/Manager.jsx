import React from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordsArray, setpasswordsArray] = useState([])

const getpasswords =async ()=>{
  let req = await fetch("http://localhost:3000/")
  let passwords = await req.json()
    setpasswordsArray(passwords)
    console.log(passwords)
    setpasswordsArray(passwords)
}

  useEffect(() => {
    getpasswords()
   
  }, [])

  const showPasssword = () => {
    let a = document.getElementById("pass")
    if (a.type === "text") {
      a.type = "password"
    } else {
      a.type = "text"
    }
  }

  const copytext = (text) => {
    navigator.clipboard.writeText(text)
    // toast("Text Copied To Clipboard!")
    toast('Text Copied To Clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  }

  const savePassword = async(e) => {
   if (form.site!=="" && form.username!=="" && form.password!=="") {
//if any such id exists in the db, delete it
    await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})


    setpasswordsArray([...passwordsArray, {...form,id:uuidv4()}])
    // localStorage.setItem("passwords", JSON.stringify([...passwordsArray, {...form,id:uuidv4()}]))
    await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
    console.log(...passwordsArray, form)
    setform({ site: "", username: "", password: "" })
   
   }else{
    alert("Please Fill All The Input Fields")
   }

  }

  const deletePassword = async(id) => {
    console.log(id)
    if (confirm("Are You Really Want To Delete This")) {
      setpasswordsArray(passwordsArray.filter(item=>item.id!==id))
      // localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter(item=>item.id!==id)))
      let res = await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})
     
    }
    // console.log(...passwordsArray, form)

  }

  const editPassword = (id) => {
    setform({...passwordsArray.filter(item=>item.id===id)[0],id:id})
    setpasswordsArray(passwordsArray.filter(item=>item.id!==id))

  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce" />
      {/* Same as */}
      <ToastContainer />
      <div className="static inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="px-3 md:mycontainer">
          <h1 className='text-4xl text font-bold text-center mt-3 md:mt-0'>
            <span className='text-green-700'>  &lt;</span>
            Pass
            <span className='text-green-700'>OP /&gt;</span>
          </h1>

          <p className='text-green-900 text-center text-lg'>Your Own Password Manager</p>
          <div className=" flex flex-col p-4 md:ml-10 md:mr-10 ">
            <input placeholder='Website URL' onChange={handleChange} className='rounded-full py-1 px-4 border border-green-500' name='site' type="text" value={form.site} />
            <div className="flex mt-6 w-full justify-between md:flex-row flex-col gap-8">
              <input placeholder='User Name' onChange={handleChange} className='rounded-full  w-full py-1 px-4 border border-green-500' name='username' type="text" value={form.username} />
              <div className="relative">
                <input placeholder='Password' onChange={handleChange} className=' rounded-full w-full py-1 px-4 border border-green-500' name='password' type="password" id='pass' value={form.password} />
                <span className='absolute right-2 top-0 cursor-pointer'> <lord-icon onClick={showPasssword}
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
          <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordsArray.length === 0 && <div> No passwords to show</div>}
                    {passwordsArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordsArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex flex-col md:flex-row items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex flex-col md:flex-row items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex flex-col md:flex-row items-center justify-center '>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
      </div>
    </>
  )
}

export default Manager
