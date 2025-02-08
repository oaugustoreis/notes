"use client";
import { motion } from "motion/react"
import { format, set } from 'date-fns';
import { fireStore } from "../../utils/firebase";
import { collection, doc, getDocs, getDoc, query, where, Firestore } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { pt } from 'date-fns/locale';
import React from 'react';
import { useState, useEffect } from 'react';
import EditNote from './EditNote'

function ProfileCard({ user }) {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        console.log('user', user);

        const getUser = async () => {
            try {
                const docRef = doc(fireStore, "notes", user);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data());
                } else {
                    setError("User not found.");
                }
            } catch (err) {
                setError(err.message); // Set the error message
                console.error("Error fetching user:", err); // Log the full error for debugging
            } finally {
                setLoading(false);
            }
        };

        async function lerNotasDoUsuario() {
            try {
                const notasRef = collection(fireStore, "notes", user, "userNotes");
                const q = query(notasRef);
                const querySnapshot = await getDocs(q);
                const notes = [];
                querySnapshot.forEach((doc) => {
                    const nota = doc.data();
                    notes.push(nota);
                    setData(notes);
                });
            } catch (error) {
                console.error("Erro ao ler notas:", error);
            } finally {
                setLoading(false);
            }
        }
        lerNotasDoUsuario();
    }, []);

    console.log('data', data);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>User data not available.</div>;
    }
    const editNote = async () => {
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
                    <EditNote setOpenModal={setOpenModal} />
                )
            }
            <div className={`flex flex-wrap  overflow-auto justify-center hide-scrollbar`}>
                {data.map((note) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.2,
                            scale: { type: "spring", visualDuration: 0.2, bounce: 0.2 },
                        }}
                        className="mx-3" key={note.id}>
                        <div className="bg-white w-60 shadow-lg my-3 rounded-lg">
                            <div className="py-2 px-4">
                                <div className='mb-2'>
                                    <div className="flex items-center justify-between">
                                        {/* <p className="tracking-wide text-md font-bold text-gray-700">{data.createdAt}</p> */}
                                        <button type="button" className=" rounded-md transition hover:bg-gray-200 p-1 px-2" onClick={() => editNote()}>
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