import { MetaFunction, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import FaveCharForm from "../components/Forms/FaveCharForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Create Fave" },
    { name: "description", content: "Create Fave Char" },
  ];
};

export const loader = async ({params}: LoaderFunctionArgs) => {
  let person_id = params.person_id
  return ({ person_id });
}

const CreateFaveChar = ()=>{
    const { person_id } : { person_id : any } = useLoaderData();
      
    return(
        <>
        <FaveCharForm formType="Create" person_id={person_id}/>
        </>
    )
}

export default CreateFaveChar