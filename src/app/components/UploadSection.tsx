"use client";

import { handlePdfUpload } from "@/actions";
import { ChangeEvent, useState } from "react";

export default function UploadSection() {
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        setIsUploading(true);

        try {
            await handlePdfUpload(formData);
            form.reset();
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <h2>Upload PDF File</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    id="content"
                    name="content"
                    placeholder="Enter PDF content here..."
                ></textarea>
                <button
                    type="submit"
                    disabled={isUploading}
                >
                    {isUploading ? "Uploading..." : "Upload"}
                </button>
            </form>
        </div>
    );
}
