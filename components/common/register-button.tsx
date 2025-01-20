"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CONFERENCE_OPTIOS, ConferenceOption } from "@/constants/events";
import { Database } from "@/constants/supabase";

import { useState } from "react";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegistrationButton({
    children,
    options,
}: {
    children: React.ReactNode;
    options?: Database["public"]["Tables"]["events"]["Row"][];
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const router = useRouter();

    const navigateToDashboard = (eventId: string) => {
        router.push(`/dashboard?eventId=${eventId}`);
    };

    const handleRegister = (eventId: string) => {
        setIsDialogOpen(false);
        navigateToDashboard(eventId);
    };

    return options ? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold mb-6">
                        Choose Your Event
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                    {options?.map((option, index) => (
                        <motion.div
                            key={option.event_id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                            }}
                        >
                            <Button
                                variant="outline"
                                className="w-full justify-between text-left font-normal text-xl py-6"
                                onClick={() => handleRegister(option.event_id)}
                                disabled={option.active === false}
                            >
                                <span>{option.title?.split(" - ")[0]}</span>
                                <ChevronRight className="h-6 w-6 opacity-50" />
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    ) : (
        <Button size="lg" disabled>
            Closed
        </Button>
    );
}
