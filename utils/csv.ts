import { RosterData } from "@/app/dashboard/types";
import { isValidEmail } from "@/lib/utils";

import Papa from "papaparse";

export const parseCSV = <T>(file: File): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data as T[]),
            error: (error) => reject(error),
        });
    });
};

export const validateRosterData = (
    parsedData: RosterData[]
): { isValid: boolean; error?: string } => {
    // Required fields check
    const requiredFields = [
        "email",
        "legal_first_name",
        "legal_last_name",
        "jersey_number",
    ];
    const missingFields = parsedData.some((player) =>
        requiredFields.some((field) => !player[field as keyof RosterData])
    );

    if (missingFields) {
        return {
            isValid: false,
            error: "All fields (email, legal_first_name, legal_last_name, jersey_number) are required",
        };
    }

    // Email validation
    const emails = parsedData.map((player) => player.email.toLowerCase());
    const invalidEmails = emails.filter((email) => !isValidEmail(email));
    if (invalidEmails.length > 0) {
        return {
            isValid: false,
            error: `Please correct the following invalid email entries: ${invalidEmails.join(", ")}`,
        };
    }

    // Duplicate email check
    const duplicateEmails = emails.filter(
        (email, index) => emails.indexOf(email) !== index
    );
    if (duplicateEmails.length > 0) {
        return {
            isValid: false,
            error: `Please remove duplicate email entries for: ${duplicateEmails.join(", ")}`,
        };
    }

    // Jersey number validation
    const jerseyNumbers = parsedData.map((player) => player.jersey_number);
    const duplicateJerseyNumbers = jerseyNumbers.filter(
        (jerseyNumber, index) => jerseyNumbers.indexOf(jerseyNumber) !== index
    );
    if (duplicateJerseyNumbers.length > 0) {
        return {
            isValid: false,
            error: `Please remove duplicate jersey number entries for: ${duplicateJerseyNumbers.join(", ")}`,
        };
    }

    const invalidJerseyNumbers = parsedData.filter((player) =>
        isNaN(parseInt(player.jersey_number, 10))
    );
    if (invalidJerseyNumbers.length > 0) {
        return {
            isValid: false,
            error: "All jersey numbers must be valid integers",
        };
    }

    return { isValid: true };
};
