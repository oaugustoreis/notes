// import { motion } from "motion/react"
"use client";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion"; // Ensure this is correct
import { useState } from 'react';
import { logout } from '../../utils/views';
import Loading from './Loading';
function NavBar({ setActiveComponent, auth }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleLogout = async () => {
    try {
      const res = await logout()
      if (res) {
        router.push('/login')
      }
    } catch (error) {
      console.log('Error logging out user:', error)
    }
  }

  if (loading) {
    return <div className='text-black flex items-center justify-center h-screen'>
      <Loading />
    </div>;
  }

  return (

    <>
      <div className='my-3 flex items-center justify-center navMenu drop-shadow-md px-5 py-2 rounded-lg'>
        <motion.ul
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "Spring", duration: 0.1, delay: 0 }}
          className='flex justify-around w-full space-x-4 '
        >
          <li className='flex items-center py-1 px-3 rounded-md'>
            <button onClick={() => setActiveComponent('home')}>Perfil</button>
          </li>
          <li className='flex items-center py-1 px-3 rounded-md'>
            <button onClick={() => setActiveComponent('profile')}>Notas</button>
          </li>
          <li>
            <button onClick={handleLogout} className=' bg-red-500 text-white drop-shadow-md font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>Sair</button>
          </li>
        </motion.ul>
      </div>
    </>
  )

}
export default NavBar