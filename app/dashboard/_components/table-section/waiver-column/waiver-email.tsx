// used for resend to send waiver signed email
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
}

export const WaiverSignedEmail = ({
    name = "",
    signatureDate = new Date().toLocaleDateString(),
}: WaiverSignedEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>
                Welcome to SGB! Your waiver has been successfully signed.
            </Preview>
            <Tailwind>
                <Body className="bg-gray-50 font-sans">
                    <Container className="mx-auto p-4 max-w-[600px]">
                        <Section className="bg-white rounded-xl shadow-lg p-8 mb-4">
                            <Heading className="text-2xl font-bold text-center text-gray-800 mb-4">
                                Waiver Signed Successfully! 🎉
                            </Heading>

                            <Text className="text-gray-700 mb-4 text-center">
                                Hi {name},
                            </Text>

                            <Text className="text-gray-700 mb-4 text-center">
                                Welcome to She Got Buckets! We are excited to
                                have you join our community. Your waiver was
                                successfully signed on {signatureDate}.
                            </Text>

                            <Section className="bg-gray-50 rounded-lg p-6 mb-6">
                                <Text className="text-gray-600 text-sm mb-2">
                                    ✓ Waiver signed and processed
                                </Text>
                                <Text className="text-gray-600 text-sm mb-2">
                                    ✓ Account activated
                                </Text>
                                <Text className="text-gray-600 text-sm">
                                    ✓ Ready to participate in events
                                </Text>
                            </Section>

                            {/* <Hr className="border-gray-200 my-6" /> */}

                            {/* <Text className="text-gray-600 text-sm mb-4">
                  Need help or have questions? Our team is here to support you:
                </Text>
  
                <Section className="text-center space-y-2 mb-6">
                  <Link
                    href="mailto:support@shegotbuckets.org"
                    className="text-green-500 text-sm hover:text-green-600"
                  >
                    support@shegotbuckets.org
                  </Link>
                </Section> */}
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
