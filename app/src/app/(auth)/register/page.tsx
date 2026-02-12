import { redirect } from 'next/navigation';
import Link from 'next/link';

type IProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function RegisterPage(props: IProps) {
    const { error } = await props.searchParams

    async function registerUser(formData: FormData) {
        "use server"

        const name = formData.get('name')
        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password')

        const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, username, email, password })
        })
        const data = await resp.json()

        if (!resp.ok) {
            redirect(`/register?error=${data.message}`)
        }

        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        CREATE YOUR ACCOUNT
                    </h1>
                </div>

                <form className="mt-8 space-y-5" action={registerUser}>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username *
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            placeholder="Choose a username"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password *
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            placeholder="Create a password"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Minimum 8 characters
                        </p>
                    </div>

                    <div className="flex items-start">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="h-4 w-4 mt-1 text-black focus:ring-black border-gray-300 cursor-pointer"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                            I agree to the{' '}
                            <a href="#" className="underline hover:text-black">
                                Terms & Conditions
                            </a>{' '}
                            and{' '}
                            <a href="#" className="underline hover:text-black">
                                Privacy Policy
                            </a>
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold uppercase tracking-wider text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200"

                        >
                            Create Account
                        </button>
                        {error && (
                            <div className="mt-3 px-4 py-3 rounded-md border border-red-300 bg-red-50">
                                <p className="text-sm text-red-600 font-medium">
                                    {error}
                                </p>
                            </div>
                        )}

                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-black underline hover:text-gray-700">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}