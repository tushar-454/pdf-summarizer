import type { MessageBatch } from "@cloudflare/workers-types";
import worker from "./.open-next/worker";

export default {
    fetch: worker.fetch,

    async queue(
        batch: MessageBatch<{
            content: string;
        }>,
    ) {
        console.log("QUEUE HIT");
        for (const message of batch.messages) {
            const { content } = message.body;
            console.log("QUEUE CONTENT:", content);
        }
    },
};
