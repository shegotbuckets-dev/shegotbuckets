import Link from "next/link";

// First, create a shared component for both pages
export default function WorkInProgress({ features }: { features: string[] }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24">
            <div className="text-center max-w-2xl mx-auto w-full">
                {/* Progress Icon */}
                <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">⚡</div>

                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                    Work in Progress
                </h1>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <p className="text-lg sm:text-xl text-gray-600">
                        We&apos;re actively developing this page to bring you
                        amazing content.
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full w-[45%]"></div>
                    </div>

                    <p className="text-sm text-gray-500">
                        Estimated completion: Coming Soon
                    </p>
                </div>

                {/* Features Coming Soon List */}
                <div className="text-left mb-6 sm:mb-8 px-4 sm:px-0">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                        Coming Features:
                    </h2>
                    <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-gray-600">
                        {features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <Link
                    href="/"
                    className="inline-block text-blue-500 hover:text-blue-700 underline"
                >
                    Return to Home
                </Link>
            </div>
        </main>
    );
}
