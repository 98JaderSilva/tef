import firebase_app from "./config";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export async function signOutUser() {
    let result = null,
        error = null;
    try {
        result = await signOut(auth);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
