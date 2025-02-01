import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Await, defer, useAsyncValue, useLoaderData, useNavigate } from "@remix-run/react";
import { Suspense } from "react";
import { baseUrl } from "../utils/constants";

export const meta: MetaFunction = () => {
  return [
    { title: "Iconic Profiles" },
    { name: "description", content: "Searching through your favorite figure's profile!" },
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

export default function Index() {
  const loader : { persons : any } = useLoaderData();

  const PersonList = () => {
    const persons: any = useAsyncValue();

    return (
      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 mb-4">
        {persons.map((person: any) =>
          <div key={person.id} className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <div className="rounded-t-lg relative w-full h-[200px] bg-gray-200 overflow-hidden rounded-lg mb-5 p-2 flex space-x-4 flex items-center justify-center">
                <img className="rounded-t-lg mb-5 bg-grey-400" src={person.image} alt="" />
            </div>
            <h3 className="mb-4 text-2xl font-semibold">{person.name}</h3>
            <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                    <svg className="me-2 h-4 w-4 shrink-0 text-green-500 dark:green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"></path>
                    </svg>
                    <span>Email: {person.email}</span>
                </li>
                <li className="flex items-center space-x-3">
                    <svg className="me-2 h-4 w-4 shrink-0 text-green-500 dark:green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"></path>
                    </svg>
                    <span>Phone: {person.phone}</span>
                </li>
            </ul>
          </div>
        )}
      </div>
    )
  };

  return (
    <div className="min-h-screen mt-4 w-full mx-auto max-w-[1440px] relative ">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Iconic Profiles</span>
          </h1>
          <div className="h-[144px] w-[434px] items-center justify-center flex rounded-3xl border border-gray-200 dark:border-gray-700">
            <p className="leading text-3xl text-gray-700 dark:text-gray-200">
              Iconic Profiles
            </p>
          </div>
        </header>
        <Suspense fallback={<h2>Please Wait...</h2>}>
          <Await resolve={loader.persons}>
            <PersonList />
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
