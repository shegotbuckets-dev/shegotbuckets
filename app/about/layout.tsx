import NavBar from "@/components/wrapper/navbar";

export default function EventPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    );
}
