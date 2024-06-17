import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from "react-hook-form";
import { setLogin } from '../../state/authSlice';
import {
    useLoginMutation,
} from '../../config/Api';
import { useNavigate } from 'react-router-dom';
import { Authenticated } from '../../components';

import SignUp from './SignUp';

interface FormData {
    email: string;
    password: string;
}

interface Response {
    success: boolean;
    data: {
        _id: string;
        email: string;
        posts: [];
        followers: [];
        following: [];
    };
    message: string;
    statusCode: number;
}


function LoginPage() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageType, setPageType] = useState<"login" | "signUp">("login");
    const { register, handleSubmit } = useForm<FormData>();

    const [login] = useLoginMutation();
 

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        await login(data)
            .unwrap()
            .then((response) => {
                dispatch(setLogin({ data: response.data }));
                navigate("/home")
            })
            .catch((err) => "")
    };

    return (
        <Authenticated>
            <>
                {pageType === "signUp" && <SignUp setPageType={setPageType} />}
                <section>
                    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                            <h2 className="text-center text-2xl font-bold leading-tight text-black">
                                Sign in to your account
                            </h2>
                            <p onClick={() => setPageType("signUp")} className="mt-2 text-center text-sm text-gray-600 ">
                                Don&#x27;t have an account?{" "}
                                <span className="hover:cursor-pointer font-semibold text-black transition-all duration-200 hover:underline">
                                    Create a free account
                                </span>
                            </p>
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                                <div className="space-y-5">
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
                                            {pageType === "login" && (
                                                <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                                                    Forgot password?
                                                </a>
                                            )}
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
            </>
        </Authenticated>
    );
}

export default LoginPage;
