import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "hyoyoon",
  description: "hyoyoon",
};
export default function Home() {
  return (
    <main>
      HOME
      <Link href="/dashboard">Go To Dashboard</Link>
    </main>
  );
}
