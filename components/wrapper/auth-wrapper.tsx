import config from "@/config";

import { ReactNode } from "react";

import { ClerkProvider } from "@clerk/nextjs";

interface AuthWrapperProps {
    children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
    if (!config.auth.enabled) {
        return <>{children}</>;
    }

    return <ClerkProvider>{children}</ClerkProvider>;
};

export default AuthWrapper;
