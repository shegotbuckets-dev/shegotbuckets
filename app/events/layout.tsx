import Footer from "@/components/wrapper/footer";
import NavBar from "@/components/wrapper/navbar";

export default function EventsPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavBar />
            {children}
            <Footer />
        </div>
    );
}
