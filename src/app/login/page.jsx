"use client"
import { useState, useEffect } from "react";
import styles from "./login.module.css";
import { motion } from "motion/react"
import { login } from '../../utils/views';
import Link from 'next/link';
import { auth } from "../../utils/firebase";

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import Loading from "../components/Loading";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(true);
    useEffect(() => {
        console.log("Version 1.0.1");
        onAuthStateChanged(auth, (user) => {
            // console.log(user);
            if (user) {
                router.push('/');
            } else {
                setLoading2(false);
            }
            // setLoading2(false);
        });
        // setLoading2(false);
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!email || !password) {
                throw new Error('Preencha todos os campos!');
            }
            const response = await login(email, password);
            if (response) {
                router.push('/');
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
            {
                loading2 ? <Loading /> : (
                    <>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.2,
                                scale: { type: "spring", visualDuration: 0.2, bounce: 0.2 },
                            }}>
                            <div className={`${styles.bg} p-8 rounded-lg flex flex-col items-center text-white drop-shadow-md w-80`}>
                                {/* <img width="48" height="48" src="https://img.icons8.com/color/48/hitfilm-pro.png" alt="hitfilm-pro" /> */}
                                <img width="60" height="60" src="https://img.icons8.com/papercut/60/billing.png" alt="billing" />
                                {/* <h1 className="text-3xl font-bold">the Social</h1> */}
                                <span className="my-3">Agora você saberá o que deve!</span>
                                <form className="w-full">
                                    <div className="mb-4">
                                        <label className=" text-md font-bold mb-2" htmlFor="username">Email:</label>
                                        <input onChange={(e) => setEmail(e.target.value)} type="text" id="username" name="username" className={`${styles.btn} w-full px-3 py-2 drop-shadow-md rounded-full cursor-pointer hover:bg-blue-900 focus:outline-none`} />
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
                                                <button onClick={handleSubmit} type="submit" className={`${styles.btn} w-2/4 bg-indigo-500 text-white drop-shadow-md  font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}>Login</button>
                                        }
                                    </div>
                                </form>
                                <div className=" my-3 flex gap-2">
                                    <span>Ou</span>
                                    <Link href="/register">
                                        <span className="underline underline-offset-4">Registre-se</span>
                                    </Link>
                                </div>
                            </div>

                        </motion.div>
                    </>
                )
            }
        </div>
    )
}