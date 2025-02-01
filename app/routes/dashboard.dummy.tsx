import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
      { title: "Dummy Page" },
      { name: "description", content: "Dummy Page" },
    ];
};

export default function Person() {

    return (
        <h1 className="text-black">This is a Dummy Page</h1>
    )
}