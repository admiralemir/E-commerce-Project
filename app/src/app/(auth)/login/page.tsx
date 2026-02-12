"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Swal from "sweetalert2"

export default function LoginPage() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const payload = {
            email,
            password
        }

        const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const data = await resp.json()
        console.log(data, '<<<<<<<<<<<<<<<<<<');
        
        if (!resp.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: data.message,
            })
            return
        } else {
            router.push('/')
        }
    }
    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        LOG IN
                    </h1>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleLogin}>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password *
                        </label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            placeholder="Enter your password"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Minimum 6 characters
                        </p>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold uppercase tracking-wider text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200"
                        >
                            Log In
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-semibold text-black underline hover:text-gray-700">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}