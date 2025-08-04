/**
 * DEVELOPMENT ONLY - Performance Comparison Component
 *
 * This component is used for performance testing and comparison with Vercel Speed Insights.
 * It is dynamically imported only in development mode and excluded from production builds
 * via webpack configuration to ensure zero impact on production bundle size.
 *
 * DO NOT import this component directly in production code.
 */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * DEVELOPMENT ONLY - Performance Comparison Component
 *
 * This component is used for performance testing and comparison with Vercel Speed Insights.
 * It is dynamically imported only in development mode and excluded from production builds
 * via webpack configuration to ensure zero impact on production bundle size.
 *
 * DO NOT import this component directly in production code.
 */

/**
 * DEVELOPMENT ONLY - Performance Comparison Component
 *
 * This component is used for performance testing and comparison with Vercel Speed Insights.
 * It is dynamically imported only in development mode and excluded from production builds
 * via webpack configuration to ensure zero impact on production bundle size.
 *
 * DO NOT import this component directly in production code.
 */

// Vercel Speed Insights data structure
interface VercelMetrics {
    fcp?: number;
    ttfb?: number;
    lcp?: number;
    fid?: number;
    inp?: number;
    cls?: number;
}

// Custom performance metrics
interface CustomMetrics {
    renderCount: number;
    totalTime: number;
    avgRenderTime: number;
    testCount: number;
}

