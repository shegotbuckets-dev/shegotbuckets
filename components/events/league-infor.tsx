"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";

import { motion } from "framer-motion";
import { Award, BookOpen, ChevronRight, Flag, Trophy } from "lucide-react";
import Image from "next/image";

export default function LeagueInfor(props: any) {
    return (
        <div className="pt-16">
            {/*League Info Section */}
            <section className="py-16 bg-muted">
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
                                    Single-elimination playoffs for eligible
                                    teams
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
        </div>
    );
}

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
                                    <motion.div
                                        animate={{
                                            rotate: isHovered ? 360 : 0,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
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
                <DialogContent className="sm:max-w-[900px]">
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
                            {language === "en" ? (
                                <Image
                                    src="/images/rule.png"
                                    alt="Tournament Rules in English"
                                    width={800}
                                    height={1000}
                                    className="w-full rounded-lg shadow-lg"
                                />
                            ) : (
                                <Image
                                    src="/images/ruleChinese.png"
                                    alt="Tournament Rules in Chinese"
                                    width={800}
                                    height={1000}
                                    className="w-full rounded-lg shadow-lg"
                                />
                            )}
                        </motion.div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
