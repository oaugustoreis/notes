"use client"
import { useState, useEffect } from "react";
import styles from "./login.module.css";
import { motion } from "motion/react"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '../../utils/firebase';
import { register } from "../../utils/views"

import { onAuthStateChanged } from "firebase/auth";
export default function Register() {

    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/');
                const uid = user.uid;
                console.log(uid);
            }
        });
    }, [])


    const handleSubmita = async (e) => {
        e.preventDefault();
        const res = register(email, password, firstName, lastName);
        if (res) {
            router.push("/login");
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!email || !password || !firstName || !lastName ){
                throw new Error('Preencha todos os campos!');
            }
            const response = await register(email, password, firstName, lastName);
            if (response) {
                router.push('/login');
            }
        } catch (error) {
            alert(error.message);
            return;
        } finally {
            setLoading(false);
        }

    }
    return (
        <div className={` flex items-center justify-center h-screen`}>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.2,
                    scale: { type: "spring", visualDuration: 0.2, bounce: 0.2 },
                }}>
                <div className={`${styles.bg} p-8 rounded-lg flex flex-col items-center text-white drop-shadow-md w-80`}>
                <img width="60" height="60" src="https://img.icons8.com/papercut/60/billing.png" alt="billing" />
                    {/* <h1 className="text-3xl font-bold">the Social</h1> */}
                    <span className="my-3">Registre-se para guardar notas</span>
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex gap-2">
                            <div className="mb-4">
                                <label className=" text-md font-bold mb-2" htmlFor="username">Nome:</label>
                                <input onChange={(e) => setFirstName(e.target.value)} type="text" id="firstname" name="username" className={`${styles.btn} w-full px-3 py-2 drop-shadow-md rounded-full cursor-pointer hover:bg-blue-900 focus:outline-none`} />
                            </div>
                            <div className="mb-4">
                                <label className=" text-md font-bold mb-2" htmlFor="username">Sobrenome:</label>
                                <input onChange={(e) => setLastName(e.target.value)} type="text" id="lastname" name="username" className={`${styles.btn} w-full px-3 py-2 drop-shadow-md rounded-full cursor-pointer hover:bg-blue-900 focus:outline-none`} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className=" text-md font-bold mb-2" htmlFor="email">Email:</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" id="email" name="email" className={`${styles.btn} w-full px-3 py-2 drop-shadow-md rounded-full cursor-pointer hover:bg-blue-900 focus:outline-none`} />
                        </div>
                        <div className="mb-4">
                            <label className=" text-md font-bold mb-2" htmlFor="password">Password:</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className={`${styles.btn} w-full px-3 py-2 drop-shadow-md rounded-full cursor-pointer hover:bg-blue-900 focus:outline-none`} />
                        </div>
                        <div className={`flex items-center justify-center`}>
                            {
                                loading ?
                                    <button disabled
                                        className="inline-block rounded-full border text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] disable  hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]  focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]   active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                                        type="button"
                                    >
                                        <div
                                            role="status"
                                            className="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                        >
                                            <span
                                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                            >
                                                Loading...
                                            </span>
                                        </div>
                                        Loading
                                    </button>
                                    :
                                    <button onClick={handleSubmit} type="submit" className={`${styles.btn} w-2/4 bg-indigo-500 text-white drop-shadow-md  font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}>Registrar</button>
                            }
                        </div>
                    </form>
                    <div className=" my-3 flex gap-2">
                        <span>Ou</span>
                        <Link href="/login">
                            <span className="underline underline-offset-4">Login</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}