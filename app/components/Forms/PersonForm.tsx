import { Link, useNavigate } from "@remix-run/react"
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import Swal from "sweetalert2";
import authStore from "../../stores/auth";
import { ChangeEvent } from "react";


interface FormValues{
    name: string,
    email: string,
    phone: string,
    image: string,
    id: number,
}

interface PersonFormProps{
    formType: string
    formValues?: FormValues
}

const PersonForm = ({formType, formValues}: PersonFormProps)=>{
    const { register, handleSubmit, setValue } = useForm<FormValues>()
    const navigate = useNavigate()
    const { account } = authStore()

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {    
            if (formValues?.id){
                if (!data.image){
                    setValue('image', formValues.image);
                }
                await axios.put(`${baseUrl}person/${formValues.id}`,
                    {name: data.name, email: data.email, phone: data.phone, image: data.image},
                    {headers: {"Authorization": `Bearer ${account?.token}`}}
                );
            } else {
                await axios.post(`${baseUrl}person`,
                    {name: data.name, email: data.email, phone: data.phone, image: data.image},
                    {headers: {"Authorization": `Bearer ${account?.token}`}}
                );
            }
            Swal.fire({
                title: "SUCCESS",
                text: "Successfully submit Form Person!",
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
        navigate("/dashboard/person")
    }

    const handleUpload = async (event: ChangeEvent)=>{
        const form = new FormData();
        if ((formValues?.image != "")&&(formValues?.image != undefined)){
            console.log(formValues?.image)
            try {
                await axios.delete(`${baseUrl}delete-image`, {data: { imageUrl: formValues?.image }}) 
            } catch (err){
                console.log(err)
            }
        }
    
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            form.append('file', file);
            try {
                let response = await axios.post(`${baseUrl}upload-image`, form)
                Swal.fire({
                    title: "SUCCESS",
                    text: "Successfully upload image Person!",
                    icon: "success",
                });
                console.log(response.data.file)
                setValue('image', response.data.file);
            } catch (err){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to upload image. Please try again.",
                });
                console.log(err)
            }
        }
    }

    return(
        <>
            <div className="mb-10">
                <h2 className="text-2xl font-semibold leading-tight text-black">
                {formType} Person
                </h2>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Form Person
                    </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Name
                        </label>
                        <input required  {...register("name")} defaultValue={formValues?.name} type="text" name="name" placeholder="Name Input" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                    </div>
                      
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Email
                        </label>
                        <input required {...register("email")} defaultValue={formValues?.email} type="email" name="email" placeholder="Email Input" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                    </div>

                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Phone
                        </label>
                        <input required  {...register("phone")} defaultValue={formValues?.phone} type="text" name="phone" placeholder="Phone Input" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                    </div>

                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Image 
                    </label>

                    <div className="w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white">
                        {formValues?.id && <input type="file"  placeholder="Input The Image" onChange={handleUpload} />}
                        {!formValues?.id && <input required type="file"  placeholder="Input The Image" onChange={handleUpload} />}
                    </div>

                    <div className="flex justify-between">
                        <Link to="/dashboard/person" className="my-8 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-16 py-2.5 me-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Back to Table</Link>                       
                        <button type="submit" className="my-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-16 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>                         
                    </div>
                </div>
            </form>
        </>
    )
}

export default PersonForm