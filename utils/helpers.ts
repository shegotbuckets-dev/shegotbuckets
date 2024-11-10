export function getMediaSrcFromVercelBlob(mediaPath: string | null): string {
    return mediaPath
        ? `/api/media/${mediaPath}`
        : "/images/sgb-homevideo-placeholder.png";
}

export function getContentType(extension: string): string {
    switch (extension.toLowerCase()) {
        case "jpg":
        case "jpeg":
        case "png":
        case "webp":
            return `image/${extension}`;
        case "mp4":
        case "webm":
            return `video/${extension}`;
        default:
            throw new Error("Unsupported media type");
    }
}
