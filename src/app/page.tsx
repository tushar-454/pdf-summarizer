export const dynamic = "force-dynamic";
import PdfList from "../components/PdfList";
import UploadSection from "../components/UploadSection";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
            <main className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
                    <UploadSection />
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
                    <PdfList />
                </div>
            </main>
        </div>
    );
}
