import { getDB } from "@/db";
import { summaries } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function Summaries() {
    const db = await getDB();
    const data = await db.select().from(summaries);
    console.log(data);
    return (
        <div>
            <h1>Summaries Page</h1>

            <ul>
                {data.map((summary) => (
                    <li key={summary.id}>
                        <h2>{summary.title}</h2>
                        <p className="ml-10">{summary.summary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
