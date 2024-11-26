"use client";

import { ANCHORS } from "@/constants/events";

import { useCallback, useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { throttle } from "lodash";
import { ChevronUp } from "lucide-react";

export const AnchorNavBar = () => {
    const [activeSection, setActiveSection] = useState("");
    const [showScrollTop, setShowScrollTop] = useState(false);
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    const handleScroll = useCallback(
        throttle(() => {
            const scrollPosition = window.scrollY + 100; // Offset for better accuracy
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Show/hide scroll to top button
            setShowScrollTop(scrollPosition > windowHeight * 0.5);

            // Find the active section
            let currentSection = "";
            for (const item of ANCHORS) {
                const element = sectionRefs.current[item.id];
                if (element) {
                    const { top, bottom } = element.getBoundingClientRect();
                    if (top <= 100 && bottom > 100) {
                        currentSection = item.id;
                        break;
                    }
                }
            }

            // Handle case when scrolled to bottom of page
            if (scrollPosition + windowHeight >= documentHeight - 50) {
                currentSection = ANCHORS[ANCHORS.length - 1].id;
            }

            setActiveSection(currentSection);
        }, 100),
        []
    );

    useEffect(() => {
        // Initialize section refs
        ANCHORS.forEach((item) => {
            sectionRefs.current[item.id] = document.getElementById(item.id);
        });

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Call once to set initial state

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    const scrollToSection = (id: string) => {
        const element = sectionRefs.current[id];
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <motion.nav
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ul className="space-y-2">
                {ANCHORS.map((item) => (
                    <li key={item.id} title={item.label}>
                        <button
                            onClick={() => scrollToSection(item.id)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                activeSection === item.id
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                            }`}
                            aria-label={`Scroll to ${item.label} section`}
                        >
                            <span className="text-xs font-bold">
                                {item.label[0]}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
            {showScrollTop && (
                <motion.button
                    className="w-8 h-8 mt-2 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <ChevronUp size={18} />
                </motion.button>
            )}
        </motion.nav>
    );
};
