import { auth, fireStore } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, deleteDoc,updateDoc, collection, getDocs, query, Timestamp } from "firebase/firestore";
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


export const register = async (email, password, firstName, lastName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Call the function to store additional user information
        await cadastrarInfos(user.uid, firstName, lastName, email);

        return { success: true }; // Indicate success
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Return an object with error information
        return { success: false, errorCode, errorMessage };
    }
};

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Login successful:", user);
        return true; // Indicate success
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login failed:", errorCode, errorMessage);
        return false; // Indicate failure
    }
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
        status: false,
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
    // console.log('Usuário:', user);

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

export async function get_user(user) {
    // console.log('Usuário:', user);

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
        // console.log("Nota deletada com ID:", noteId);
        return true;
    } catch (error) {
        console.error("Erro ao deletar nota:", error);
        alert(error.message);
        return false;
    }
}

export async function edit_note(user, noteId, editedNote) {
    console.log('Usuário:', user, 'ID da nota:', noteId, 'Nota editada:', editedNote);
    try {
        const docRef = doc(fireStore, "users", user, "userNotes", noteId.id);
        await setDoc(docRef, {
            content: editedNote
        }, { merge: true });
        // console.log("Nota editada com ID:", noteId);
        return true;
    } catch (error) {
        console.error("Erro ao editar nota:", error);
        alert(error.message);
        return false;
    }
}

export async function change_status(user, noteId, status) {
    // console.log('Usuário:', user, 'ID da nota:', noteId, 'Status:', status);
    try {
        const docRef = doc(fireStore, "users", user, "userNotes", noteId);
        await updateDoc(docRef, {
            status: !status 
        });
        // console.log(`Field status updated to ${status} for note ID: ${noteId}`);
        return true;
    } catch (error) {
        console.error("Error updating boolean field:", error);
        return false;
    }
}