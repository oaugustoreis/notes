"use client";
import { motion } from "motion/react"
import { format, set } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { pt } from 'date-fns/locale';
import React from 'react';
import { useState, useEffect } from 'react';
import EditNote from './EditNote'
import { get_notes } from "../../utils/views";
import Loading from "./Loading";

function ProfileCard({ user, setData, data }) {
    const [noteContent, setNoteContent] = useState([]);
    const [noteId, setNoteId] = useState([]);
    const [noteStatus, setNoteStatus] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false)

    async function lerNotasDoUsuario() {
        try {
            if (!user) {
                return;
            }
            const res = await get_notes(user);
            if (res) {
                // console.log('res', res);

                setData(res);
            }
        } catch (error) {
            console.error("Erro ao ler notas:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        lerNotasDoUsuario();
    }, [user]);

    // console.log('data', data);

    if (loading) {
        return (
            <Loading />
        )
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>User data not available.</div>;
    }
    const editNote = async (id, content, status) => {
        // console.log('editNote:', id, content);
        setNoteContent(content)
        setNoteStatus(status)
        setNoteId(id)
        try {
            setOpenModal(true)
        } catch (error) {
            console.error('Error editing note:', error);
        }
    }
    return (
        <div className='text-black flex py-2 justify-center items-center flex-col h-5/6'>
            {
                openModal && (
                    <EditNote setData={setData} setOpenModal={setOpenModal} id={noteId} content={noteContent} status={noteStatus} user={user} />
                )
            }
            <div className="flex flex-wrap  overflow-auto justify-center hide-scrollbar">
                {data.map((note, index) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.2,
                            scale: { type: "spring", visualDuration: 0.2, bounce: 0.2 },
                        }}
                        className="mx-3" key={index}>
                        <div className="bg-white w-60 shadow-lg my-3 rounded-lg">
                            <div className="py-2 px-4">
                                <div className='mb-2'>
                                    <div className="flex items-center justify-between">
                                        {
                                            note.status ? (
                                                <p className="text-md px-2 py-1 rounded-md bg-green-500 font-bold text-white">Pago</p>
                                            ) : (
                                                <p className="text-md px-2 py-1 rounded-md bg-red-500 font-bold text-white">Pendente</p>
                                            )
                                        }
                                        <button type="button" className=" rounded-md transition hover:bg-gray-200 p-1 px-2" onClick={() => editNote(note.id, note.content, note.status)}>
                                            <FontAwesomeIcon icon={faPenToSquare} className='text-xl ' />
                                        </button>
                                    </div>
                                    <p className="text-3xl w-full overflow-hidden text-ellipsis text-gray-900">{note.content}</p>
                                    <p className="text-sm text-gray-600">
                                        {format(note.data.toDate(), "dd/MM/yyyy", { locale: pt })}
                                    </p>

                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col gap-4 items-center justify-around">

                        </div>
                    </motion.div>
                ))}

            </div >
        </div >
    );
}

export default ProfileCard;