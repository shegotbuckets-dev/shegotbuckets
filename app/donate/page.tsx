import Script from "next/script";

export default function DonatePage() {
    return (
        <section className="w-4/5 mx-auto my-16">
            <div className="container py-8">
                <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                    Donate
                </h1>
                <p className="text-center text-gray-700 dark:text-gray-200 mb-10">
                    Your support funds our tournaments, training programs, and
                    community initiatives.
                </p>
                <div className="max-w-3xl mx-auto flex justify-center mt-6">
                    <Script
                        src="https://donorbox.org/widgets.js"
                        strategy="afterInteractive"
                        type="module"
                    />
                    <dbox-widget
                        className="mx-auto"
                        campaign="support-she-got-buckets"
                        type="donation_form"
                        enable-auto-scroll="true"
                    />
                </div>
            </div>
        </section>
    );
}
