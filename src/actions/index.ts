"use server";

// handle pdf uplaod section

import { getDB } from "@/db";
import { pdfs } from "@/db/schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function handlePdfUpload(form: FormData) {
    const { env } = await getCloudflareContext({ async: true });
    const content = form.get("content") as string;
    if (!content) {
        throw new Error("Content is required");
    }

    const data = {
        content,
    };
    try {
        const db = await getDB();
        await db.insert(pdfs).values(data);
        // send content to queue for processing
        await env.pdf_summarizer_queue.send({
            content,
        });
    } catch (error) {
        console.error("Error uploading PDF content:", error);
        throw error;
    }
}
