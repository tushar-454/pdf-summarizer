"use server";

// handle pdf uplaod section

import { getDB } from "@/db";
import { pdfs } from "@/db/schema";

export async function handlePdfUpload(form: FormData) {
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
    } catch (error) {
        console.error("Error uploading PDF content:", error);
        throw error;
    }
}
