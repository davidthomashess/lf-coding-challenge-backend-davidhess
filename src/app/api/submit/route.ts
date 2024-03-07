import { NextResponse } from "next/server";

class FetchError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

interface SubmittedRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  supervisor: string;
}

const throwParamEx = (body: SubmittedRequest) => {
  const msg = "\nThe following parameters are required:";

  throw new FetchError(
    500,
    `${msg}\n${body.firstName === "" ? "- first name\n" : ""}${
      body.lastName === "" ? "- last name\n" : ""
    }${
      body.supervisor === "" || body.supervisor === "select"
        ? "- supervisor\n"
        : ""
    }`
  );
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = `${body.firstName}`;
    const lastName = `${body.firstName}`;
    const supervisor = `${body.supervisor}`;

    if (
      firstName === "" ||
      lastName === "" ||
      supervisor === "" ||
      supervisor === "select"
    ) {
      throwParamEx(body);
    } else {
      console.log(body);

      fetch(
        "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body,
        }
      ).then(() => {
        console.log(
          "Form data sent to https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/submit!"
        );
      });
    }

    return new NextResponse(body, { status: 200 });
  } catch (error) {
    throw error;
  }
}
