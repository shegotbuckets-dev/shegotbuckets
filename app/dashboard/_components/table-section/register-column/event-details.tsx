import { EventDetailsProps } from "@/app/dashboard/types";
import { Checkbox } from "@/components/ui/checkbox";

interface EventDetailsWithTeam2Props extends EventDetailsProps {
    hasTeam2?: boolean;
    setHasTeam2?: (checked: boolean) => void;
    leagueId?: string | null;
}

export const EventDetails = ({
    date,
    location,
    price,
    hasTeam2,
    setHasTeam2,
    leagueId,
}: EventDetailsWithTeam2Props) => (
    <div className="text-sm text-foreground space-y-3">
        <div className="space-y-1">
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

        {/* Team 2 Checkbox - Only show if it's college league and handlers provided */}
        {leagueId === "fdcd383d-931a-43f8-8b2d-11f25eb5b4fd" &&
            hasTeam2 !== undefined &&
            setHasTeam2 && (
                <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800">
                    <Checkbox
                        id="team2-checkbox"
                        checked={hasTeam2}
                        onCheckedChange={(checked) => setHasTeam2(!!checked)}
                    />
                    <label
                        htmlFor="team2-checkbox"
                        className="text-sm cursor-pointer font-medium text-blue-900 dark:text-blue-100"
                    >
                        I have a team 2 to participate
                    </label>
                </div>
            )}
    </div>
);
