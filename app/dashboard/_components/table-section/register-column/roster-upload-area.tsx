import { TableInDialog } from "@/app/dashboard/_components/table-section/table-in-dialog";
import { RosterData } from "@/app/dashboard/types";

import { useDropzone } from "react-dropzone";

interface RosterUploadAreaProps {
    uploadedFile: File | null;
    parsedData: RosterData[];
    isRegistering: boolean;
    onDrop: (acceptedFiles: File[]) => void;
}

const TemplateDownload = () => (
    <div className="text-sm">
        <strong>
            Download the roster template here:{" "}
            <a
                href="/templates/Template_SheGotBuckets_EventRegistration.csv"
                download="SheGotBuckets_EventRegistration_Template.csv"
                className="text-blue-500 hover:underline"
                onClick={(e) => e.stopPropagation()}
            >
                Roster CSV Template
            </a>
        </strong>
        <br />
        <p>
            Fill it out and upload it below. CSV must have these columns:
            first_name, last_name, email, jersey_number.
        </p>
    </div>
);

const EmptyUploadState = () => (
    <div className="flex flex-col items-center justify-center text-lg text-muted-foreground h-full">
        Put your roster in CSV format here.
        <br />
        CSV must have these columns: first_name, last_name, email,
        jersey_number.
    </div>
);

const UploadedFileState = ({
    uploadedFile,
    parsedData,
}: {
    uploadedFile: File;
    parsedData: any[];
}) => (
    <div className="h-full flex flex-col">
        <div className="bg-background py-2 mb-4 text-lg text-muted-foreground">
            File uploaded: {uploadedFile.name}
        </div>
        <div className="flex-1 min-h-0">
            {parsedData.length > 0 && (
                <TableInDialog
                    headers={Object.keys(parsedData[0])}
                    data={parsedData}
                    renderRow={(row) => Object.values(row)}
                />
            )}
        </div>
    </div>
);

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
            "text/plain": [".txt"],
            "text/excel": [".xlsx"],
        },
        multiple: false,
        disabled: isRegistering,
    });

    return (
        <div className="space-y-4 h-full flex flex-col">
            <TemplateDownload />
            <div
                {...getRootProps()}
                className={`flex-1 border-2 border-dashed rounded-md p-8 text-center cursor-pointer ${
                    isDragActive ? "border-primary" : "border-gray-300"
                } ${isRegistering ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <input {...getInputProps()} />
                {uploadedFile ? (
                    <UploadedFileState
                        uploadedFile={uploadedFile}
                        parsedData={parsedData}
                    />
                ) : (
                    <EmptyUploadState />
                )}
            </div>
        </div>
    );
};
