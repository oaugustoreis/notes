import { auth, fireStore } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export async function cadastrarInfos(userId, firstName, lastName, email) {
    try {
        await setDoc(doc(fireStore, 'users', userId), {
            firstName,
            lastName,
            email,
            registrationDate: new Date()
        });
        return true;
    } catch (error) {
        console.error("Error registering user:", error);
        alert(error.message);
        return false;
    }
}


export const register = (email, password, firstName, lastName) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            cadastrarInfos(user.uid, firstName, lastName, email);
            return true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export const logout = () => {
    try {
        signOut(auth);
        return true;
    }
    catch (error) {
        console.error("Error logging out user:", error);
        alert(error.message);
        return false;
    }
}