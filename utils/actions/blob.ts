export async function fetchMediaFromBlob(
    mediaUrl: string
): Promise<Buffer | null> {
    try {
        // Use fetch to retrieve the file from Vercel Blob storage
        const response = await fetch(mediaUrl);

        if (!response.ok) {
            console.error(`Failed to fetch media: ${response.statusText}`);
            return null;
        }

        // Convert the response to a Buffer
        return Buffer.from(await response.arrayBuffer());
    } catch (error) {
        console.error("Error fetching media from Blob:", error);
        return null;
    }
}
