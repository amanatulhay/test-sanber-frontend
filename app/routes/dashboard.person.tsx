import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Await, defer, useAsyncValue, useLoaderData, useNavigate } from "@remix-run/react";
import { Suspense } from "react";
import { baseUrl } from "../utils/constants";
import Swal from "sweetalert2";
import axios from "axios";
import authStore from "~/stores/auth";

export const meta: MetaFunction = () => {
    return [
      { title: "Person List" },
      { name: "description", content: "Person List" },
    ];
};

export const loader: LoaderFunction = async () => {
  try {
    const response = await fetch(`${baseUrl}person`);
    if (!response.ok){
      throw new Error('Failed to fetch data');
    }
    const persons = await response.json();
    return defer ({ persons, });
  } catch (error) {
    console.error('Error fetching data:', error);
    return ({ persons: [] });
  }
};

export default function Person() {
    const loader : { persons : any } = useLoaderData();
    const navigate = useNavigate();
    const { account } = authStore();

    const handleEdit = async (id: number) => {
        navigate('/dashboard/person/' + id + '/edit');
    };

    const handleHapus = async (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Apa kamu yakin akan menghapus product ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then( async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${baseUrl}person/${id}`, {headers: {"Authorization" : "Bearer "+ account?.token }})
                .then(() => {
                    Swal.fire({
                        title: 'Success!',
                        text: `Berhasil Delete product!`,
                        icon: 'success',
                    }).then(() => {
                        navigate("/dashboard/person") 
                    });
                }).catch((e) => {
                    let response = e.response;
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to delete product. Please make sure to delete the review/transaction of this product first!",
                    });
                    console.log(response)
                })
            } 
            navigate("/dashboard/person")           
        });
    };

    const PersonList = () => {
      const persons: any = useAsyncValue();
  
      return (
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            {['No', "Nama", "Email", "Phone", "Action"].map((e, i) => (
                                <th className={`px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider text-center ${i == 0 && 'w-3.5'}`} key={i}>
                                    {e}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {persons?.map((item : any, i: number) => (
                        <tr key={i}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{i + 1}.</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                <div className="flex items-center justify-center space-x-2">
                                        <img
                                            src={item.image}
                                            alt="Product Image"   
                                            width={"100px"}
                                            height="100px"
                                            className="rounded-md"
                                        />
                                </div>
                                <div className="ml-2 mt-2">
                                    {item.name}
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 text-center bg-white text-sm ">
                                {item.email} 
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 text-center bg-white text-sm ">
                                {item.phone} 
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                <div className="flex justify-center space-x-1">
                                    <button type="button" className='bg-yellow-400 text-white rounded-lg text-xs text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-yellow-500' onClick={() => handleEdit(item.id) }>
                                        {/* <Icon name="edit-2" className="inline-block text-xs"  /> */}Edit
                                    </button>
                                    <button type="button" className='bg-red-500 text-white rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-red-600' onClick={() => handleHapus(item.id) } >
                                        {/* <Icon name="trash" className="inline-block text-xs"  /> */}Delete
                                    </button>
                                </div>
                            </td>
                        </tr>

                    ) )}
                    </tbody>
                </table>
            </div>
        </div>
      )
    };

    return (
        <>
            <h1 className="text-black">Person List</h1>
            <Suspense fallback={<h2>Please Wait...</h2>}>
            <Await resolve={loader.persons}>
                <PersonList />
            </Await>
            </Suspense>
        </>
    )
}