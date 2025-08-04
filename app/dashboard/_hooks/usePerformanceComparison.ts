import { useCallback, useEffect, useRef, useState } from "react";

interface PerformanceMetrics {
    renderCount: number;
    averageRenderTime: number;
    totalRenderTime: number;
    minRenderTime: number;
    maxRenderTime: number;
    reRenderFrequency: number;
}

export const usePerformanceComparison = (
    componentName: string,
    enabled: boolean = true
) => {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        renderCount: 0,
        averageRenderTime: 0,
        totalRenderTime: 0,
        minRenderTime: Infinity,
        maxRenderTime: 0,
        reRenderFrequency: 0,
    });

    const renderTimes = useRef<number[]>([]);
    const lastRenderTime = useRef(performance.now());
    const startTime = useRef(performance.now());
    const lastLogTime = useRef(0);

    // Simple logging without heavy computations
    const logMetrics = useCallback(
        (newMetrics: PerformanceMetrics, currentTime: number) => {
            if (currentTime - lastLogTime.current > 1000) {
                console.log(
                    `🚀 ${componentName}: ${newMetrics.renderCount} renders, avg: ${newMetrics.averageRenderTime.toFixed(2)}ms`
                );
                lastLogTime.current = currentTime;
            }
        },
        [componentName]
    );

    useEffect(() => {
        // Only track performance when enabled
        if (!enabled) return;

        const currentTime = performance.now();
        const renderTime = currentTime - lastRenderTime.current;

        renderTimes.current.push(renderTime);
        lastRenderTime.current = currentTime;

        // Simple calculations without heavy operations
        const totalTime = renderTimes.current.reduce(
            (sum, time) => sum + time,
            0
        );
        const avgTime = totalTime / renderTimes.current.length;
        const minTime = Math.min(...renderTimes.current);
        const maxTime = Math.max(...renderTimes.current);
        const frequency =
            renderTimes.current.length /
            ((currentTime - startTime.current) / 1000);

        const newMetrics: PerformanceMetrics = {
            renderCount: renderTimes.current.length,
            totalRenderTime: totalTime,
            averageRenderTime: avgTime,
            minRenderTime: minTime,
            maxRenderTime: maxTime,
            reRenderFrequency: frequency,
        };

        // Update state only when there's a significant change
        setMetrics((prev) => {
            if (prev.renderCount !== newMetrics.renderCount) {
                return newMetrics;
            }
            return prev;
        });

        // Log every 10 renders
        if (renderTimes.current.length % 10 === 0) {
            logMetrics(newMetrics, currentTime);
        }
    }, [enabled, logMetrics]);

    return metrics;
};

// Utility to compare two performance measurements
export const comparePerformance = (
    before: PerformanceMetrics,
    after: PerformanceMetrics,
    componentName: string
) => {
    const avgTimeImprovement =
        ((before.averageRenderTime - after.averageRenderTime) /
            before.averageRenderTime) *
        100;
    const frequencyImprovement =
        ((before.reRenderFrequency - after.reRenderFrequency) /
            before.reRenderFrequency) *
        100;

    console.log(`📈 ${componentName} Performance Comparison:`);
    console.log(
        `🎯 Avg: ${before.averageRenderTime.toFixed(2)}ms → ${after.averageRenderTime.toFixed(2)}ms (${avgTimeImprovement > 0 ? "+" : ""}${avgTimeImprovement.toFixed(1)}%)`
    );
    console.log(
        `🔄 Freq: ${before.reRenderFrequency.toFixed(2)}/sec → ${after.reRenderFrequency.toFixed(2)}/sec (${frequencyImprovement > 0 ? "+" : ""}${frequencyImprovement.toFixed(1)}%)`
    );

    return {
        avgTimeImprovement,
        frequencyImprovement,
        isImproved: avgTimeImprovement > 0 && frequencyImprovement > 0,
    };
};
