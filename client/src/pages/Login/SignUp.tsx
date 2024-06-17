import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Input from '../../components/Input/Input';
import {
    useRegisterUserMutation
} from '../../config/Api';
import { useNavigate } from 'react-router-dom';

interface FormData {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
}

function SignUp({ setPageType }: { setPageType: React.Dispatch<React.SetStateAction<"login" | "signUp">> }) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormData>();
    const [registerUser] = useRegisterUserMutation();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data);

        await registerUser(data)
            .unwrap()
            .then((response) => {
                if (response.success) {
                    setPageType("login");
                }
            })
            .catch((err) => console.log("something went wrong"));
    }

    return (
        <section className='backdrop-blur-xl absolute transform z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className='flex items-center justify-between'>
                        <h2 className="text-2xl font-bold leading-tight text-black">
                            Sign up
                        </h2>
                        <p
                            onClick={() => (setPageType("login"))}
                            className='hover:cursor-pointer font-medium text-xl'
                        >X</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                        <div className="space-y-5">
                            <div className='grid grid-cols-2 gap-5'>
                                <Input type='text' placeholder='Full name' label='Full name' name='full' register={register} required />
                            </div>
                            <Input type='text' placeholder='username' label='Username' name='username' register={register} required />
                            <div>
                                <label htmlFor="email" className="text-base font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        {...register("email", {
                                            required: true,
                                            pattern: {
                                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                                message: "Email must be a valid address"
                                            }
                                        })}
                                        autoComplete="email"
                                        id="email"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Password"
                                        {...register("password", { required: true })}
                                        id="password"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Get started{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="ml-2"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignUp;
