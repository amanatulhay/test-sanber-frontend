import { MetaFunction, useLoaderData } from "@remix-run/react";
import PersonForm from "../components/Forms/PersonForm";
import { LoaderFunctionArgs } from "@remix-run/node";
import axios from "axios";
import { baseUrl } from "~/utils/constants";

export const meta: MetaFunction = () => {
  return [
    { title: "Update Person" },
    { name: "description", content: "Update Person" },
  ];
};

export const loader = async ({params}: LoaderFunctionArgs) => {
  let response = axios.get(`${baseUrl}person/${params.id}`);
  return response;
}

const UpdatePerson = ()=>{
    let res: any = useLoaderData();
    
    return(
        <>
        <PersonForm formType="Update" formValues={res.data}/>
        </>
    )
}

export default UpdatePerson