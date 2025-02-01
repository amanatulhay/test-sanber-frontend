import { MetaFunction } from "@remix-run/react";
import PersonForm from "../components/Forms/PersonForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Create Person" },
    { name: "description", content: "Create Person" },
  ];
};

const CreatePerson = ()=>{
    return(
        <>
        <PersonForm formType="Create"/>
        </>
    )
}

export default CreatePerson