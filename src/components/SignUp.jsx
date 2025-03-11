'use client'
import { signUp } from '@/api/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignUp = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const userData = {
                email: formData.email,
                password: formData.password
            };

            const response = await signUp(userData);
            setSuccess('User created successfully!');
            setFormData({ email: '', password: '' });
            router.push('/login')
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md min-w-sm  mx-auto p-6 bg-white rounded-lg border border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-transparent disabled:bg-gray-100"
                        disabled={loading}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  disabled:bg-gray-100"
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-black  font-semibold text-white py-2 px-4 rounded-md disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
            <div className="text-center text-sm mt-2">
                Already have an account ?<Link href={'/login'} className=' underline text-blue-700'> Login</Link>
            </div>

            {error && (
                <p className="mt-4 text-red-500 text-center">{error}</p>
            )}
            {success && (
                <p className="mt-4 text-green-500 text-center">{success}</p>
            )}
        </div>
    );
};

export default SignUp;