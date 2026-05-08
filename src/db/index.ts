import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "server-only";

const getClient = async () => {
    const { env } = await getCloudflareContext({ async: true });
    const client = postgres(env.pdf_summarizer.connectionString, {
        prepare: false,
        ssl: false,
    });

    return client;
};

export const getDB = async () => {
    const client = await getClient();
    return drizzle(client);
};
