import { EventDetailsProps } from "@/app/dashboard/types";

export const EventDetails = ({ date, location, price }: EventDetailsProps) => (
    <div className="text-sm text-foreground space-y-1">
        <div>
            <strong>Date:</strong> {date}
        </div>
        <div>
            <strong>Location:</strong> {location}
        </div>
        <div>
            <strong>Price:</strong> {price}
        </div>
    </div>
);
