import { CarouselNavigation } from "../ui/motion-carousel";

export default function EventsCarouselNav({
    carouselNavPosition,
    rightChevronEnabled,
    maxSlides,
}: {
    carouselNavPosition: "default" | "bottom" | "top";
    rightChevronEnabled: {
        lg: boolean;
        md: boolean;
        sm: boolean;
        default: boolean;
    };
    maxSlides: {
        lg: number;
        md: number;
        sm: number;
        default: number;
    };
}) {
    switch (carouselNavPosition) {
        case "default":
            return (
                <CarouselNavigation
                    className="absolute -left-4 sm:-left-8 md:-left-12 top-1/2 flex w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] md:w-[calc(100%+6rem)] -translate-y-1/2 justify-between"
                    classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800 z-10"
                    alwaysShow
                    maxSlides={maxSlides}
                    rightChevronEnabled={rightChevronEnabled}
                />
            );
        case "bottom":
            return (
                <CarouselNavigation
                    className="absolute -top-10 left-auto bottom-auto w-full justify-end gap-2"
                    classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
                    alwaysShow
                    maxSlides={maxSlides}
                    rightChevronEnabled={rightChevronEnabled}
                />
            );
        case "top":
            return (
                <CarouselNavigation
                    className="absolute -top-10 left-auto bottom-auto w-full justify-end gap-2"
                    classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
                    alwaysShow
                    maxSlides={maxSlides}
                    rightChevronEnabled={rightChevronEnabled}
                />
            );
        default:
            return <CarouselNavigation />;
    }
}
