import React from "react";

// URL regex pattern defined once outside the function
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

/**
 * Parses text content and extracts URLs
 * @param content Text content that may contain URLs
 * @returns Array of segments with type and content
 */
export const parseContentWithUrls = (
    content: string
): Array<{ type: "text" | "url"; content: string; isExternal?: boolean }> => {
    // If no URLs found, just return the content as a single text segment
    if (!content.match(URL_REGEX)) {
        return [{ type: "text", content }];
    }

    const segments: Array<{
        type: "text" | "url";
        content: string;
        isExternal?: boolean;
    }> = [];

    // Keep track of the last index processed
    let lastIndex = 0;

    // Find all URL matches and process them
    let match;
    while ((match = URL_REGEX.exec(content)) !== null) {
        // Add the text before the URL
        if (match.index > lastIndex) {
            segments.push({
                type: "text",
                content: content.substring(lastIndex, match.index),
            });
        }

        // Process the URL
        const url = match[0];
        const isExternal = !url.includes("shegotbuckets.org");

        segments.push({
            type: "url",
            content: url,
            isExternal,
        });

        // Update the last index to after this URL
        lastIndex = match.index + url.length;
    }

    // Add any remaining text after the last URL
    if (lastIndex < content.length) {
        segments.push({
            type: "text",
            content: content.substring(lastIndex),
        });
    }

    return segments;
};
