import Image from "next/image";

import Form from "./components/Form";

export default function Home() {
  return (
    <main className="p-24">
      <h1 className="text-2xl" data-testid="form-title">
        Backend Coding Challenge - Input Form
      </h1>
      <br />
      <Form />
    </main>
  );
}
