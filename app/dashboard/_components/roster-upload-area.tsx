import { useDropzone } from "react-dropzone";

import { PreviewTable } from "./preview-table";
import { RosterData } from "./register-button";

interface RosterUploadAreaProps {
    uploadedFile: File | null;
    parsedData: RosterData[];
    isRegistering: boolean;
    onDrop: (acceptedFiles: File[]) => void;
}

export const RosterUploadArea = ({
    uploadedFile,
    parsedData,
    isRegistering,
    onDrop,
}: RosterUploadAreaProps) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "text/csv": [".csv"],
        },
        multiple: false,
        disabled: isRegistering,
    });

    return (
        <div className="space-y-4 flex-1 min-h-[400px]">
            <div className="text-sm">
                <strong>
                    CSV must have these columns: first_name, last_name, email
                </strong>
            </div>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer h-[calc(100%-3rem)] ${
                    isDragActive ? "border-primary" : "border-gray-300"
                } ${isRegistering ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <input {...getInputProps()} />
                <div
                    className={`text-lg text-muted-foreground mb-4 ${
                        !uploadedFile
                            ? "h-full flex flex-col items-center justify-center"
                            : "sticky top-0 bg-background py-2"
                    }`}
                >
                    {uploadedFile ? (
                        `File uploaded: ${uploadedFile.name}`
                    ) : (
                        <>
                            Put your roster in CSV format here.
                            <br />
                            CSV must have these columns: first_name, last_name,
                            email.
                        </>
                    )}
                </div>
                <div className="overflow-auto">
                    <PreviewTable data={parsedData} />
                </div>
            </div>
        </div>
    );
};
