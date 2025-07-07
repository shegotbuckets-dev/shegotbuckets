"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LeagueInfoDialogData, TableData } from "@/constants/events";
import { parseContentWithUrls } from "@/utils/helper";

import { useState } from "react";

import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface LeagueInfoDialogProps {
    id: string;
    icon: LucideIcon;
    gradientColors: {
        from: string;
        to: string;
        darkFrom: string;
        darkTo: string;
    };
    title: string;
    description: string;
    buttonText: string;
    englishData?: LeagueInfoDialogData;
    chineseData?: LeagueInfoDialogData;
    infoComponent?: React.FC<{
        language: "en" | "zh";
        data: LeagueInfoDialogData;
    }>;
    infoComponentRegional?: React.ComponentType;
}

// Update the InfoTable component to center text and integrate the title with the table
const InfoTable = ({ table }: { table: TableData }) => {
    return (
        <div className="mt-8">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                {table.title && (
                    <caption className="bg-gray-100 px-6 py-3 text-lg font-semibold text-left border-b border-gray-200">
                        {table.title}
                    </caption>
                )}
                <thead className="bg-gray-50">
                    <tr>
                        {table.columns.map((column) => (
                            <th
                                key={column.key}
                                className={`px-6 py-3 text-${column.align || "center"} text-xs font-medium text-gray-500 uppercase tracking-wider`}
                                style={
                                    column.width ? { width: column.width } : {}
                                }
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {table.rows.map((row, index) => (
                        <tr
                            key={index}
                            className={
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                        >
                            {table.columns.map((column) => (
                                <td
                                    key={column.key}
                                    className={`px-6 py-4 whitespace-nowrap text-sm text-${column.align || "center"} ${
                                        column.key === "team"
                                            ? "font-medium text-gray-900"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {column.format
                                        ? column.format(row[column.key])
                                        : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Component to render content with URLs
const ContentWithUrls = ({ content }: { content: string }) => {
    const segments = parseContentWithUrls(content);

    return (
        <>
            {segments.map((segment, index) => {
                if (segment.type === "text") {
                    return (
                        <span
                            key={`text-${index}`}
                            className="whitespace-pre-wrap"
                        >
                            {segment.content}
                        </span>
                    );
                } else if (segment.type === "url") {
                    if (segment.isExternal) {
                        return (
                            <a
                                key={`url-${index}`}
                                href={segment.content}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {segment.content}
                            </a>
                        );
                    } else {
                        return (
                            <Link
                                key={`url-${index}`}
                                href={segment.content}
                                className="text-blue-500 hover:underline"
                            >
                                {segment.content}
                            </Link>
                        );
                    }
                }
                return null;
            })}
        </>
    );
};

export const LeagueInfoDialog = ({
    id,
    icon: Icon,
    gradientColors,
    title,
    description,
    buttonText,
    englishData,
    chineseData,
    infoComponent: InfoComponent,
    infoComponentRegional: InfoComponentRegional,
}: LeagueInfoDialogProps) => {
    const [language, setLanguage] = useState<"en" | "zh">("en");
    const [isHovered, setIsHovered] = useState(false);

    const data = language === "en" ? englishData : chineseData;

    return (
        <div className="mx-auto my-3" id={id}>
            <Dialog>
                <DialogTrigger asChild>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        <Card
                            className={`cursor-pointer transition-all hover:shadow-xl border border-primary/20 bg-gradient-to-r from-${gradientColors.from} to-${gradientColors.to} dark:from-${gradientColors.darkFrom} dark:to-${gradientColors.darkTo}`}
                        >
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="flex items-center">
                                    <motion.div>
                                        <Icon className="w-16 h-16 text-primary mr-6" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2 text-primary">
                                            {title}
                                        </h3>
                                        <p className="text-lg text-primary/80">
                                            {description}
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
                                        {buttonText}
                                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] max-h-[90%] overflow-auto">
                    <div className="relative">
                        {englishData && chineseData && (
                            <div className="absolute top-4 right-4 z-10">
                                <Button
                                    onClick={() =>
                                        setLanguage(
                                            language === "en" ? "zh" : "en"
                                        )
                                    }
                                    variant="outline"
                                    size="sm"
                                    className="bg-primary/10 text-primary hover:bg-primary/20"
                                >
                                    {language === "en" ? "中文" : "EN"}
                                </Button>
                            </div>
                        )}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-2"
                        >
                            {InfoComponentRegional ? (
                                <InfoComponentRegional />
                            ) : InfoComponent && data ? (
                                <InfoComponent
                                    language={language}
                                    data={data}
                                />
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    No content available
                                </div>
                            )}
                        </motion.div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export const LeagueInfoContent = ({
    language,
    data,
}: {
    language: "en" | "zh";
    data: LeagueInfoDialogData;
}) => {
    return (
        <div>
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <h2 className="text-2xl font-bold">{data.title}</h2>

                <div className="prose prose-blue max-w-none space-y-6">
                    {data.lastUpdateDate && (
                        <p>
                            <span className="font-medium text-orange-500">
                                {data.lastUpdateDate}
                            </span>
                        </p>
                    )}
                    <p>
                        <span className="font-medium text-orange-500 whitespace-pre-line">
                            {data.introduction}
                        </span>
                    </p>
                    {data.eligibility && (
                        <p>
                            <span className="font-medium text-orange-500 whitespace-pre-line">
                                {data.eligibility}
                            </span>
                        </p>
                    )}

                    <div className="border-2"></div>

                    {data.sections.map((section, index) => (
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
                                        <span
                                            className={
                                                paragraph.isBold
                                                    ? "font-bold"
                                                    : ""
                                            }
                                        >
                                            <ContentWithUrls
                                                content={paragraph.content}
                                            />
                                        </span>
                                        {paragraph.subContent && (
                                            <div className="pl-6 space-y-4 mt-6">
                                                {paragraph.subContent.map(
                                                    (subContent, index) => {
                                                        // Detect indentation level based on leading whitespace
                                                        const trimmedContent =
                                                            subContent.trimStart();
                                                        const leadingSpaces =
                                                            subContent.length -
                                                            trimmedContent.length;

                                                        if (
                                                            leadingSpaces === 0
                                                        ) {
                                                            // First layer - with bullet point
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="mb-4 flex items-start"
                                                                >
                                                                    <span className="mr-2 list-disc">
                                                                        •
                                                                    </span>
                                                                    <ContentWithUrls
                                                                        content={
                                                                            trimmedContent
                                                                        }
                                                                    />
                                                                </div>
                                                            );
                                                        } else if (
                                                            leadingSpaces === 4
                                                        ) {
                                                            // Second layer - indented with bullet
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="mb-4 pl-4 flex items-start"
                                                                >
                                                                    <span className="mr-2 list-disc">
                                                                        •
                                                                    </span>
                                                                    <ContentWithUrls
                                                                        content={
                                                                            trimmedContent
                                                                        }
                                                                    />
                                                                </div>
                                                            );
                                                        } else if (
                                                            leadingSpaces === 8
                                                        ) {
                                                            // Third layer - extra indented with bullet
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="mb-4 pl-8 flex items-start"
                                                                >
                                                                    <span className="mr-2 list-disc">
                                                                        •
                                                                    </span>
                                                                    <ContentWithUrls
                                                                        content={
                                                                            trimmedContent
                                                                        }
                                                                    />
                                                                </div>
                                                            );
                                                        } else {
                                                            // Fallback - treat as first layer
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="mb-4 flex items-start"
                                                                >
                                                                    <span className="text-gray-500 mr-2 mt-1 list-disc">
                                                                        •
                                                                    </span>
                                                                    <ContentWithUrls
                                                                        content={
                                                                            trimmedContent
                                                                        }
                                                                    />
                                                                </div>
                                                            );
                                                        }
                                                    }
                                                )}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Render tables if they exist */}
                    {data.tables &&
                        data.tables.map((table, index) => (
                            <InfoTable key={index} table={table} />
                        ))}
                </div>
            </div>
        </div>
    );
};
