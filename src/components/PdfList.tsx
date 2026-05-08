import { getDB } from "@/db";
import { pdfs } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function PdfList() {
    const db = await getDB();
    const data = await db.select().from(pdfs);

    return (
        <div>
            <h2>Uploaded PDFs</h2>
            <ul>
                {/* This is where the list of uploaded PDFs will be rendered */}
                {data.map((pdf) => (
                    <li key={pdf.id}>{pdf.content.slice(0, 50)}</li>
                ))}
            </ul>
        </div>
    );
}
