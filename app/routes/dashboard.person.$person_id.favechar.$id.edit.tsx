import { MetaFunction, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import FaveCharForm from "../components/Forms/FaveCharForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Update Fave Char" },
    { name: "description", content: "Update Fave Char" },
  ];
};

export const loader = async ({params}: LoaderFunctionArgs) => {
  let response = await axios.get(`${baseUrl}favorite-character/${params.id}`);
  let person_id = params.person_id
  return ({ response, person_id });
}

const UpdateFaveChar = ()=>{
    const { response, person_id } : { response : any, person_id : any } = useLoaderData();
    
    return(
        <>
        <FaveCharForm formType="Update" formValues={response.data} person_id={person_id}/>
        </>
    )
}

export default UpdateFaveChar