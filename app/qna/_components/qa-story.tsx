import { ContentVideoSplit } from "@/components/common/content-video-split";

export const QAStory = () => {
    const description = (
        <>
            <p className="text-muted-foreground mb-4">
                This video will guide you through the process of registering for
                a game at SGB. Includes:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground mb-4 space-y-1">
                <li>How to register an account</li>
                <li>Selecting events to register</li>
                <li>Uploading rosters</li>
                <li>Signing waivers before games</li>
                <li>Payment for registered events</li>
            </ul>
        </>
    );

    return (
        <ContentVideoSplit
            title="Game Registration Tutorial"
            description={description}
            buttonText="Watch More Videos"
            buttonLink="https://www.youtube.com/channel/UCRop7F7123gr14AS-5oFLWA"
            videoSrc="https://www.youtube.com/embed/8jtRHfJ3SEI"
            videoTitle="SHE GOT BUCKETS Game Registration Tutorial"
        />
    );
};
