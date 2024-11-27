import React from 'react'

const Navbar = () => {
    const redirect = ()=>{
        window.location ="https://github.com/GS-Bishwasa"
    }
    return (
        <div>
            <nav className='bg-green-200 flex justify-around h-14 items-center p-5'>
                <div className="logo font-bold text-2xl">
                    <span className='text-green-700'>  &lt;</span>
                   
                    Pass
                    <span className='text-green-700'>OP /&gt;</span>
                    
                    </div>
                {/* <ul className='flex gap-3 '>
                    <li><a className='hover:font-bold transition-all' href="#">Home</a></li>
                    <li><a className='hover:font-bold transition-all' href="#">About</a></li>
                    <li><a className='hover:font-bold transition-all' href="#">Contact</a></li>
                </ul> */}
                <button onClick={redirect} className='flex items-center'>
                    <img src="public/github.png" alt=""  className='w-10'/>
                   <span className=''>Github</span>
                </button>
            </nav>
        </div>
    )
}

export default Navbar
