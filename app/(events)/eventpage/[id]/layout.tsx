import Footer from "@/components/wrapper/footer";
import NavBar from "@/components/wrapper/navbar";

export default function EventPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