// Performance comparison component
const PerformanceComparison = memo(
    ({
        customMetrics,
        vercelMetrics,
    }: {
        customMetrics: CustomMetrics;
        vercelMetrics: VercelMetrics;
    }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Custom Metrics */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        🧪 Custom Performance Test
                        <Badge variant="outline">Internal</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Test Count:</span>
                        <span className="font-mono">
                            {customMetrics.testCount}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Render Count:</span>
                        <span className="font-mono">
                            {customMetrics.renderCount}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Time:</span>
                        <span className="font-mono">
                            {(customMetrics.totalTime / 1000).toFixed(2)}s
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Avg Render Time:</span>
                        <span className="font-mono">
                            {customMetrics.avgRenderTime.toFixed(2)}ms
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Vercel Speed Insights */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        📊 Vercel Speed Insights
                        <Badge variant="outline">Production</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>FCP (First Contentful Paint):</span>
                        <span className="font-mono">
                            {vercelMetrics.fcp
                                ? `${vercelMetrics.fcp}ms`
                                : "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>TTFB (Time to First Byte):</span>
                        <span className="font-mono">
                            {vercelMetrics.ttfb
                                ? `${vercelMetrics.ttfb}ms`
                                : "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>LCP (Largest Contentful Paint):</span>
                        <span className="font-mono">
                            {vercelMetrics.lcp
                                ? `${vercelMetrics.lcp}ms`
                                : "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>FID (First Input Delay):</span>
                        <span className="font-mono">
                            {vercelMetrics.fid
                                ? `${vercelMetrics.fid}ms`
                                : "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>INP (Interaction to Next Paint):</span>
                        <span className="font-mono">
                            {vercelMetrics.inp
                                ? `${vercelMetrics.inp}ms`
                                : "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>CLS (Cumulative Layout Shift):</span>
                        <span className="font-mono">
                            {vercelMetrics.cls
                                ? vercelMetrics.cls.toFixed(4)
                                : "N/A"}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
);

PerformanceComparison.displayName = "PerformanceComparison";

// Minimal performance tracking
const useSimplePerformance = (enabled: boolean, resetTrigger: number) => {
    const [metrics, setMetrics] = useState({
        renderCount: 0,
        testCount: 0,
        startTime: 0,
        lastRenderTime: 0,
    });

    const renderCountRef = useRef(0);
    const startTimeRef = useRef(0);
    const lastRenderTimeRef = useRef(0);

    useEffect(() => {
        renderCountRef.current = 0;
        startTimeRef.current = 0;
        lastRenderTimeRef.current = 0;
        setMetrics({
            renderCount: 0,
            testCount: 0,
            startTime: 0,
            lastRenderTime: 0,
        });
    }, [resetTrigger]);

    if (enabled) {
        const now = performance.now();
        if (startTimeRef.current === 0) {
            startTimeRef.current = now;
        }

        renderCountRef.current++;
        lastRenderTimeRef.current = now;

        if (renderCountRef.current % 10 === 0) {
            setMetrics({
                renderCount: renderCountRef.current,
                testCount: metrics.testCount,
                startTime: startTimeRef.current,
                lastRenderTime: lastRenderTimeRef.current,
            });
        }
    }

    return {
        renderCount: renderCountRef.current,
        testCount: metrics.testCount,
        totalTime: lastRenderTimeRef.current - startTimeRef.current,
        avgRenderTime:
            renderCountRef.current > 0
                ? (lastRenderTimeRef.current - startTimeRef.current) /
                  renderCountRef.current
                : 0,
    };
};

export const PerformanceComparisonTest = () => {
    const [testCount, setTestCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showMetrics, setShowMetrics] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(0);
    const [vercelMetrics, setVercelMetrics] = useState<VercelMetrics>({});
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const metrics = useSimplePerformance(isRunning, resetTrigger);

    // Simulate capturing Vercel metrics (in real app, this would come from Speed Insights)
    const captureVercelMetrics = useCallback(() => {
        // In a real implementation, you'd capture actual Speed Insights data
        // For now, we'll simulate typical values
        setVercelMetrics({
            fcp: Math.floor(Math.random() * 200) + 100, // 100-300ms
            ttfb: Math.floor(Math.random() * 50) + 20, // 20-70ms
            lcp: Math.floor(Math.random() * 500) + 200, // 200-700ms
            fid: Math.floor(Math.random() * 10) + 5, // 5-15ms
            inp: Math.floor(Math.random() * 20) + 10, // 10-30ms
            cls: Math.random() * 0.1, // 0-0.1
        });
    }, []);

    const runPerformanceTest = useCallback(() => {
        console.log("🧪 Starting performance comparison test...");

        setResetTrigger((prev) => prev + 1);
        setIsRunning(true);
        setShowMetrics(true);
        setTestCount(0);

        // Capture Vercel metrics
        captureVercelMetrics();

        let count = 0;
        intervalRef.current = setInterval(() => {
            setTestCount((prev) => prev + 1);
            count++;
            if (count >= 50) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                setIsRunning(false);
                console.log("✅ Performance comparison test completed");
            }
        }, 100);
    }, [captureVercelMetrics]);

    const stopTest = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
    }, []);

    const customMetrics: CustomMetrics = {
        renderCount: metrics.renderCount,
        totalTime: metrics.totalTime,
        avgRenderTime: metrics.avgRenderTime,
        testCount,
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Performance Comparison Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Compare your custom performance metrics with Vercel
                            Speed Insights data.
                        </p>

                        <div className="flex gap-2">
                            <Button
                                onClick={runPerformanceTest}
                                disabled={isRunning}
                                className="flex-1"
                            >
                                {isRunning
                                    ? "Running Test..."
                                    : "Run Comparison Test"}
                            </Button>
                            {isRunning && (
                                <Button
                                    onClick={stopTest}
                                    variant="outline"
                                    size="sm"
                                >
                                    Stop
                                </Button>
                            )}
                        </div>
                    </div>

                    {showMetrics && (
                        <PerformanceComparison
                            customMetrics={customMetrics}
                            vercelMetrics={vercelMetrics}
                        />
                    )}

                    <div className="text-xs text-muted-foreground space-y-1">
                        <div>
                            💡 Compare internal component performance with
                            production metrics.
                        </div>
                        <div>
                            📊 Vercel metrics are simulated - use real Speed
                            Insights data in production.
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
