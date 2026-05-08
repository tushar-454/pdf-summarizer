import { getDB } from "@/db";
import { summaries } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function Summaries() {
    const db = await getDB();
    const data = await db
        .select()
        .from(summaries)
        .orderBy(desc(summaries.createdAt));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
                    Your Summaries
                </h1>

                {data.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            No summaries yet
                        </h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                            Upload a PDF to get started.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {data.map((summary) => (
                            <article
                                key={summary.id}
                                className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="p-6 sm:p-8">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                                        {summary.title || "Untitled Document"}
                                    </h2>
                                    <div className="prose prose-sm sm:prose-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {summary.summary}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
