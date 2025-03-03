import { UserRegistrationStatus } from "@/app/dashboard/types";
import { fetchUserData } from "@/utils/actions/user";

import { useCallback, useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";

export const useRegistrationStatus = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<UserRegistrationStatus>({
        isRegistered: false,
        userData: null,
    });

    const checkRegistrationStatus = useCallback(async () => {
        if (!user?.id) {
            setLoading(false);
            return;
        }

        try {
            const userRecord = await fetchUserData(user.id);
            const isRegistered = userRecord?.data_collected ?? false;

            const newStatus: UserRegistrationStatus = {
                isRegistered,
                userData: userRecord,
            };

            setStatus((prevStatus) => ({ ...newStatus }));
            setLoading(false);
            return newStatus;
        } catch (error) {
            setLoading(false);
            return null;
        }
    }, [user]);

    useEffect(() => {
        checkRegistrationStatus();
    }, [checkRegistrationStatus]);

    const refresh = useCallback(async () => {
        const newStatus = await checkRegistrationStatus();
        return newStatus;
    }, [checkRegistrationStatus]);

    return { loading, status, refresh };
};
