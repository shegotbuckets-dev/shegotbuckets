export default function About() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="text-center max-w-2xl mx-auto">
                {/* Progress Icon */}
                <div className="text-6xl mb-6">⚡</div>

                <h1 className="text-4xl font-bold mb-4">Work in Progress</h1>

                <div className="space-y-4 mb-8">
                    <p className="text-xl text-gray-600">
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
                <div className="text-left mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                        Coming Features:
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Our Story</li>
                        <li>Etc...</li>
                    </ul>
                </div>

                <a
                    href="/"
                    className="text-blue-500 hover:text-blue-700 underline"
                >
                    Return to Home
                </a>
            </div>
        </main>
    );
}
