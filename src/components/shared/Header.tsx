import Link from "next/link";

export default function Header() {
    return (
        <header>
            <ul className="flex gap-4">
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/summaries"}>Summaries</Link>
                </li>
            </ul>
        </header>
    );
}
