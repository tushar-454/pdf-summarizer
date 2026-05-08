import { summaries } from "@/db/schema";
import type { MessageBatch } from "@cloudflare/workers-types";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import worker from "./.open-next/worker";

export default {
    fetch: worker.fetch,

    async queue(batch: MessageBatch<{ content: string }>, env: CloudflareEnv) {
        const client = postgres(env.pdf_summarizer.connectionString, {
            prepare: false,
            ssl: false,
            max: 5,
        });
        const db = drizzle(client);

        for (const message of batch.messages) {
            const { content } = message.body;

            const result: AiSummarizationOutput = await env.AI.run(
                "@cf/facebook/bart-large-cnn",
                { input_text: content },
            );

            const maxTitleLength = 256;
            const maxTextLength = 10000;
            const summary = result.summary?.trim();
            const titleBase =
                content.length > 50 ? content.slice(0, 50) + "..." : content;
            const title = titleBase.slice(0, maxTitleLength);
            const safeContent = content.slice(0, maxTextLength);

            if (summary) {
                await db.insert(summaries).values({
                    title,
                    summary: summary.slice(0, maxTextLength),
                    content: safeContent,
                });
            }
        }
    },
};
