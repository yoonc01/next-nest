import { NextResponse } from "next/server";

const DB = [
  { id: 1, name: "hyoyoon1" },
  { id: 2, name: "hyoyoon2" },
  { id: 3, name: "hyoyoon3" },
];

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const name = searchParams.get("name") as string;
  return NextResponse.json({
    users: DB.filter(user => user.name.includes(name)),
  });
}
