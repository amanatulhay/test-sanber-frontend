import type { LoaderFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Await, defer, Link, useAsyncValue, useLoaderData, useNavigate } from "@remix-run/react";
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
      { title: "Hobby List" },
      { name: "description", content: "Hobby List" },
    ];
};

export const loader = async ({params}: LoaderFunctionArgs) => {
  try {
    const response = await fetch(`${baseUrl}person/hobby/${params.person_id}`);
    if (!response.ok){
      throw new Error('Failed to fetch data');
    }
    const hobbies = await response.json();

    const responsePerson = await fetch(`${baseUrl}person/${params.person_id}`);
    if (!responsePerson.ok){
      throw new Error('Failed to fetch data Person');
    }
    const person = await responsePerson.json();
    return defer ({ hobbies, person });
  } catch (error) {
    console.error('Error fetching data:', error);
    return ({ hobbies: [], person: null });
  }
};

export default function Person() {
    const { hobbies, person } : { hobbies : any, person : any } = useLoaderData();
    const navigate = useNavigate();
    const {account} = authStore();

    const handleEdit = async (id: number) => {
        navigate('/dashboard/person/' + person.id + '/hobby/' + id + '/edit');
    };

    const handlePost = async () => {
        navigate('/dashboard/person/' + person.id + '/hobby/create');
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this hobby?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then( async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${baseUrl}hobby/${id}`, {headers: {"Authorization" : "Bearer "+ account?.token }})
                .then(() => {
                    Swal.fire({
                        title: 'Success!',
                        text: `Successfully Delete hobby!`,
                        icon: 'success',
                    }).then(() => {
                        navigate("/dashboard/person/" + person.id + "/hobby")      
                    });
                }).catch((e) => {
                    let response = e.response;
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to delete hobby.",
                    });
                    console.log(response)
                })
            } 
            navigate("/dashboard/person/" + person.id + "/hobby")           
        });
    };

    const HobbyList = () => {
  
      return (
        <>
        <h1 className="text-2xl my-2 font-bold"> <FaPerson className="inline-block mr-1 mb-2"/> Data Hobby for {person.name}</h1>
        <hr />
        <button onClick={()=>{
                    handlePost()
                    }}
            className="my-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Post Hobby
        </button>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            {['No', "Nama", "Action"].map((e, i) => (
                                <th className={`px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider text-center ${i == 0 && 'w-3.5'}`} key={i}>
                                    {e}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {hobbies?.map((item : any, i: number) => (
                        <tr key={i}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{i + 1}.</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 text-center bg-white text-sm ">
                                {item.name} 
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                <div className="flex justify-center space-x-1">
                                    <button type="button" className='bg-yellow-400 text-white rounded-lg text-xs text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-yellow-500' onClick={() => handleEdit(item.id) } >
                                        <FaPen className="inline-block text-xs"  />
                                    </button>
                                    <button type="button" className='bg-red-500 text-white rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-red-600' onClick={() => handleDelete(item.id) } >
                                        <FaRegTrashAlt className="inline-block text-xs"  />
                                    </button>
                                </div>
                            </td>
                        </tr>

                    ) )}
                    { ((!hobbies) || (hobbies.length == 0)) &&
                        <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap"> </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 text-center bg-white text-sm ">
                                -- No data --
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
        </>
      )
    };

    return (
        <>            
            <Suspense fallback={<h2>Please Wait...</h2>}>
                <HobbyList />
            </Suspense>
            <Link to="/dashboard/person" className="my-8 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-16 py-2.5 me-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Back to Person Table</Link>
        </>
    )
}