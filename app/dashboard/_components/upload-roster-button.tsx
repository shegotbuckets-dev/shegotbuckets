"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/constants/supabase";
import {
    fetchRegistrations,
    insertMultipleRowsToTable,
} from "@/utils/actions/supabase";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";

export function UploadRosterButton({
    event,
}: {
    event: Database["public"]["Tables"]["events"]["Row"];
}) {
    const { toast } = useToast();
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const onDrop = (acceptedFiles: File[]) => {
        setUploadedFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "text/csv": [".csv"],
        },
        multiple: false,
    });

    const handleConfirmRegistration = () => {
        if (uploadedFile) {
            Papa.parse(uploadedFile, {
                header: true,
                skipEmptyLines: true,
                complete: async (results) => {
                    try {
                        // const regs = await fetchRegistrations();
                        // console.log(regs);
                        // // Then create registration_players entries
                        // const regPlayers = results.data.map((row: any) => {
                        //     console.log(registration_id);
                        //     return {
                        //         registration_id: registration_id,
                        //         first_name: row["first_name"],
                        //         last_name: row["last_name"],
                        //         user_email: row["gmail"],
                        //     };
                        // });

                        // await insertMultipleRowsToTable(
                        //     "registration_players",
                        //     regPlayers
                        // );

                        toast({
                            title: "Success",
                            description: "Registration completed successfully",
                        });
                    } catch (error) {
                        toast({
                            variant: "destructive",
                            title: "Error",
                            description: `Error registering players: ${error}`,
                        });
                    }
                },
                error: (error) => {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: `Error parsing CSV: ${error.message}`,
                    });
                },
            });
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please upload a CSV file",
            });
        }
    };

    return (
        <Dialog
            onOpenChange={(open) => {
                if (!open) {
                    setUploadedFile(null);
                }
            }}
        >
            <DialogTrigger asChild>
                <Button variant="action" className="cursor-pointer">
                    Upload
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Upload Roster for{" "}
                        <span className="bg-blue-100 p-1 px-2 rounded">
                            {event.title_short ?? event.title}
                        </span>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">
                                Drag and drop a CSV file here, or Click to
                                select your roster file.
                            </div>
                            <div className="text-sm">
                                <strong>
                                    CSV must have these columns: first_name,
                                    last_name, gmail
                                </strong>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                        isDragActive ? "border-primary" : "border-gray-300"
                    }`}
                >
                    <input {...getInputProps()} />
                    <div className="text-sm text-muted-foreground">
                        {uploadedFile
                            ? `File uploaded: ${uploadedFile.name}`
                            : "Put your roster in CSV format here."}
                    </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => setUploadedFile(null)}
                    >
                        Clear
                    </Button>
                    <Button
                        onClick={handleConfirmRegistration}
                        disabled={!uploadedFile}
                    >
                        Confirm Registration
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
