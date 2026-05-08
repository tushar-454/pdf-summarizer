export const dynamic = "force-dynamic";
import PdfList from "../components/PdfList";
import UploadSection from "../components/UploadSection";

export default function Home() {
    return (
        <div>
            <main>
                <UploadSection />
                <PdfList />
            </main>
        </div>
    );
}
