import { Link, useNavigate } from "@remix-run/react"
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import Swal from "sweetalert2";
import authStore from "../../stores/auth";


interface FormValues{
    origin: string,
    name: string,
    id: number,
}

interface FaveCharFormProps{
    formType: string
    formValues?: FormValues
    person_id: number
}

const FaveCharForm = ({formType, formValues, person_id}: FaveCharFormProps)=>{
    const { register, handleSubmit } = useForm<FormValues>()
    const navigate = useNavigate()
    const { account } = authStore()

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {    
            if (formValues?.id){
                await axios.put(`${baseUrl}favorite-character/${formValues.id}`,
                    {name: data.name, origin: data.origin, person_id: Number(person_id)},
                    {headers: {"Authorization": `Bearer ${account?.token}`}}
                );
            } else {
                await axios.post(`${baseUrl}favorite-character`,
                    {name: data.name, origin: data.origin, person_id: Number(person_id)},
                    {headers: {"Authorization": `Bearer ${account?.token}`}}
                );
            }
            Swal.fire({
                title: "SUCCESS",
                text: "Successfully submit Form Fave Char!",
                icon: "success",
            });
        } catch (err){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to submit form. Please try again.",
            });
            console.log(err)
        }
        navigate(`/dashboard/person/${person_id}/favechar`)
    }

    return(
        <>
            <div className="mb-10">
                <h2 className="text-2xl font-semibold leading-tight text-black">
                {formType} Fave Char
                </h2>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Form Fave Char
                    </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Origin
                        </label>
                        <input required  {...register("origin")} defaultValue={formValues?.origin} type="text" name="origin" placeholder="Origin Input" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                    </div>
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Name
                        </label>
                        <input required  {...register("name")} defaultValue={formValues?.name} type="text" name="name" placeholder="Name Input" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                    </div>

                    <div className="flex justify-between">
                        <Link to={`/dashboard/person/${person_id}/favechar`} className="my-8 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-16 py-2.5 me-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Back to Table</Link>                       
                        <button type="submit" className="my-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-16 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>                         
                    </div>
                </div>
            </form>
        </>
    )
}

export default FaveCharForm