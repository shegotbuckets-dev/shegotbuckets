export function getVercelBlobUrl(path: string): string {
    return `${process.env.VERCEL_BLOB_URL}/${path}`;
}
