import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogButton,
    DialogClose,
    DialogContainer,
    DialogContent,
    DialogDescription,
    DialogImage,
    DialogSubtitle,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/motion-dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Database } from "@/constants/supabase";
import { getMediaUrl } from "@/lib/utils";
import { SupabaseStorageBucket } from "@/utils/types";

import { Calendar, CircleDollarSign, MapPin, OctagonAlert } from "lucide-react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function EventCard({
    event,
}: {
    event: Database["public"]["Tables"]["events"]["Row"];
}) {
    return (
        <Dialog
            transition={{
                type: "spring",
                bounce: 0.05,
                duration: 0.25,
            }}
        >
            <DialogTrigger
                tabIndex={-1}
                style={{
                    borderRadius: "12px",
                }}
                className="flex h-80 w-full max-w-[270px] mx-auto flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
            >
                <div className="h-40 w-full">
                    <DialogImage
                        src={getMediaUrl(
                            SupabaseStorageBucket.EVENTS,
                            event.image ?? ""
                        )}
                        alt={event.title_short ?? event.title}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex flex-1 flex-row items-start justify-between p-4 h-40">
                    <div className="flex flex-col justify-between h-full overflow-hidden">
                        <div className="mb-4">
                            <DialogTitle className="text-zinc-950 dark:text-zinc-50 line-clamp-2 text-base">
                                {event.title_short ?? event.title}
                            </DialogTitle>
                            <DialogSubtitle className="text-zinc-700 dark:text-zinc-400 text-sm mt-1">
                                {event.subtitle}
                            </DialogSubtitle>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-500 line-clamp-2">
                            {event.active ? (
                                <span>
                                    <strong>Register By:</strong>{" "}
                                    {event.reg_ddl}
                                </span>
                            ) : (
                                "Closed"
                            )}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
                        aria-label="Open dialog"
                    >
                        <PlusIcon size={12} />
                    </button>
                </div>
            </DialogTrigger>
            <DialogContainer>
                <DialogContent
                    style={{
                        borderRadius: "24px",
                    }}
                    className="pointer-events-auto relative flex h-auto w-[95%] sm:w-[90%] max-w-[400px] sm:max-w-[500px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 mx-auto"
                >
                    <DialogImage
                        src={getMediaUrl(
                            SupabaseStorageBucket.EVENTS,
                            event.image ?? ""
                        )}
                        alt={event.title}
                        className="h-48 sm:h-64 w-full object-cover"
                    />
                    <div className="p-4 sm:p-8">
                        <DialogTitle className="text-xl sm:text-2xl text-zinc-950 dark:text-zinc-50">
                            {event.title}
                        </DialogTitle>
                        <DialogSubtitle className="text-zinc-700 dark:text-zinc-400 mt-2">
                            {event.subtitle}
                        </DialogSubtitle>
                        <DialogDescription
                            variants={{
                                initial: { opacity: 0, scale: 0.8, y: 100 },
                                animate: { opacity: 1, scale: 1, y: 0 },
                                exit: { opacity: 0, scale: 0.8, y: 100 },
                            }}
                        >
                            <p className="mt-2 text-zinc-500 dark:text-zinc-500">
                                {event.description}
                            </p>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center text-zinc-500">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <p className="text-sm line-clamp-1">
                                        <strong>Date:</strong> {event.date}
                                    </p>
                                </div>
                                <div className="flex items-center text-zinc-500">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <p className="text-sm line-clamp-1">
                                                    <strong>Location:</strong>{" "}
                                                    {event.location}
                                                </p>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{event.location}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <div className="flex items-center text-zinc-500">
                                    <CircleDollarSign className="w-4 h-4 mr-2" />
                                    <p className="text-sm line-clamp-1">
                                        <strong>Price:</strong> {event.price}
                                    </p>
                                </div>
                                {event.active && (
                                    <div className="flex items-center text-zinc-500">
                                        <OctagonAlert className="w-4 h-4 mr-2" />
                                        <p className="text-sm line-clamp-1">
                                            <strong>Register By:</strong>{" "}
                                            {event.reg_ddl}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </DialogDescription>
                        <EventCardActions event={event} />
                    </div>
                    <DialogClose className="text-zinc-50" />
                </DialogContent>
            </DialogContainer>
        </Dialog>
    );
}

const EventCardActions = ({
    event,
}: {
    event: Database["public"]["Tables"]["events"]["Row"];
}) => {
    return (
        <div className="flex flex-row gap-4 mt-6">
            {event.active ? (
                <>
                    <Link href="/dashboard/home">
                        <Button className="w-full">Register Now</Button>
                    </Link>
                    <div className="sm:w-[140px]">
                        <DialogButton
                            href={
                                event.league_id
                                    ? `/events/${event.league_id}`
                                    : `/`
                            }
                            buttonText="Event Details"
                            buttonVariant="outline"
                            buttonClassName="w-full border-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        />
                    </div>
                </>
            ) : (
                <div className="sm:w-[140px]">
                    <Button
                        variant="outline"
                        className="w-full text-muted-foreground cursor-not-allowed opacity-50"
                        disabled
                    >
                        History Event
                    </Button>
                </div>
            )}
        </div>
    );
};
