"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQCategory {
    title: string;
    items: FAQItem[];
}

const faqData: FAQCategory[] = [
    {
        title: "About Team Registration for Games",
        items: [
            {
                question:
                    "Who is responsible for registering for the game and making the payment?",
                answer: "Only <strong>one person per team</strong> needs to complete the game registration and payment—usually the team captain.\n\n(<strong>Important:</strong> The team must be registered first before any player can access and sign the waiver. So captains, please make sure you complete the registration step promptly to unlock waiver access for the rest of your team.)",
            },
            {
                question:
                    "Why can't I upload my roster or register successfully for the game?",
                answer: 'Please make sure your roster is in the <strong>correct format</strong>. A template is available under the <strong>"Register"</strong> button—we highly recommend using it. Also, please double-check that the email you used to sign into your SGB account <strong>matches</strong> the email listed in the roster. Mismatched emails will prevent you from registering or signing the waiver.',
            },
            {
                question: "Can I change our team roster later?",
                answer: "You can <strong>only submit your roster ONCE</strong>, so please double-check that everything is correct before uploading. If you need to make changes afterward, please reach out to us at info@shegotbuckets.com for assistance.",
            },
            {
                question:
                    "What if I accidentally used the wrong email to register?",
                answer: "If the email you used to register doesn't match the one listed on your team's roster, your name won't appear and you won't be able to sign the waiver. Please log out and sign in again using the <strong>exact email listed on the roster</strong>. If you need help updating your info, contact us at info@shegotbuckets.com.",
            },
            {
                question:
                    "Can a manager complete the game registration for our team?",
                answer: "We <strong>do NOT</strong> recommend having someone who is not listed on the roster complete the registration. The person registering <strong>must be on the roster</strong>, so we strongly encourage the <strong>team captain</strong> to handle the registration process.",
            },
        ],
    },
    {
        title: "About Waiver",
        items: [
            {
                question: "Do I have to sign the waiver before the game?",
                answer: "Yes, <strong>every player must sign the waiver</strong> to be eligible to play. However, signing is entirely your choice—you shall <strong>read the waiver carefully</strong> and only sign it if you <strong>fully agree with the terms</strong>.",
            },
            {
                question:
                    "How do I know if everyone on my team has signed the waiver?",
                answer: 'You can always click <strong>"View Roster"</strong> on your dashboard to check waiver statuses. Players who have signed will show a <strong>green "Signed" button</strong>. If someone hasn\'t, please remind them to sign as soon as possible.',
            },
            {
                question:
                    "Can I sign in to my SGB account with a personal email and use a different email on the roster?",
                answer: "No. The email you use to sign in must <strong>exactly match</strong> the email listed on the roster. This is essential for your name to appear properly and for you to access and sign the <strong>waiver</strong>.",
            },
            {
                question:
                    "What if I accidentally used the wrong email to sign in?",
                answer: "If the email you used to sign in to your SGB account doesn't match the one listed on your team's roster, your name won't appear and you won't be able to sign the waiver. Please log out and sign in again using the <strong>exact email listed on the roster</strong>. If you need help updating your info, contact us at info@shegotbuckets.com.",
            },
        ],
    },
    {
        title: "About Personal Information Registration",
        items: [
            {
                question:
                    "Do I need to complete the personal information registration even if my captain registered our team?",
                answer: "Yes! Team registration is done by the captain, but each player must complete their own <strong>personal information registration</strong> and <strong>waiver</strong> individually.",
            },
            {
                question:
                    "Why do I need to complete the personal information registration? Is it required?",
                answer: "Yes, completing your personal information registration helps with <strong>event check-in</strong>, building your <strong>player profile</strong>, and supporting our <strong>media initiatives</strong> (like showcasing your game highlights on Instagram). Your information is securely stored and only used for event-related purposes.",
            },
        ],
    },
    {
        title: "About Payment",
        items: [
            {
                question:
                    "Why does the payment amount show a few extra dollars?",
                answer: "The small difference comes from <strong>Stripe's service fee</strong>, which is added on top of the base payment. We've selected the <strong>lowest fee option available</strong> to keep costs down for everyone.",
            },
            {
                question:
                    'What should I write under the "Full Name" section when completing the payment?',
                answer: 'We recommend entering your <strong>team name</strong> (e.g., UNCCWB) in the "Full Name" field. This helps us easily identify which team the payment is for and ensures everything is processed correctly.',
            },
        ],
    },
];

export default function QAAccordion() {
    const [selectedCategory, setSelectedCategory] = useState(0);

    return (
        <section className="py-16">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start gap-12">
                    {/* Left Side - Categories (30%) */}
                    <div className="w-full md:w-[30%]">
                        <div className="sticky top-8">
                            <h2 className="text-4xl font-bold mb-6">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-2">
                                {faqData.map((category, index) => (
                                    <Button
                                        key={index}
                                        variant={
                                            selectedCategory === index
                                                ? "default"
                                                : "ghost"
                                        }
                                        className="w-full justify-start text-left h-auto py-3 px-4"
                                        onClick={() =>
                                            setSelectedCategory(index)
                                        }
                                    >
                                        <span className="text-sm font-medium">
                                            {category.title}
                                        </span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Q&A Content (70%) */}
                    <div className="w-full md:w-[70%]">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold mb-4 text-foreground">
                                {faqData[selectedCategory].title}
                            </h3>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            {faqData[selectedCategory].items.map(
                                (item, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                    >
                                        <AccordionTrigger className="text-left font-medium text-foreground hover:text-foreground/80">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div
                                                className="pt-2 pb-1 text-muted-foreground whitespace-pre-line"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.answer,
                                                }}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                            )}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}
