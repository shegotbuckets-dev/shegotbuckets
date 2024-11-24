import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface WaiverSignedEmailProps {
    name?: string;
    signatureDate?: string;
    tournamentName?: string;
    location?: string;
    eventDate?: string;
}

export const WaiverSignedEmail = ({
    name = "",
    signatureDate = new Date().toLocaleDateString(),
    tournamentName = "",
    location = "",
    eventDate = "",
}: WaiverSignedEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>
                Welcome to SGB! We are looking forward to meeting you at the
                event.
            </Preview>
            <Tailwind>
                <Body className="bg-gray-50 font-sans">
                    <Container className="mx-auto p-4 max-w-[600px]">
                        <Section className="bg-white rounded-xl shadow-lg p-8 mb-4">
                            <Heading className="text-2xl font-bold text-gray-800 mb-8">
                                Waiver Signed Successfully! 🎉
                            </Heading>

                            <Text className="text-gray-700 mb-4">
                                Hi {name},
                            </Text>

                            <Text className="text-gray-700 mb-4">
                                Welcome to She Got Buckets! We are excited to
                                have you join our community. Your waiver was
                                successfully signed on {signatureDate}.
                            </Text>

                            <Section className="bg-gray-50 rounded-lg mb-6">
                                <Text className="text-gray-600 text-sm mb-2">
                                    Tournament Name: {` ${tournamentName}`}
                                </Text>
                                <Text className="text-gray-600 text-sm">
                                    Date: {` ${eventDate}`}
                                </Text>
                                <Text className="text-gray-600 text-sm">
                                    Location: {` ${location}`}
                                </Text>
                            </Section>
                            <section>
                                <Text className="text-gray-800 mb-6">
                                    For any questions, please do not hesitate to
                                    contact us at{" "}
                                    <a
                                        href="mailto:info@shegotbuckets.org"
                                        className="text-purple-600 hover:underline"
                                    >
                                        info@shegotbuckets.org
                                    </a>
                                    .
                                </Text>
                                <Text className="text-gray-800 mb-2">
                                    Warm regards,
                                </Text>
                                <Text className="text-gray-800 mb-1">
                                    Event Team
                                </Text>
                            </section>
                        </Section>
                        <Text className="text-center text-gray-400 text-xs">
                            © 2024 She Got Buckets. All rights reserved.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default WaiverSignedEmail;
