
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { motion } from "motion/react"
import { useState } from 'react';
import { delete_note, get_notes } from "../../utils/views";
export default function EditNote({ setOpenModal, id, content, setData, user }) {
    const [editedNote, setEditedNote] = useState(content)

    const editNote = async (id) => {
        console.log("Edited note:");

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
                            <button onClick={() => editNote({ id })} className="bg-green-500 p-2 px-3 rounded-full hover:bg-green-400 transition text-md text-white">Salvar</button>
                            <button onClick={() => deleteNote({ id })} className="bg-red-500 p-2 px-3 rounded-full hover:bg-red-400 transition text-md text-white">Excluir</button>
                        </div>

                    </div>
                </div>

            </div>
        </motion.div>
    );
}