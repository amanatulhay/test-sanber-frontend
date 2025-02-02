import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Await, defer, useAsyncValue, useLoaderData, useNavigate } from "@remix-run/react";
import { Suspense } from "react";
import { baseUrl } from "../utils/constants";
import Swal from "sweetalert2";
import axios from "axios";
import authStore from "~/stores/auth";
import { FaPerson } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

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

    const handleHobby = async (person_id: number) => {
        navigate('/dashboard/person/' + person_id + '/hobby' );
    };

    const handleFave = async (person_id: number) => {
        navigate('/dashboard/person/' + person_id + '/favechar' );
    };

    const handlePost = async () => {
        navigate('/dashboard/person/create');
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this person?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const personToDelete = loader.persons?.find((obj: any) => obj.id === id);

                await axios.delete(`${baseUrl}person/${id}`, {
                    headers: { "Authorization": "Bearer " + account?.token }
                });
                Swal.fire({
                    title: 'Success!',
                    text: `Successfully deleted person!`,
                    icon: 'success',
                });

                if (personToDelete?.image) {
                    try {
                        await axios.delete(`${baseUrl}delete-image`, { data: { imageUrl: personToDelete.image } });
                    } catch (err) {
                        console.log('Error deleting image:', err);
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to delete person. Please make sure to delete the hobby & fave chars of this person first!",
                });
                console.error(error);
            }
            navigate("/dashboard/person");
        } else {
            navigate("/dashboard/person");
        }
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
                                        <FaPen className="inline-block text-xs"  />
                                    </button>
                                    <button type="button" className='bg-red-500 text-white rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-red-600' onClick={() => handleDelete(item.id) } >
                                        <FaRegTrashAlt className="inline-block text-xs"  />
                                    </button>
                                    <button type="button" className='bg-green-500 text-white rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-green-600' onClick={() => handleHobby(item.id) } >
                                        <IoEyeSharp className="inline-block text-xs mr-1"  />
                                        Hobby
                                    </button>
                                    <button type="button" className='bg-blue-500 text-white rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-blue-600' onClick={() => handleFave(item.id) } >
                                        <IoEyeSharp className="inline-block text-xs mr-1"  />
                                        Fave Chars
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
            <h1 className="text-2xl my-2 font-bold"> <FaPerson className="inline-block mr-1 mb-2"/> Data Person</h1>
            <hr />
            <button onClick={()=>{
                        handlePost()
                        }}
                className="my-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Post New Person
            </button>
            <Suspense fallback={<h2>Please Wait...</h2>}>
            <Await resolve={loader.persons}>
                <PersonList />
            </Await>
            </Suspense>
        </>
    )
}