"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    ELIGIBILITY_DATA_CHINESE,
    ELIGIBILITY_DATA_ENGLISH,
} from "@/constants/events";

import { useState } from "react";

import { motion } from "framer-motion";
import { ChevronRight, Users } from "lucide-react";

export const ParticipationEligibility = () => {
    const [language, setLanguage] = useState<"en" | "zh">("en");
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="mx-auto py-6" id="participation-eligibility">
            <Dialog>
                <DialogTrigger asChild>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        <Card className="cursor-pointer transition-all hover:shadow-xl border border-primary/20 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="flex items-center">
                                    <motion.div>
                                        <Users className="w-16 h-16 text-primary mr-6" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2 text-primary">
                                            Participation Eligibility
                                        </h3>
                                        <p className="text-lg text-primary/80">
                                            Requirements for league
                                            participation
                                        </p>
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ x: isHovered ? 10 : 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="ml-4 bg-primary/10 text-primary hover:bg-primary/20 group"
                                    >
                                        View Eligibility
                                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] max-h-[90%] overflow-auto">
                    <div className="relative">
                        <div className="absolute top-4 right-4 z-10">
                            <Button
                                onClick={() =>
                                    setLanguage(language === "en" ? "zh" : "en")
                                }
                                variant="outline"
                                size="sm"
                                className="bg-primary/10 text-primary hover:bg-primary/20"
                            >
                                {language === "en" ? "中文" : "EN"}
                            </Button>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-2"
                        >
                            <EligibilityInfo language={language} />
                        </motion.div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export const EligibilityInfo = (props: { language: "en" | "zh" }) => {
    const eligibilityData =
        props.language === "en"
            ? ELIGIBILITY_DATA_ENGLISH
            : ELIGIBILITY_DATA_CHINESE;

    const shouldBeBold = (title: string) => {
        return (
            title ===
                "Special Rules: Tentative Joint Team for Regional Tournament" ||
            title ===
                "Eligible Players Must Meet One of the Following Conditions" ||
            title === "参赛球员必须属于下列情况之一" ||
            title === "特殊规则：分区赛外卡邀请赛"
        );
    };

    return (
        <div>
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <h1 className="text-2xl font-bold">{eligibilityData.title}</h1>

                <div className="prose prose-blue max-w-none space-y-6">
                    <p>
                        <span className="font-medium text-orange-500">
                            {eligibilityData.lastUpdateDate}
                        </span>
                    </p>
                    <p>
                        <span className="font-medium text-orange-500 whitespace-pre-line">
                            {eligibilityData.introduction}
                        </span>
                    </p>
                    <p>
                        <span className="font-medium text-orange-500 whitespace-pre-line">
                            {eligibilityData.eligibility}
                        </span>
                    </p>

                    <div className="border-2"></div>

                    {eligibilityData.sections.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-xl font-bold mt-8 mb-4">
                                {section.title}
                            </h2>
                            {section.description && (
                                <p className="mb-4">{section.description}</p>
                            )}
                            <ul className="list-disc pl-6 space-y-4">
                                {section.detail.map((paragraph, pIndex) => (
                                    <li key={pIndex} className="mb-4">
                                        {shouldBeBold(section.title) ? (
                                            <span className="font-bold">
                                                {paragraph.content}
                                            </span>
                                        ) : (
                                            paragraph.content
                                        )}
                                        {paragraph.subContent && (
                                            <ul className="list-disc pl-6 space-y-4 mt-6">
                                                {paragraph.subContent.map(
                                                    (subContent, index) => (
                                                        <li
                                                            key={index}
                                                            className="mb-4"
                                                        >
                                                            {subContent}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
