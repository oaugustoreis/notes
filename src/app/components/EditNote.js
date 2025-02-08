
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBrazilianRealSign } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck, faTrashCan, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { motion } from "motion/react"
import { useState } from 'react';
import { delete_note, get_notes, edit_note, change_status } from "../../utils/views";
export default function EditNote({ setOpenModal, id, content, setData, user, status }) {
    const [editedNote, setEditedNote] = useState(content)
    const [payStatus, setPayStatus] = useState(status);
    const editNote = async (id) => {
        try {
            const res = await edit_note(user, id, editedNote);
            if (res) {
                const response = await get_notes(user);
                if (response) {
                    setOpenModal(false)
                    setData(response);
                }
            }
        } catch (error) {
            console.error('Error editing note:', error);
        }

    }
    const changeStatus = async () => {
        setPayStatus(!payStatus);
        console.log('Status:', payStatus);
        
        try {
            const res = await change_status(user, id, payStatus);
            if (res) {
                const response = await get_notes(user);
                if (response) {
                    setOpenModal(false)
                    setData(response);
                }
            }
        }
        catch (error) {
            console.error('Error changing status:', error)
        }
    }
    const deleteNote = async (id) => {
        try {
            const res = await delete_note(user, id);
            if (res) {
                const response = await get_notes(user);
                if (response) {
                    setOpenModal(false)
                    setData(response);
                }
            }
        } catch (error) {
            console.error('Error deleting note:', error)

        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.1,
                scale: { type: "spring", visualDuration: 0.1, bounce: 0 },
            }}
            className="fixed bg-gray-200 bg-opacity-80 h-screen w-screen flex justify-center items-center transition">
            <div className="bg-white w-64 shadow-lg my-3 rounded-lg">
                <div className="py-2 px-4">
                    <div className='mb-2'>
                        <div className="flex items-center justify-between mb-1">
                            <p className="tracking-wide text-md font-bold text-gray-700">Editar nota</p>
                            <button type="button" className=" rounded-md flex transition hover:bg-gray-200 py-1 px-2" onClick={() => setOpenModal(false)}>
                                <FontAwesomeIcon icon={faXmark} className='text-xl' />
                            </button>
                        </div>
                        <textarea onChange={(e) => setEditedNote(e.target.value)} rows="3" className="text-md p-2 rounded-md w-full text-gray-900 bg-gray-100" name="description" id="description" defaultValue={content}></textarea>

                        <div className='flex justify-around mt-2'>

                            {
                                payStatus ? (
                                    <button title="Pago" onClick={changeStatus} className="drop-shadow-md font-bold  bg-green-600 p-1 px-3 rounded-full hover:bg-green-400 transition  text-md text-white"><FontAwesomeIcon icon={faCircleCheck} className='w-10' /></button>
                                ) : (
                                    <button title="Pagar" onClick={changeStatus} className="drop-shadow-md font-bold  bg-green-500 p-1 px-3 rounded-full hover:bg-green-400 transition text-md text-white"><FontAwesomeIcon icon={faBrazilianRealSign} className='w-10' /></button>
                                )
                            }
                            <button title="Salvar alterações" onClick={() => editNote({ id })} className="drop-shadow-md font-bold  bg-indigo-500  px-3 rounded-full hover:bg-indigo-400 transition text-md text-white"><FontAwesomeIcon icon={faPaperPlane} className='w-10' /></button>
                            <button title="Deletar nota" onClick={() => deleteNote({ id })} className="drop-shadow-md font-bold  bg-red-500  px-3 rounded-full hover:bg-red-400 transition text-md text-white"><FontAwesomeIcon icon={faTrashCan} className='w-10' /></button>
                        </div>

                    </div>
                </div>

            </div>
        </motion.div>
    );
}