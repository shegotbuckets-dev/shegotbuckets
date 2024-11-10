export function getMediaSrcFromVercelBlob(mediaPath: string): string {
    if (!mediaPath) {
        return "";
    }

    const baseUrl = process.env.VERCEL_BLOB_URL;
    if (!baseUrl) {
        throw new Error("VERCEL_BLOB_URL environment variable is not defined");
    }

    // Construct the full URL with the base URL and media path
    const fullMediaUrl = `${baseUrl}/${mediaPath}`;

    // Extract the file extension from the media path
    const extMatch = mediaPath.match(/\.(\w+)$/);
    if (!extMatch) {
        throw new Error("Invalid media path or unsupported file extension");
    }

    const ext = extMatch[1];
    return `/api/media?mediaUrl=${encodeURIComponent(fullMediaUrl)}&ext=${encodeURIComponent(ext)}`;
}
