import { auth, fireStore } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, deleteDoc, collection, getDocs, query,Timestamp } from "firebase/firestore";
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

export const create_note = async (content, user) => {
    const docRef = doc(collection(fireStore, "users", user, "userNotes"));
    const docData = {
        data: Timestamp.fromDate(new Date()),
        content: content,
        id: docRef.id
    };
    try {
        await setDoc(docRef, docData,);
        // console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (error) {
        console.error("Error creating note:", error);
        alert(error.message);
        return false;
    }
}

export async function get_notes(user) {
    console.log('Usuário:', user);
    
    try {
        const querySnapshot = await getDocs(query(collection(fireStore, "users", user, "userNotes")));
        const notes = [];
        querySnapshot.forEach((doc) => {
            const nota = doc.data();
            notes.push(nota);
        });
        return notes;
    } catch (error) {
        console.error("Erro ao ler notas:", error);
        return false
    }
}


export async function delete_note(user, noteId) {
    // console.log('Usuário:', user, 'ID da nota:', noteId.id);
    try {
        const docRef = doc(fireStore, "users", user, "userNotes", noteId.id);
        await deleteDoc(docRef);
        console.log("Nota deletada com ID:", noteId);
        return true;
    } catch (error) {
        console.error("Erro ao deletar nota:", error);
        alert(error.message);
        return false;
    }
}