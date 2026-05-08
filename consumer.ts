import { summaries } from "@/db/schema";
import type { MessageBatch } from "@cloudflare/workers-types";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import worker from "./.open-next/worker";

export default {
    fetch: worker.fetch,

    async queue(batch: MessageBatch<{ content: string }>, env: CloudflareEnv) {
        const client = postgres(env.pdf_summarizer.connectionString, {
            ssl: "require",
            max: 5,
        });
        const db = drizzle(client);

        for (const message of batch.messages) {
            const { content } = message.body;

            const result: AiSummarizationOutput = await env.AI.run(
                "@cf/facebook/bart-large-cnn",
                { input_text: content },
            );

            const summary = result.summary;
            const title = content.slice(0, 50) + "...";

            if (summary) {
                await db.insert(summaries).values({
                    title,
                    summary,
                    content,
                });
            }
        }
    },
};
