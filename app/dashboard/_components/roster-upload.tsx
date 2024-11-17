import { useDropzone } from "react-dropzone";

import { PreviewTable } from "./preview-table";
import { RosterData } from "./register-button";

interface RosterUploadProps {
    uploadedFile: File | null;
    parsedData: RosterData[];
    isRegistering: boolean;
    onDrop: (acceptedFiles: File[]) => void;
}

export const RosterUpload = ({
    uploadedFile,
    parsedData,
    isRegistering,
    onDrop,
}: RosterUploadProps) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "text/csv": [".csv"],
        },
        multiple: false,
        disabled: isRegistering,
    });

    return (
        <div className="space-y-4 flex-1 min-h-0 pb-4">
            <div className="text-sm">
                <strong>
                    CSV must have these columns: first_name, last_name, gmail
                </strong>
            </div>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer h-[calc(100%-2rem)] overflow-auto ${
                    isDragActive ? "border-primary" : "border-gray-300"
                } ${isRegistering ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <input {...getInputProps()} />
                <div className="text-lg text-muted-foreground mb-4 sticky top-0 bg-background py-2">
                    {uploadedFile
                        ? `File uploaded: ${uploadedFile.name}`
                        : "Put your roster in CSV format here."}
                </div>
                <PreviewTable data={parsedData} />
            </div>
        </div>
    );
};
