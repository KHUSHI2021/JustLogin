"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("you Signup successfully", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold text-center">{loading ? "Loading....." : "Signup"}</h1>
            <hr />
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
                className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 shadow-sm"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Username"
            />
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
                onClick={onSignup}
                className={`w-full p-2 text-white rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "No Signup" : "Signup"}
            </button>
            <Link href="/login" className="block text-center text-blue-500 hover:underline">Visit login page
            </Link>
        </div>
    </div>
    )

}