import { RegistrationForm } from "./registration-form";

export async function LandingPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                Complete Your Registration
            </h1>
            <p className="mb-4">
                Please fill out the information below to complete your
                registration. English only.
            </p>
            <p className="mb-4">
                Please ensure that all information you provide matches exactly
                what is displayed on your government-issued photo ID. On game
                day, you will use your photo ID to check-in.
            </p>
            <p className="mb-6">
                You cannot change the information below once registered, so
                please review carefully before submission.
            </p>
            <RegistrationForm />
        </main>
    );
}
