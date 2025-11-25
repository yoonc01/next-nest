import { NextResponse } from "next/server";

export async function GET(_: Request) {
    return NextResponse.json({
        users: [
            {id: 1, name: "hyoyoon1"},
            {id: 2, name: "hyoyoon2"},
            {id: 3, name: "hyoyoon3"},
        ]
    })
}