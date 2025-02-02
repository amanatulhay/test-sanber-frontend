import { MetaFunction, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import HobbyForm from "../components/Forms/HobbyForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Update Hobby" },
    { name: "description", content: "Update Hobby" },
  ];
};

export const loader = async ({params}: LoaderFunctionArgs) => {
  let response = await axios.get(`${baseUrl}hobby/${params.id}`);
  let person_id = params.person_id
  return ({ response, person_id });
}

const UpdateHobby = ()=>{
    const { response, person_id } : { response : any, person_id : any } = useLoaderData();
    
    return(
        <>
        <HobbyForm formType="Update" formValues={response.data} person_id={person_id}/>
        </>
    )
}

export default UpdateHobby