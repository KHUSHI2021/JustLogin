"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";



export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold text-center">{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 shadow-sm"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email"
            />
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 shadow-sm"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
            />
            <button
                onClick={onLogin}
                className={`w-full p-2 text-white rounded-lg mb-4 focus:outline-none ${buttonDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                disabled={buttonDisabled}
            >
                Login here
            </button>
            <Link href="/signup" className="block text-center text-blue-500 hover:underline">Don't have an account? Sign Up
            </Link>
        </div>
    </div>
    )

}