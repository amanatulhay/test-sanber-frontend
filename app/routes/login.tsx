import { useForm, SubmitHandler } from "react-hook-form"
import { Link, MetaFunction, useNavigate } from '@remix-run/react';
import axios from "axios";
import { baseUrl } from "../utils/constants";
import Swal from "sweetalert2";
import authStore from "../stores/auth";

export const meta: MetaFunction = () => {
    return [
      { title: "Login Form" },
      { name: "description", content: "Login Form" },
    ];
};

interface FormInput {
    username: string;
    password: string;
}

export default function Login() {
    const { register, handleSubmit } = useForm<FormInput>()
    const navigate = useNavigate()
    const { login } = authStore()
    
    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        try {     
            let res = await axios.post(`${baseUrl}login`, {username:data.username, password: data.password});
            console.log(res)
            let {access_token: token} = res.data
            login({token, username: data.username})
            Swal.fire({
                title: "SUCCESS",
                text: "Successfully login!",
                icon: "success",
            });
            navigate("/")
        } catch (err){
            if (axios.isAxiosError(err)) {
                console.log('Error:', err.response?.data.message);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Error: ${err.response?.data.message}. Username or password is invalid! `,
                });
            } else {
                console.log('Error:', err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to login. Please try again.",
                });
            }
        }
    }

    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 grid grid-cols-1 gap-40 sm:grid-cols-2 h-full">
            <div className="flex flex-col gap-9 h-full justify-center">
                <img
                    src="/login.png"
                    alt="Login"
                    className="w-full h-auto max-h-full object-cover"
                />
            </div>

            <div className="flex flex-col gap-9 h-full justify-center">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Sign In Form
                        </h3>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                            <label htmlFor="username" className="mb-2.5 block text-black dark:text-white">
                                Username
                            </label>
                            <input
                                {...register("username")}
                                required
                                type="text"
                                name="username"
                                autoComplete="off"
                                placeholder="Enter your username"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            </div>

                            <div>
                            <label htmlFor="password" className="mb-2.5 block text-black dark:text-white">
                                Password
                            </label>
                            <input
                                {...register("password")}
                                required
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            </div>

                            <div className="mt-5 mb-5.5 flex items-center justify-end">
                                <p className="text-sm text-black hover:underline mr-2">Not registered?</p>
                                <Link to="/register" className="text-sm text-primary-600 hover:underline mr-5">
                                    Create an account here
                                </Link>
                            </div>

                            <button type="submit" className="flex w-full justify-center rounded bg-primary-600 p-3 font-medium text-gray hover:bg-opacity-90">
                                Sign In
                            </button>
                        </div>
                    </form>         
                </div>      
            </div>
        </div>
        
    )
}