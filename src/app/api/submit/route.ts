import { NextResponse } from "next/server";

interface SubmittedRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  supervisor: string;
}

const throwParamEx = (body: SubmittedRequest) => {
  const msg = "\nThe following parameters are required:";

  throw Error(
    `${msg}\n${body.firstName === "" ? "- first name\n" : ""}${
      body.lastName === "" ? "- last name\n" : ""
    }${body.supervisor === "" ? "- supervisor\n" : ""}`
  );
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, supervisor } = body;

    console.log(
      firstName === ""
        ? throwParamEx(body)
        : lastName === ""
        ? throwParamEx(body)
        : supervisor === ""
        ? throwParamEx(body)
        : supervisor === "select"
        ? throwParamEx(body)
        : body
    );

    fetch("https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    }).then(() => {
      console.log(
        "Form data sent to https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/submit!"
      );
    });

    return new NextResponse(body, { status: 200 });
  } catch (error) {
    return new NextResponse("Error posting data: " + error, { status: 500 });
  }
}
