import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/Home"}>
        <h1>GO TO /Home</h1>
      </Link>
    </>
  );
}
