"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
//import { useState } from "react";
import { useFormState } from "react-dom";

export default function LoginForm() {
    // //one way to handle errors
    // const [error, setError] = useState(null);
    // const handleLogin = async (formData) => {
    //     const data = await authenticate(formData);
    //     data.error && setError(data.error);
    // }

    // or
    const [error, dispatch] = useFormState(authenticate, undefined)
    // but make sure to add prevState to authenticate action to get the error state

    return (
        <form action={dispatch} className={styles.form}>
            <h1>Login</h1>
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password"/>
            <button>Login</button>
            {error && error}
        </form>
    )
}
