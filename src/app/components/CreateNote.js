"use client"
import { motion } from "motion/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Plus from './Plus'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateNote( ) {
    const [open, setOpen] = useState(false)
    const [note, setNote] = useState('')

    const router = useRouter()
    const createNote = async () => {
        console.log("Note created: ");

    }
    return (
        <div className='text-black flex items-center  justify-center '>
            {
                open ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.2,
                            scale: { type: "spring", visualDuration: 0.2, bounce: 0.2 },
                        }}
                    >

                        <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
                            <div className='p-2 px-3 create flex bg items-center justify-center'>
                                <div className='flex items-center justify-between  '>
                                    <button onClick={() => setOpen(false)} className="rounded-full text-white p-3 font-bold flex items-center justify-center rounded">
                                        <FontAwesomeIcon icon={faXmark} className='text-md text-black ' onClick={() => setOpen(true)} />
                                    </button>
                                    <input onChange={(e) => setNote(e.target.value)} type="text" className="p-2 outline-none" placeholder="Create new note" />
                                    <button onClick={createNote} className="btn rounded-full text-white p-3 font-bold flex items-center justify-center rounded ">
                                        <FontAwesomeIcon icon={faPaperPlane} className='text-md ' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="w-60 flex justify-end">
                        <Plus setOpen={setOpen} />
                    </div>
                )
            }
        </div>
    )
}