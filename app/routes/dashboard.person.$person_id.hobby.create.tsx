import { MetaFunction, useLoaderData } from "@remix-run/react";
import HobbyForm from "../components/Forms/HobbyForm";
import { LoaderFunctionArgs } from "@remix-run/node";
import { baseUrl } from "~/utils/constants";
import axios from "axios";

export const meta: MetaFunction = () => {
  return [
    { title: "Create Hobby" },
    { name: "description", content: "Create Hobby" },
  ];
};

export const loader = async ({params}: LoaderFunctionArgs) => {
  let person_id = params.person_id
  return ({ person_id });
}

const CreateHobby = ()=>{
    const { person_id } : { person_id : any } = useLoaderData();
      
    return(
        <>
        <HobbyForm formType="Create" person_id={person_id}/>
        </>
    )
}

export default CreateHobby