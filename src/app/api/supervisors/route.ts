import { NextResponse } from "next/server";
import { SupervisorList } from "./types/SupervisorList";

export async function GET() {
  try {
    const res: SupervisorList[] = await fetch(
      "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers",
      { cache: "no-store" }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });

    return new NextResponse(
      JSON.stringify(
        res
          .filter((item: SupervisorList) => !/\d/.test(item.jurisdiction))
          .map((item: SupervisorList) => {
            return `${item.jurisdiction} - ${item.lastName}, ${item.firstName}`;
          })
          .sort()
      ),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error fetching manager data: " + error, {
      status: 500,
    });
  }
}
