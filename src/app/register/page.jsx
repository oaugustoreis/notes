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


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = register(email, password, firstName, lastName);
        if (res) {
            router.push("/login");
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
                    <img width="48" height="48" src="https://img.icons8.com/color/48/hitfilm-pro.png" alt="hitfilm-pro" />
                    {/* <h1 className="text-3xl font-bold">the Social</h1> */}
                    <span className="my-3">Teste de api com react </span>
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
                            <button type="submit" className={`${styles.btn} w-2/4 bg-indigo-500 text-white drop-shadow-md  font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}>Registrar</button>
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