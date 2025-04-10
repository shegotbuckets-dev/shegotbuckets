import Footer from "@/components/wrapper/footer";
import NavBar from "@/components/wrapper/navbar";

export default function AboutPageLayout({
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
