import RegistrationButton from "@/components/common/register-button";
import { Button } from "@/components/ui/button";
import { Database } from "@/constants/supabase";

export const EventRegistration = ({
    league,
    events,
}: {
    league: Database["public"]["Tables"]["leagues"]["Row"];
    events: Database["public"]["Tables"]["events"]["Row"][];
}) => {
    return (
        <section id="registration-event" className="py-20 bg-white/10">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">
                    Register for the events in {league.name}
                </h2>
                <p className="mb-8">
                    Secure your spot, limited spaces available!
                </p>

                <RegistrationButton options={events}>
                    <Button size="lg">Register Now</Button>
                </RegistrationButton>
            </div>
        </section>
    );
};
