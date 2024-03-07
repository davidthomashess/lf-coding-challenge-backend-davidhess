"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

export default function Form() {
  let hostname = "";
  if (typeof window !== "undefined") {
    hostname = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
  }

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [supervisorData, setSupervisorData] = useState<string[]>([]);
  const [supervisor, setSupervisor] = useState("select");

  const [isClient, setIsClient] = useState(false); // For password managers

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch(`${hostname}/api/supervisors`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setSupervisorData(data);
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            console.error(error);
          }
        });

      setIsClient(true);
    }
  }, [hostname]);

  if (!isClient) return null;

  const handleFNameChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    setFName(target.value);
  };

  const handleLNameChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    setLName(target.value);
  };

  const handleEmailChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    setEmail(target.value);
  };

  const handlePhoneChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    setPhone(target.value);
  };

  const handleSupervisorChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    setSupervisor(target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const postData = JSON.stringify({
      firstName: fName,
      lastName: lName,
      email: email,
      phone: phone,
      supervisor: supervisor,
    });
    console.log(`handleSubmit captured: ${postData}`);

    fetch(`${hostname}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: postData,
    }).then(() => {
      console.log(
        `Form data sent to ${hostname}/api/submit! (Check your terminal)`
      );
    });
  };

  return (
    <div className="grid place-content-left">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="pr-0" data-testid="form-fname-label">
          <p data-testid="form-fname">First Name</p>
          <input
            className="w-48 bg-black border-2 border-white"
            id="fname"
            name="fname"
            type="text"
            value={fName}
            onChange={(e) => handleFNameChange(e)}
          />
        </label>
        <br />
        <br />
        <label className="pr-0" data-testid="form-lname-label">
          <p data-testid="form-lname">Last Name</p>
          <input
            className="w-48 bg-black border-2 border-white"
            id="lname"
            name="lname"
            type="text"
            value={lName}
            onChange={(e) => handleLNameChange(e)}
          />
        </label>
        <br />
        <br />
        <label className="pr-0" data-testid="form-email-label">
          <p data-testid="form-email">Email (Optional)</p>
          <input
            className="w-48 bg-black border-2 border-white"
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => handleEmailChange(e)}
          />
        </label>
        <br />
        <br />
        <label className="pr-0" data-testid="form-phone-label">
          <p data-testid="form-phone">Phone (Optional)</p>
          <input
            className="w-48 bg-black border-2 border-white"
            id="email"
            name="email"
            type="text"
            value={phone}
            onChange={(e) => handlePhoneChange(e)}
          />
        </label>
        <br />
        <br />
        <label className="pr-0" data-testid="form-supervisor-label">
          <p data-testid="form-supervisor">Supervisor</p>
          <select
            className="bg-black border-2 border-white"
            value={supervisor}
            onChange={(e) => handleSupervisorChange(e)}
          >
            <option value="select">Select</option>
            {supervisorData.map((item: string, index: number) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </label>
        <br />
        <br />
        <input
          className="
            bg-dark-grey-blue 
            text-white 
            rounded 
            cursor-pointer 
            w-28 border-2 
            border-white 
            h-10
          "
          type="submit"
          value="Submit"
          data-testid="submit-btn"
        />
      </form>
    </div>
  );
}
