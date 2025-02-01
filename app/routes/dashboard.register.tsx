import { useForm, SubmitHandler } from "react-hook-form"
import { MetaFunction } from '@remix-run/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseUrl } from '~/utils/constants';

export const meta: MetaFunction = () => {
  return [
    { title: "Register Form" },
    { name: "description", content: "Register Form" },
  ];
};

interface FormInput {
    username: string;
    password: string;
}

const Register = () => {
    const { register, handleSubmit } = useForm<FormInput>()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        try {     
            let res = await axios.post(`${baseUrl}register`, {username:data.username, password: data.password});
            console.log(res)
            if (res.data === "Register Success"){
                Swal.fire({
                    title: "SUCCESS",
                    text: "Successfully register!",
                    icon: "success",
            });
            navigate("/dashboard/login")
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Error: ${res.data}`,
                });
            }    
        } catch (err){
            if (axios.isAxiosError(err)) {
                console.log('Error:', err.response?.data.message);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Error: ${err.response?.data.message}`,
            });
            } else {
                console.log('Error:', err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to register. Please try again.",
                });
            }
        }
    }

    return (
        <>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 grid grid-cols-1 gap-9 sm:grid-cols-2 h-full">
            <div className="flex flex-col gap-9 h-full justify-center">
            <img
                src="/register.png"
                alt="Register"
                className="w-full h-auto max-h-full object-cover"
                />
            </div>

            <div className="flex flex-col gap-9 h-full justify-center">

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Register Form
                </h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6.5">
                    <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Username
                    </label>
                    <input
                        required
                        {...register("username")}
                        type="text"
                        name="username"
                        autoComplete="off"
                        placeholder="Enter your username"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    </div>

                    <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Password
                    </label>
                    <input
                        required
                        {...register("password")}
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Enter password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    </div>

                    <div className="mt-5 mb-5.5 flex items-center justify-end">
                        <p className="text-sm text-black hover:underline mr-2">Already have an account?</p>
                        <Link to="/dashboard/login" className="text-sm text-primary-500 hover:underline mr-5">
                        Login here
                        </Link>
                    </div>

                    <button className="flex w-full justify-center rounded bg-primary-500 p-3 font-medium text-gray hover:bg-opacity-90">
                    Sign Up
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </>
    );
};

export default Register;
