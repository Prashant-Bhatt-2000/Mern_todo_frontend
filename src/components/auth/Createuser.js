import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Createuser = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({ username: '', email: '', password: '', confirmPassword: '' })
    const [matcherror, setMatchedError] = useState(false)
    const [passwordValidation, setPasswordValidation] = useState({ valid: true, message: '' });


    let name, value;
    const handleInputs = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;

        if (name === 'password') {
            const isValidPassword = validatePassword(value);
            setPasswordValidation({ valid: isValidPassword, message: isValidPassword ? '' : 'Invalid Password. Your Password should contain Uppercase, special character, numbers and it should be 7 Char long' });
        }

        setUser({ ...user, [name]: value })

        if (name === 'confirmPassword' && user.password !== value) {
            setMatchedError(true)
        } else {
            setMatchedError(false)
        }
    }

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
        return regex.test(password);
    };

    const Post = async (e) => {
        e.preventDefault();

        const { username, email, password, confirmPassword } = user;

        const resp = await fetch('/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                confirmPassword,
            }),
        });

        setUser({ username: '', email: '', password: '', confirmPassword: '' });

        const data = await resp.json();

        if (resp.status === 400) {
            toast.error(data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        } else {
            toast.success(data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });

            setTimeout(()=> { 
                navigate('/login');
            }, 3000)
        }
    };


    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-md border border-gray-300 shadow-md p-4">
                    <img className="mx-auto  h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to Memo App</h2>

                    <form className="mt-4 space-y-6" method="POST">
                        <div>
                            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <div class="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    value={user.username}
                                    onChange={handleInputs}
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="block w-full rounded-md pl-3 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                            </div>
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div class="mt-2">
                                <input id="email" name="email" value={user.email} onChange={handleInputs} type="email" autocomplete="email" required class="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div class="mt-2">
                                <input id="password" name="password" value={user.password} onChange={handleInputs} type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            {passwordValidation.message && (
                                <p className="text-sm text-red-500">{passwordValidation.message}</p>
                            )}
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                                <label for="confirmpassword" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            </div>
                            <div class="mt-2">
                                <input id="confirmpassword" value={user.confirmPassword} name="confirmPassword" onChange={handleInputs} type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            {
                                matcherror ? <p className='text-sm text-red-500'>Passwords Do not mached.</p> : null
                            }
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={Post}>Sign Up</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500 ">
                        Already have an account?
                        <NavLink to="/login" className="px-3 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</NavLink>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Createuser;
