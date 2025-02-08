"use client";
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from "../../utils/firebase";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../components/Loading";


export default function Homepage(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const docRef = doc(fireStore, "users", props.user);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data());
                } else {
                    setError("User not found.");
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching user:", err);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [props.user]);

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

    return (
        <>
            <div className="text-black flex flex-col w-5/6 items-center justify-center gap-4 h-5/6">
                <div className="text-black bg-gray-100 flex w-full p-3 drop-shadow-md rounded-lg ">
                    <div className=" ">
                        <h1>{data.firstName} {data.lastName}</h1>
                        <h1>{data.email}</h1>
                    </div>
                </div>
                <div className="text-black flex p-3 drop-shadow-md rounded-lg h-full w-full bg-gray-100 ">
                    <div className="">
                        <div className="mb-4">
                            <h1>Total a pagar</h1>
                            <div className="flex gap-2">
                                <div className="bg-white p-2 rounded-lg drop-shadow-md">
                                    <h1>Em breve</h1>
                                    <p>12/20/2025</p>
                                </div>
                                <div className="bg-white p-2 rounded-lg drop-shadow-md">
                                    <h1>Em breve</h1>
                                    <p>12/20/2025</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h1>Total pago</h1>
                            <div className="flex gap-2">
                                <div className="bg-white p-2 rounded-lg drop-shadow-md">
                                    <h1>Em breve</h1>
                                    <p>12/20/2025</p>
                                </div>
                                <div className="bg-white p-2 rounded-lg drop-shadow-md">
                                    <h1>Em breve</h1>
                                    <p>12/20/2025</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h1>Ultimas adicionadas</h1>
                            <div className="flex gap-2">
                                <div className="bg-white p-2 rounded-lg drop-shadow-md">
                                    <h1>Atualizações Em breve</h1>
                                    <p>12/20/2025</p>
                                </div>
                                <div className="bg-white p-2 rounded-lg drop-shadow-md">
                                    <h1>Atualizações Em breve</h1>
                                    <p>12/20/2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}