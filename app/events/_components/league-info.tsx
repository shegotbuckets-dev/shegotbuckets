"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    RULE_BOOK_DATA_CHINESE,
    RULE_BOOK_DATA_ENGLISH,
} from "@/constants/events";

import { useState } from "react";

import { motion } from "framer-motion";
import { Award, BookOpen, ChevronRight, Flag, Trophy } from "lucide-react";

export const LeagueInfo = () => {
    return (
        <section className="pt-20 pb-28 bg-white/10">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    League Info
                </h2>
                <RuleBook />
                <div className="grid md:grid-cols-3 gap-8">
                    <Card>
                        <CardContent className="flex flex-col items-center p-6">
                            <Flag className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Certified Referees
                            </h3>
                            <p className="text-center">
                                Two certified referees per game
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex flex-col items-center p-6">
                            <Trophy className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Playoffs
                            </h3>
                            <p className="text-center">
                                Single-elimination playoffs for eligible teams
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex flex-col items-center p-6">
                            <Award className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Prizes
                            </h3>
                            <p className="text-center">
                                Team championship prizes
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export const RuleBook = () => {
    const [language, setLanguage] = useState<"en" | "zh">("en");
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="mx-auto py-6" id="ruleBook-event">
            <Dialog>
                <DialogTrigger asChild>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        <Card className="cursor-pointer transition-all hover:shadow-xl border border-primary/20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="flex items-center">
                                    <motion.div>
                                        <BookOpen className="w-16 h-16 text-primary mr-6" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2 text-primary">
                                            Rule Book
                                        </h3>
                                        <p className="text-lg text-primary/80">
                                            Essential guidelines for all players
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
                                        View Rules
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
                            <RuleInfo language={language} />
                        </motion.div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export const RuleInfo = (props: { language: "en" | "zh" }) => {
    const ruleBooKdata =
        props.language === "en"
            ? RULE_BOOK_DATA_ENGLISH
            : RULE_BOOK_DATA_CHINESE;

    return (
        <div>
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <h1 className="text-2xl font-bold">{ruleBooKdata.title}</h1>

                <div className="prose prose-blue max-w-none space-y-6">
                    <p>
                        <span className="font-medium text-orange-500">
                            {ruleBooKdata.lastUpdateDate}
                        </span>
                    </p>
                    <p>
                        <span className="font-medium text-orange-500 whitespace-pre-line">
                            {ruleBooKdata.introduction}
                        </span>
                    </p>
                    <p>
                        <span className="font-medium text-orange-500 whitespace-pre-line">
                            {ruleBooKdata.eligibility}
                        </span>
                    </p>

                    <div className="border-2"></div>

                    {ruleBooKdata.sections.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-xl font-bold mt-8 mb-4">
                                {section.title}
                            </h2>
                            <p className="mb-4">{section.description}</p>
                            <ul className="list-disc pl-6 space-y-4">
                                {section.detail.map((paragraph, pIndex) => (
                                    <li key={pIndex} className="mb-4">
                                        {paragraph.content}
                                        {paragraph.subContent && (
                                            <ul className="list-disc pl-6 space-y-4 mt-6">
                                                {paragraph.subContent.map(
                                                    (SubContent, index) => (
                                                        <li
                                                            key={index}
                                                            className="mb-4"
                                                        >
                                                            {SubContent}
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
