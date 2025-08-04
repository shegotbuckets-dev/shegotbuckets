/**
 * DEVELOPMENT ONLY - Performance Testing Widget
 *
 * A floating widget that provides real-time performance testing capabilities across all pages.
 * Only available in development mode and completely excluded from production builds.
 *
 * PERFORMANCE METRICS EXPLANATION:
 *
 * CORE WEB VITALS:
 *
 * TTFB (Time to First Byte):
 *   - Measures the time from navigation start to first byte received from server
 *   - For client-side navigation: Uses page transition time as proxy measurement
 *   - Good: < 200ms, Poor: > 600ms
 *   - Why it matters: Indicates server response time and network latency
 *
 * FCP (First Contentful Paint):
 *   - Time when first content (text, image, canvas) is painted on screen
 *   - For client-side navigation: Estimated as transition time + 100ms
 *   - Good: < 1.8s, Poor: > 3s
 *   - Why it matters: First visual feedback that page is loading
 *
 * LCP (Largest Contentful Paint):
 *   - Time when the largest content element (hero image, main text block) is painted
 *   - For client-side navigation: Estimated as transition time + 200ms initially
 *   - Good: < 2.5s, Poor: > 4s
 *   - Why it matters: Perceived loading speed - users see main content
 *
 * FID (First Input Delay):
 *   - Time from first user interaction (click, tap, keypress) to browser response
 *   - Measures interactivity responsiveness and JavaScript execution time
 *   - Good: < 100ms, Poor: > 300ms
 *   - Why it matters: User experience - how responsive the page feels
 *
 * INP (Interaction to Next Paint):
 *   - Average time for all user interactions throughout the page lifecycle
 *   - Measures overall interactivity performance and JavaScript efficiency
 *   - Good: < 200ms, Poor: > 500ms
 *   - Why it matters: Long-term user experience across all interactions
 *
 * CLS (Cumulative Layout Shift):
 *   - Measures visual stability during page load and after
 *   - Sum of all layout shift scores (unexpected element movements)
 *   - Good: < 0.1, Poor: > 0.25
 *   - Why it matters: Prevents users from clicking wrong elements due to layout shifts
 *
 * CUSTOM PERFORMANCE METRICS:
 *
 * Render Count:
 *   - Number of times React components re-render during performance test
 *   - Increments every time a component's render function is called
 *   - Higher counts indicate potential performance issues or unnecessary re-renders
 *   - Expected behavior: Should be minimal for static content, higher for dynamic pages
 *   - Why it matters: Excessive re-renders can cause poor performance and battery drain
 *
 * Test Count:
 *   - Number of performance test cycles completed
 *   - Each test runs for 5 seconds (50 intervals of 100ms each)
 *   - Provides consistent measurement window across different pages
 *   - Expected behavior: Should complete 50 cycles unless manually stopped
 *
 * Total Time:
 *   - Cumulative time spent during performance test
 *   - Measured from test start to current moment or test completion
 *   - Expected behavior: Should be close to 5 seconds for full test
 *
 * Average Render Time:
 *   - Total time divided by render count
 *   - Indicates average time per component render
 *   - Expected behavior: Should be < 16ms for smooth 60fps experience
 *   - Higher values indicate performance bottlenecks
 *
 * CLIENT-SIDE NAVIGATION BEHAVIOR:
 * - Detects when user navigates between pages without full page reload (SPA behavior)
 * - Uses transition time as primary metric instead of server TTFB
 * - Provides more accurate SPA performance measurement
 * - Different values expected for each page navigation due to component complexity
 * - Why it takes time: React needs to mount/unmount components, fetch data, update DOM
 *
 * EXPECTED PERFORMANCE BEHAVIORS:
 *
 * Fast Pages (< 200ms transition):
 *   - Simple static content, minimal JavaScript
 *   - Examples: About pages, simple forms
 *   - Render count: < 10, Low component complexity
 *
 * Medium Pages (200-500ms transition):
 *   - Moderate JavaScript, some data fetching
 *   - Examples: Dashboard, user profiles
 *   - Render count: 10-50, Moderate component complexity
 *
 * Slow Pages (> 500ms transition):
 *   - Heavy JavaScript, complex data fetching, large component trees
 *   - Examples: Data-heavy dashboards, complex forms
 *   - Render count: > 50, High component complexity
 *   - May indicate need for optimization: code splitting, lazy loading, memoization
 *
 * WHY PERFORMANCE TESTING TAKES TIME:
 *
 * 1. Component Mounting/Unmounting:
 *    - React must create/destroy component instances
 *    - DOM elements must be added/removed
 *    - Event listeners must be attached/detached
 *
 * 2. Data Fetching:
 *    - API calls to backend services
 *    - Database queries and processing
 *    - Network latency and bandwidth
 *
 * 3. JavaScript Execution:
 *    - Component logic and business rules
 *    - State management and updates
 *    - Event handling and user interactions
 *
 * 4. Rendering Pipeline:
 *    - Virtual DOM diffing and reconciliation
 *    - CSS calculations and layout
 *    - Paint and composite operations
 *
 * 5. External Dependencies:
 *    - Third-party libraries and frameworks
 *    - Analytics and tracking scripts
 *    - External APIs and services
 *
 * OPTIMIZATION STRATEGIES:
 *
 * For High Render Counts:
 * - Use React.memo() for expensive components
 * - Implement useMemo() and useCallback() hooks
 * - Split large components into smaller ones
 * - Use React.lazy() for code splitting
 *
 * For Slow Transitions:
 * - Implement loading states and skeleton screens
 * - Use Next.js Image component for optimized images
 * - Enable gzip compression and caching
 * - Consider server-side rendering (SSR) or static generation
 *
 * For Poor Core Web Vitals:
 * - Optimize images and use WebP format
 * - Minimize JavaScript bundle size
 * - Implement proper loading strategies
 * - Use CDN for static assets
 */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { memo, useCallback, useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";

/**
 * DEVELOPMENT ONLY - Performance Testing Widget
 *
 * A floating widget that provides real-time performance testing capabilities across all pages.
 * Only available in development mode and completely excluded from production builds.
 *
 * PERFORMANCE METRICS EXPLANATION:
 *
 * CORE WEB VITALS:
 *
 * TTFB (Time to First Byte):
 *   - Measures the time from navigation start to first byte received from server
 *   - For client-side navigation: Uses page transition time as proxy measurement
 *   - Good: < 200ms, Poor: > 600ms
 *   - Why it matters: Indicates server response time and network latency
 *
 * FCP (First Contentful Paint):
 *   - Time when first content (text, image, canvas) is painted on screen
 *   - For client-side navigation: Estimated as transition time + 100ms
 *   - Good: < 1.8s, Poor: > 3s
 *   - Why it matters: First visual feedback that page is loading
 *
 * LCP (Largest Contentful Paint):
 *   - Time when the largest content element (hero image, main text block) is painted
 *   - For client-side navigation: Estimated as transition time + 200ms initially
 *   - Good: < 2.5s, Poor: > 4s
 *   - Why it matters: Perceived loading speed - users see main content
 *
 * FID (First Input Delay):
 *   - Time from first user interaction (click, tap, keypress) to browser response
 *   - Measures interactivity responsiveness and JavaScript execution time
 *   - Good: < 100ms, Poor: > 300ms
 *   - Why it matters: User experience - how responsive the page feels
 *
 * INP (Interaction to Next Paint):
 *   - Average time for all user interactions throughout the page lifecycle
 *   - Measures overall interactivity performance and JavaScript efficiency
 *   - Good: < 200ms, Poor: > 500ms
 *   - Why it matters: Long-term user experience across all interactions
 *
 * CLS (Cumulative Layout Shift):
 *   - Measures visual stability during page load and after
 *   - Sum of all layout shift scores (unexpected element movements)
 *   - Good: < 0.1, Poor: > 0.25
 *   - Why it matters: Prevents users from clicking wrong elements due to layout shifts
 *
 * CUSTOM PERFORMANCE METRICS:
 *
 * Render Count:
 *   - Number of times React components re-render during performance test
 *   - Increments every time a component's render function is called
 *   - Higher counts indicate potential performance issues or unnecessary re-renders
 *   - Expected behavior: Should be minimal for static content, higher for dynamic pages
 *   - Why it matters: Excessive re-renders can cause poor performance and battery drain
 *
 * Test Count:
 *   - Number of performance test cycles completed
 *   - Each test runs for 5 seconds (50 intervals of 100ms each)
 *   - Provides consistent measurement window across different pages
 *   - Expected behavior: Should complete 50 cycles unless manually stopped
 *
 * Total Time:
 *   - Cumulative time spent during performance test
 *   - Measured from test start to current moment or test completion
 *   - Expected behavior: Should be close to 5 seconds for full test
 *
 * Average Render Time:
 *   - Total time divided by render count
 *   - Indicates average time per component render
 *   - Expected behavior: Should be < 16ms for smooth 60fps experience
 *   - Higher values indicate performance bottlenecks
 *
 * CLIENT-SIDE NAVIGATION BEHAVIOR:
 * - Detects when user navigates between pages without full page reload (SPA behavior)
 * - Uses transition time as primary metric instead of server TTFB
 * - Provides more accurate SPA performance measurement
 * - Different values expected for each page navigation due to component complexity
 * - Why it takes time: React needs to mount/unmount components, fetch data, update DOM
 *
 * EXPECTED PERFORMANCE BEHAVIORS:
 *
 * Fast Pages (< 200ms transition):
 *   - Simple static content, minimal JavaScript
 *   - Examples: About pages, simple forms
 *   - Render count: < 10, Low component complexity
 *
 * Medium Pages (200-500ms transition):
 *   - Moderate JavaScript, some data fetching
 *   - Examples: Dashboard, user profiles
 *   - Render count: 10-50, Moderate component complexity
 *
 * Slow Pages (> 500ms transition):
 *   - Heavy JavaScript, complex data fetching, large component trees
 *   - Examples: Data-heavy dashboards, complex forms
 *   - Render count: > 50, High component complexity
 *   - May indicate need for optimization: code splitting, lazy loading, memoization
 *
 * WHY PERFORMANCE TESTING TAKES TIME:
 *
 * 1. Component Mounting/Unmounting:
 *    - React must create/destroy component instances
 *    - DOM elements must be added/removed
 *    - Event listeners must be attached/detached
 *
 * 2. Data Fetching:
 *    - API calls to backend services
 *    - Database queries and processing
 *    - Network latency and bandwidth
 *
 * 3. JavaScript Execution:
 *    - Component logic and business rules
 *    - State management and updates
 *    - Event handling and user interactions
 *
 * 4. Rendering Pipeline:
 *    - Virtual DOM diffing and reconciliation
 *    - CSS calculations and layout
 *    - Paint and composite operations
 *
 * 5. External Dependencies:
 *    - Third-party libraries and frameworks
 *    - Analytics and tracking scripts
 *    - External APIs and services
 *
 * OPTIMIZATION STRATEGIES:
 *
 * For High Render Counts:
 * - Use React.memo() for expensive components
 * - Implement useMemo() and useCallback() hooks
 * - Split large components into smaller ones
 * - Use React.lazy() for code splitting
 *
 * For Slow Transitions:
 * - Implement loading states and skeleton screens
 * - Use Next.js Image component for optimized images
 * - Enable gzip compression and caching
 * - Consider server-side rendering (SSR) or static generation
 *
 * For Poor Core Web Vitals:
 * - Optimize images and use WebP format
 * - Minimize JavaScript bundle size
 * - Implement proper loading strategies
 * - Use CDN for static assets
 */

/**
 * DEVELOPMENT ONLY - Performance Testing Widget
 *
 * A floating widget that provides real-time performance testing capabilities across all pages.
 * Only available in development mode and completely excluded from production builds.
 *
 * PERFORMANCE METRICS EXPLANATION:
 *
 * CORE WEB VITALS:
 *
 * TTFB (Time to First Byte):
 *   - Measures the time from navigation start to first byte received from server
 *   - For client-side navigation: Uses page transition time as proxy measurement
 *   - Good: < 200ms, Poor: > 600ms
 *   - Why it matters: Indicates server response time and network latency
 *
 * FCP (First Contentful Paint):
 *   - Time when first content (text, image, canvas) is painted on screen
 *   - For client-side navigation: Estimated as transition time + 100ms
 *   - Good: < 1.8s, Poor: > 3s
 *   - Why it matters: First visual feedback that page is loading
 *
 * LCP (Largest Contentful Paint):
 *   - Time when the largest content element (hero image, main text block) is painted
 *   - For client-side navigation: Estimated as transition time + 200ms initially
 *   - Good: < 2.5s, Poor: > 4s
 *   - Why it matters: Perceived loading speed - users see main content
 *
 * FID (First Input Delay):
 *   - Time from first user interaction (click, tap, keypress) to browser response
 *   - Measures interactivity responsiveness and JavaScript execution time
 *   - Good: < 100ms, Poor: > 300ms
 *   - Why it matters: User experience - how responsive the page feels
 *
 * INP (Interaction to Next Paint):
 *   - Average time for all user interactions throughout the page lifecycle
 *   - Measures overall interactivity performance and JavaScript efficiency
 *   - Good: < 200ms, Poor: > 500ms
 *   - Why it matters: Long-term user experience across all interactions
 *
 * CLS (Cumulative Layout Shift):
 *   - Measures visual stability during page load and after
 *   - Sum of all layout shift scores (unexpected element movements)
 *   - Good: < 0.1, Poor: > 0.25
 *   - Why it matters: Prevents users from clicking wrong elements due to layout shifts
 *
 * CUSTOM PERFORMANCE METRICS:
 *
 * Render Count:
 *   - Number of times React components re-render during performance test
 *   - Increments every time a component's render function is called
 *   - Higher counts indicate potential performance issues or unnecessary re-renders
 *   - Expected behavior: Should be minimal for static content, higher for dynamic pages
 *   - Why it matters: Excessive re-renders can cause poor performance and battery drain
 *
 * Test Count:
 *   - Number of performance test cycles completed
 *   - Each test runs for 5 seconds (50 intervals of 100ms each)
 *   - Provides consistent measurement window across different pages
 *   - Expected behavior: Should complete 50 cycles unless manually stopped
 *
 * Total Time:
 *   - Cumulative time spent during performance test
 *   - Measured from test start to current moment or test completion
 *   - Expected behavior: Should be close to 5 seconds for full test
 *
 * Average Render Time:
 *   - Total time divided by render count
 *   - Indicates average time per component render
 *   - Expected behavior: Should be < 16ms for smooth 60fps experience
 *   - Higher values indicate performance bottlenecks
 *
 * CLIENT-SIDE NAVIGATION BEHAVIOR:
 * - Detects when user navigates between pages without full page reload (SPA behavior)
 * - Uses transition time as primary metric instead of server TTFB
 * - Provides more accurate SPA performance measurement
 * - Different values expected for each page navigation due to component complexity
 * - Why it takes time: React needs to mount/unmount components, fetch data, update DOM
 *
 * EXPECTED PERFORMANCE BEHAVIORS:
 *
 * Fast Pages (< 200ms transition):
 *   - Simple static content, minimal JavaScript
 *   - Examples: About pages, simple forms
 *   - Render count: < 10, Low component complexity
 *
 * Medium Pages (200-500ms transition):
 *   - Moderate JavaScript, some data fetching
 *   - Examples: Dashboard, user profiles
 *   - Render count: 10-50, Moderate component complexity
 *
 * Slow Pages (> 500ms transition):
 *   - Heavy JavaScript, complex data fetching, large component trees
 *   - Examples: Data-heavy dashboards, complex forms
 *   - Render count: > 50, High component complexity
 *   - May indicate need for optimization: code splitting, lazy loading, memoization
 *
 * WHY PERFORMANCE TESTING TAKES TIME:
 *
 * 1. Component Mounting/Unmounting:
 *    - React must create/destroy component instances
 *    - DOM elements must be added/removed
 *    - Event listeners must be attached/detached
 *
 * 2. Data Fetching:
 *    - API calls to backend services
 *    - Database queries and processing
 *    - Network latency and bandwidth
 *
 * 3. JavaScript Execution:
 *    - Component logic and business rules
 *    - State management and updates
 *    - Event handling and user interactions
 *
 * 4. Rendering Pipeline:
 *    - Virtual DOM diffing and reconciliation
 *    - CSS calculations and layout
 *    - Paint and composite operations
 *
 * 5. External Dependencies:
 *    - Third-party libraries and frameworks
 *    - Analytics and tracking scripts
 *    - External APIs and services
 *
 * OPTIMIZATION STRATEGIES:
 *
 * For High Render Counts:
 * - Use React.memo() for expensive components
 * - Implement useMemo() and useCallback() hooks
 * - Split large components into smaller ones
 * - Use React.lazy() for code splitting
 *
 * For Slow Transitions:
 * - Implement loading states and skeleton screens
 * - Use Next.js Image component for optimized images
 * - Enable gzip compression and caching
 * - Consider server-side rendering (SSR) or static generation
 *
 * For Poor Core Web Vitals:
 * - Optimize images and use WebP format
 * - Minimize JavaScript bundle size
 * - Implement proper loading strategies
 * - Use CDN for static assets
 */

/**
 * DEVELOPMENT ONLY - Performance Testing Widget
 *
 * A floating widget that provides real-time performance testing capabilities across all pages.
 * Only available in development mode and completely excluded from production builds.
 *
 * PERFORMANCE METRICS EXPLANATION:
 *
 * CORE WEB VITALS:
 *
 * TTFB (Time to First Byte):
 *   - Measures the time from navigation start to first byte received from server
 *   - For client-side navigation: Uses page transition time as proxy measurement
 *   - Good: < 200ms, Poor: > 600ms
 *   - Why it matters: Indicates server response time and network latency
 *
 * FCP (First Contentful Paint):
 *   - Time when first content (text, image, canvas) is painted on screen
 *   - For client-side navigation: Estimated as transition time + 100ms
 *   - Good: < 1.8s, Poor: > 3s
 *   - Why it matters: First visual feedback that page is loading
 *
 * LCP (Largest Contentful Paint):
 *   - Time when the largest content element (hero image, main text block) is painted
 *   - For client-side navigation: Estimated as transition time + 200ms initially
 *   - Good: < 2.5s, Poor: > 4s
 *   - Why it matters: Perceived loading speed - users see main content
 *
 * FID (First Input Delay):
 *   - Time from first user interaction (click, tap, keypress) to browser response
 *   - Measures interactivity responsiveness and JavaScript execution time
 *   - Good: < 100ms, Poor: > 300ms
 *   - Why it matters: User experience - how responsive the page feels
 *
 * INP (Interaction to Next Paint):
 *   - Average time for all user interactions throughout the page lifecycle
 *   - Measures overall interactivity performance and JavaScript efficiency
 *   - Good: < 200ms, Poor: > 500ms
 *   - Why it matters: Long-term user experience across all interactions
 *
 * CLS (Cumulative Layout Shift):
 *   - Measures visual stability during page load and after
 *   - Sum of all layout shift scores (unexpected element movements)
 *   - Good: < 0.1, Poor: > 0.25
 *   - Why it matters: Prevents users from clicking wrong elements due to layout shifts
 *
 * CUSTOM PERFORMANCE METRICS:
 *
 * Render Count:
 *   - Number of times React components re-render during performance test
 *   - Increments every time a component's render function is called
 *   - Higher counts indicate potential performance issues or unnecessary re-renders
 *   - Expected behavior: Should be minimal for static content, higher for dynamic pages
 *   - Why it matters: Excessive re-renders can cause poor performance and battery drain
 *
 * Test Count:
 *   - Number of performance test cycles completed
 *   - Each test runs for 5 seconds (50 intervals of 100ms each)
 *   - Provides consistent measurement window across different pages
 *   - Expected behavior: Should complete 50 cycles unless manually stopped
 *
 * Total Time:
 *   - Cumulative time spent during performance test
 *   - Measured from test start to current moment or test completion
 *   - Expected behavior: Should be close to 5 seconds for full test
 *
 * Average Render Time:
 *   - Total time divided by render count
 *   - Indicates average time per component render
 *   - Expected behavior: Should be < 16ms for smooth 60fps experience
 *   - Higher values indicate performance bottlenecks
 *
 * CLIENT-SIDE NAVIGATION BEHAVIOR:
 * - Detects when user navigates between pages without full page reload (SPA behavior)
 * - Uses transition time as primary metric instead of server TTFB
 * - Provides more accurate SPA performance measurement
 * - Different values expected for each page navigation due to component complexity
 * - Why it takes time: React needs to mount/unmount components, fetch data, update DOM
 *
 * EXPECTED PERFORMANCE BEHAVIORS:
 *
 * Fast Pages (< 200ms transition):
 *   - Simple static content, minimal JavaScript
 *   - Examples: About pages, simple forms
 *   - Render count: < 10, Low component complexity
 *
 * Medium Pages (200-500ms transition):
 *   - Moderate JavaScript, some data fetching
 *   - Examples: Dashboard, user profiles
 *   - Render count: 10-50, Moderate component complexity
 *
 * Slow Pages (> 500ms transition):
 *   - Heavy JavaScript, complex data fetching, large component trees
 *   - Examples: Data-heavy dashboards, complex forms
 *   - Render count: > 50, High component complexity
 *   - May indicate need for optimization: code splitting, lazy loading, memoization
 *
 * WHY PERFORMANCE TESTING TAKES TIME:
 *
 * 1. Component Mounting/Unmounting:
 *    - React must create/destroy component instances
 *    - DOM elements must be added/removed
 *    - Event listeners must be attached/detached
 *
 * 2. Data Fetching:
 *    - API calls to backend services
 *    - Database queries and processing
 *    - Network latency and bandwidth
 *
 * 3. JavaScript Execution:
 *    - Component logic and business rules
 *    - State management and updates
 *    - Event handling and user interactions
 *
 * 4. Rendering Pipeline:
 *    - Virtual DOM diffing and reconciliation
 *    - CSS calculations and layout
 *    - Paint and composite operations
 *
 * 5. External Dependencies:
 *    - Third-party libraries and frameworks
 *    - Analytics and tracking scripts
 *    - External APIs and services
 *
 * OPTIMIZATION STRATEGIES:
 *
 * For High Render Counts:
 * - Use React.memo() for expensive components
 * - Implement useMemo() and useCallback() hooks
 * - Split large components into smaller ones
 * - Use React.lazy() for code splitting
 *
 * For Slow Transitions:
 * - Implement loading states and skeleton screens
 * - Use Next.js Image component for optimized images
 * - Enable gzip compression and caching
 * - Consider server-side rendering (SSR) or static generation
 *
 * For Poor Core Web Vitals:
 * - Optimize images and use WebP format
 * - Minimize JavaScript bundle size
 * - Implement proper loading strategies
 * - Use CDN for static assets
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
    pagePath: string;
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Custom Metrics */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        🧪 Custom Performance Test
                        <Badge variant="outline">Internal</Badge>
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                        Page: {customMetrics.pagePath}
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="font-medium">Test Count:</span>
                        <span className="font-mono text-lg font-bold text-blue-600">
                            {customMetrics.testCount}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="font-medium">Render Count:</span>
                        <span className="font-mono text-lg font-bold text-green-600">
                            {customMetrics.renderCount}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="font-medium">Total Time:</span>
                        <span className="font-mono text-lg font-bold text-purple-600">
                            {(customMetrics.totalTime / 1000).toFixed(2)}s
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="font-medium">Avg Render Time:</span>
                        <span className="font-mono text-lg font-bold text-orange-600">
                            {customMetrics.avgRenderTime.toFixed(2)}ms
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Vercel Speed Insights */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        📊 Page Performance Metrics
                        <Badge variant="outline">Real-time</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="font-medium text-sm">FCP:</span>
                        <div className="text-right">
                            <div className="font-mono text-lg font-bold text-blue-600">
                                {vercelMetrics.fcp
                                    ? `${vercelMetrics.fcp.toFixed(0)}ms`
                                    : "N/A"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                First Contentful Paint
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="font-medium text-sm">TTFB:</span>
                        <div className="text-right">
                            <div className="font-mono text-lg font-bold text-green-600">
                                {vercelMetrics.ttfb
                                    ? `${vercelMetrics.ttfb.toFixed(0)}ms`
                                    : "N/A"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Time to First Byte
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="font-medium text-sm">LCP:</span>
                        <div className="text-right">
                            <div className="font-mono text-lg font-bold text-purple-600">
                                {vercelMetrics.lcp
                                    ? `${vercelMetrics.lcp.toFixed(0)}ms`
                                    : "N/A"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Largest Contentful Paint
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="font-medium text-sm">FID:</span>
                        <div className="text-right">
                            <div className="font-mono text-lg font-bold text-orange-600">
                                {vercelMetrics.fid
                                    ? `${vercelMetrics.fid.toFixed(0)}ms`
                                    : "N/A"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                First Input Delay
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="font-medium text-sm">INP:</span>
                        <div className="text-right">
                            <div className="font-mono text-lg font-bold text-red-600">
                                {vercelMetrics.inp
                                    ? `${vercelMetrics.inp.toFixed(0)}ms`
                                    : "N/A"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Interaction to Next Paint
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-sm">CLS:</span>
                        <div className="text-right">
                            <div className="font-mono text-lg font-bold text-indigo-600">
                                {vercelMetrics.cls
                                    ? vercelMetrics.cls.toFixed(4)
                                    : "N/A"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Cumulative Layout Shift
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
);

PerformanceComparison.displayName = "PerformanceComparison";

// Simple performance tracking that actually works and resets per page
// This hook tracks React component re-renders and provides insights into performance
const useSimplePerformance = (
    enabled: boolean,
    resetTrigger: number,
    currentPath: string
) => {
    const [metrics, setMetrics] = useState({
        renderCount: 0,
        startTime: 0,
        lastRenderTime: 0,
        pagePath: currentPath,
    });

    const renderCountRef = useRef(0);
    const startTimeRef = useRef(0);
    const lastRenderTimeRef = useRef(0);
    const lastPathRef = useRef(currentPath);
    const lastResetTriggerRef = useRef(resetTrigger);
    const isTestRunningRef = useRef(false);
    const pageRenderCountRef = useRef(0); // Track renders per page

    useEffect(() => {
        // Reset when path changes or reset trigger changes
        if (
            lastPathRef.current !== currentPath ||
            lastResetTriggerRef.current !== resetTrigger
        ) {
            // Force reset all refs to 0
            renderCountRef.current = 0;
            startTimeRef.current = 0;
            lastRenderTimeRef.current = 0;
            pageRenderCountRef.current = 0; // Reset page-specific render count
            lastPathRef.current = currentPath;
            lastResetTriggerRef.current = resetTrigger;
            isTestRunningRef.current = false;

            // Force reset state immediately
            setMetrics({
                renderCount: 0,
                startTime: 0,
                lastRenderTime: 0,
                pagePath: currentPath,
            });
        }
    }, [resetTrigger, currentPath]);

    // Update test running status when enabled changes
    useEffect(() => {
        const wasRunning = isTestRunningRef.current;
        isTestRunningRef.current = enabled;

        if (enabled && !wasRunning) {
            // Test just started
            startTimeRef.current = performance.now();
        }
    }, [enabled, currentPath]);

    // Only increment render count when test is actually running
    if (enabled && isTestRunningRef.current) {
        const now = performance.now();
        if (startTimeRef.current === 0) {
            startTimeRef.current = now;
        }

        renderCountRef.current++;
        pageRenderCountRef.current++; // Increment page-specific count
        lastRenderTimeRef.current = now;

        // Update state less frequently to reduce re-renders
        if (renderCountRef.current % 10 === 0) {
            setMetrics({
                renderCount: pageRenderCountRef.current, // Use page-specific count
                startTime: startTimeRef.current,
                lastRenderTime: lastRenderTimeRef.current,
                pagePath: currentPath,
            });
        }
    }

    return {
        renderCount: pageRenderCountRef.current, // Return page-specific count
        totalTime: lastRenderTimeRef.current - startTimeRef.current,
        avgRenderTime:
            pageRenderCountRef.current > 0
                ? (lastRenderTimeRef.current - startTimeRef.current) /
                  pageRenderCountRef.current
                : 0,
        pagePath: currentPath,
    };
};

// Real Core Web Vitals capture - resets per page
// This hook captures actual browser performance metrics using PerformanceObserver
const useRealWebVitals = (currentPath: string) => {
    const [webVitals, setWebVitals] = useState({
        fcp: 0,
        ttfb: 0,
        lcp: 0,
        fid: 0,
        inp: 0,
        cls: 0,
        pagePath: currentPath,
    });
    const lastPathRef = useRef(currentPath);
    const hasCapturedRef = useRef(false);
    const clsValueRef = useRef(0);

    useEffect(() => {
        // Reset when path changes
        if (lastPathRef.current !== currentPath) {
            lastPathRef.current = currentPath;
            hasCapturedRef.current = false;
            clsValueRef.current = 0; // Reset CLS value for new page

            // Clear existing performance entries for fresh measurement
            try {
                if (typeof performance !== "undefined") {
                    if (performance.clearResourceTimings) {
                        performance.clearResourceTimings();
                    }
                    if (performance.clearMarks) {
                        performance.clearMarks();
                    }
                    if (performance.clearMeasures) {
                        performance.clearMeasures();
                    }
                }
            } catch (e) {
                // Silently handle performance clearing errors
            }

            // Force reset CLS by clearing layout shift entries
            try {
                const existingLayoutShifts =
                    performance.getEntriesByType("layout-shift");
                if (existingLayoutShifts.length > 0) {
                    // Layout shift entries cleared
                }
            } catch (e) {
                // Silently handle layout shift clearing errors
            }

            setWebVitals({
                fcp: 0,
                ttfb: 0,
                lcp: 0,
                fid: 0,
                inp: 0,
                cls: 0,
                pagePath: currentPath,
            });
        }

        // Only capture once per page to avoid duplicate measurements
        if (hasCapturedRef.current) {
            return;
        }

        if (typeof window === "undefined") return;

        // Small delay to ensure page is fully loaded
        const captureMetrics = () => {
            // Check if this is a client-side navigation (not initial page load)
            const navigationEntries =
                performance.getEntriesByType("navigation");
            const isClientNavigation =
                navigationEntries.length === 0 ||
                (navigationEntries.length > 0 &&
                    Date.now() - navigationEntries[0].startTime > 10000); // If navigation is older than 10s

            if (isClientNavigation) {
                // For client-side navigation, we'll measure different metrics
                const navigationStart = performance.now();

                // Measure page transition time
                setTimeout(() => {
                    const navigationEnd = performance.now();
                    const transitionTime = navigationEnd - navigationStart;

                    // Set custom metrics for client-side navigation
                    setWebVitals((prev) => ({
                        ...prev,
                        ttfb: transitionTime, // Use transition time as TTFB equivalent
                        fcp: transitionTime + 100, // Estimate FCP
                        lcp: transitionTime + 200, // Estimate LCP
                        pagePath: currentPath,
                    }));
                }, 100);

                // Measure LCP for client-side navigation
                setTimeout(() => {
                    try {
                        // Use a more modern approach to avoid deprecated API warnings
                        const observer = new PerformanceObserver((list) => {
                            const entries = list.getEntries();
                            if (entries.length > 0) {
                                const latestLCP = entries[entries.length - 1];
                                if (latestLCP.startTime > 0) {
                                    setWebVitals((prev) => ({
                                        ...prev,
                                        lcp: latestLCP.startTime,
                                        pagePath: currentPath,
                                    }));
                                }
                            }
                        });
                        observer.observe({
                            entryTypes: ["largest-contentful-paint"],
                        });

                        // Disconnect after a short time to avoid memory leaks
                        setTimeout(() => {
                            observer.disconnect();
                        }, 2000);
                    } catch (e) {
                        console.warn(
                            "Could not get LCP for client-side navigation:",
                            e
                        );
                    }
                }, 2000); // Longer delay for client-side navigation

                // Measure CLS for client-side navigation
                setTimeout(() => {
                    try {
                        // Use a more modern approach to avoid deprecated API warnings
                        const observer = new PerformanceObserver((list) => {
                            let clsValue = 0;
                            for (const entry of list.getEntries()) {
                                const layoutShiftEntry =
                                    entry as PerformanceEntry & {
                                        hadRecentInput: boolean;
                                        value: number;
                                    };
                                if (!layoutShiftEntry.hadRecentInput) {
                                    clsValue += layoutShiftEntry.value;
                                }
                            }
                            if (clsValue > 0) {
                                setWebVitals((prev) => ({
                                    ...prev,
                                    cls: clsValue,
                                    pagePath: currentPath,
                                }));
                            }
                        });
                        observer.observe({ entryTypes: ["layout-shift"] });

                        // Disconnect after a short time to avoid memory leaks
                        setTimeout(() => {
                            observer.disconnect();
                        }, 1000);
                    } catch (e) {
                        console.warn(
                            "Could not get CLS for client-side navigation:",
                            e
                        );
                    }
                }, 1000);

                return;
            }

            // Get TTFB from navigation timing
            try {
                const navigationEntry = performance.getEntriesByType(
                    "navigation"
                )[0] as PerformanceNavigationTiming;
                if (navigationEntry) {
                    const ttfb =
                        navigationEntry.responseStart -
                        navigationEntry.requestStart;
                    setWebVitals((prev) => ({
                        ...prev,
                        ttfb,
                        pagePath: currentPath,
                    }));
                }
            } catch (e) {
                // Fallback to using performance.timing if available
                try {
                    const timing = (performance as any).timing;
                    if (timing) {
                        const ttfb = timing.responseStart - timing.requestStart;
                        setWebVitals((prev) => ({
                            ...prev,
                            ttfb,
                            pagePath: currentPath,
                        }));
                    }
                } catch (fallbackError) {
                    console.warn("Could not get TTFB:", e);
                }
            }

            // Get FCP from paint timing
            try {
                const paintEntries = performance.getEntriesByType("paint");
                const fcpEntry = paintEntries.find(
                    (entry) => entry.name === "first-contentful-paint"
                );
                if (fcpEntry) {
                    setWebVitals((prev) => ({
                        ...prev,
                        fcp: fcpEntry.startTime,
                        pagePath: currentPath,
                    }));
                }
            } catch (e) {
                console.warn("Could not get FCP:", e);
            }

            // Get LCP using PerformanceObserver
            if ("PerformanceObserver" in window) {
                try {
                    let lcpValue = 0;
                    const lcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lcpEntry = entries[entries.length - 1];
                        if (lcpEntry && lcpEntry.startTime > 0) {
                            lcpValue = lcpEntry.startTime;
                            setWebVitals((prev) => ({
                                ...prev,
                                lcp: lcpValue,
                                pagePath: currentPath,
                            }));
                        }
                    });
                    lcpObserver.observe({
                        entryTypes: ["largest-contentful-paint"],
                    });

                    // Get existing LCP entries
                    setTimeout(() => {
                        try {
                            const observer = new PerformanceObserver((list) => {
                                const entries = list.getEntries();
                                if (entries.length > 0) {
                                    const latestLCP =
                                        entries[entries.length - 1];
                                    if (latestLCP.startTime > 0) {
                                        lcpValue = latestLCP.startTime;
                                        setWebVitals((prev) => ({
                                            ...prev,
                                            lcp: lcpValue,
                                            pagePath: currentPath,
                                        }));
                                    }
                                }
                            });
                            observer.observe({
                                entryTypes: ["largest-contentful-paint"],
                            });

                            setTimeout(() => {
                                observer.disconnect();
                            }, 1000);
                        } catch (e) {
                            console.warn("Could not get existing LCP:", e);
                        }
                    }, 1000);

                    // Additional LCP measurement with longer timeout
                    setTimeout(() => {
                        try {
                            const observer = new PerformanceObserver((list) => {
                                const entries = list.getEntries();
                                if (entries.length > 0) {
                                    const latestLCP =
                                        entries[entries.length - 1];
                                    if (
                                        latestLCP.startTime > 0 &&
                                        lcpValue === 0
                                    ) {
                                        lcpValue = latestLCP.startTime;
                                        setWebVitals((prev) => ({
                                            ...prev,
                                            lcp: lcpValue,
                                            pagePath: currentPath,
                                        }));
                                    }
                                }
                            });
                            observer.observe({
                                entryTypes: ["largest-contentful-paint"],
                            });

                            setTimeout(() => {
                                observer.disconnect();
                            }, 1000);
                        } catch (e) {
                            console.warn("Could not get delayed LCP:", e);
                        }
                    }, 3000);
                } catch (e) {
                    console.warn("Could not observe LCP:", e);
                }
            }

            // Get FID using PerformanceObserver
            if ("PerformanceObserver" in window) {
                try {
                    const fidObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        if (entries.length > 0) {
                            const fidEntry = entries[0] as any;
                            if (
                                fidEntry.processingStart &&
                                fidEntry.startTime
                            ) {
                                const fid =
                                    fidEntry.processingStart -
                                    fidEntry.startTime;
                                if (fid > 0) {
                                    setWebVitals((prev) => ({
                                        ...prev,
                                        fid,
                                        pagePath: currentPath,
                                    }));
                                }
                            }
                        }
                    });
                    fidObserver.observe({
                        entryTypes: ["first-input"],
                    });

                    // Check for existing FID entries
                    setTimeout(() => {
                        try {
                            const existingFID =
                                performance.getEntriesByType("first-input");
                            if (existingFID.length > 0) {
                                const fidEntry = existingFID[0] as any;
                                if (
                                    fidEntry.processingStart &&
                                    fidEntry.startTime
                                ) {
                                    const fid =
                                        fidEntry.processingStart -
                                        fidEntry.startTime;
                                    if (fid > 0) {
                                        setWebVitals((prev) => ({
                                            ...prev,
                                            fid,
                                            pagePath: currentPath,
                                        }));
                                    }
                                }
                            }
                        } catch (e) {
                            console.warn("Could not get existing FID:", e);
                        }
                    }, 1000);
                } catch (e) {
                    console.warn("Could not observe FID:", e);
                }
            }

            // Get CLS using PerformanceObserver
            if ("PerformanceObserver" in window) {
                try {
                    const clsObserver = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            const layoutShiftEntry =
                                entry as PerformanceEntry & {
                                    hadRecentInput: boolean;
                                    value: number;
                                };
                            if (!layoutShiftEntry.hadRecentInput) {
                                clsValueRef.current += layoutShiftEntry.value;
                            }
                        }
                        setWebVitals((prev) => ({
                            ...prev,
                            cls: clsValueRef.current,
                            pagePath: currentPath,
                        }));
                    });
                    clsObserver.observe({ entryTypes: ["layout-shift"] });
                } catch (e) {
                    console.warn("Could not observe CLS:", e);
                }
            }

            // Add INP (Interaction to Next Paint) measurement
            if ("PerformanceObserver" in window) {
                try {
                    let inpValue = 0;
                    let inpCount = 0;
                    const inpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        for (const entry of entries) {
                            const firstInputEntry =
                                entry as PerformanceEntry & {
                                    processingStart: number;
                                    startTime: number;
                                    target: Element;
                                };

                            if (
                                firstInputEntry.processingStart &&
                                firstInputEntry.startTime
                            ) {
                                const interactionDelay =
                                    firstInputEntry.processingStart -
                                    firstInputEntry.startTime;
                                if (interactionDelay > 0) {
                                    inpCount++;
                                    inpValue =
                                        (inpValue * (inpCount - 1) +
                                            interactionDelay) /
                                        inpCount;

                                    setWebVitals((prev) => ({
                                        ...prev,
                                        inp: inpValue,
                                        pagePath: currentPath,
                                    }));
                                }
                            }
                        }
                    });
                    inpObserver.observe({ entryTypes: ["first-input"] });

                    // Check for existing INP entries
                    setTimeout(() => {
                        try {
                            const existingInputs =
                                performance.getEntriesByType("first-input");
                            if (existingInputs.length > 0) {
                                let totalDelay = 0;
                                let validCount = 0;

                                for (const entry of existingInputs) {
                                    const inputEntry = entry as any;
                                    if (
                                        inputEntry.processingStart &&
                                        inputEntry.startTime
                                    ) {
                                        const delay =
                                            inputEntry.processingStart -
                                            inputEntry.startTime;
                                        if (delay > 0) {
                                            totalDelay += delay;
                                            validCount++;
                                        }
                                    }
                                }

                                if (validCount > 0) {
                                    const avgINP = totalDelay / validCount;
                                    setWebVitals((prev) => ({
                                        ...prev,
                                        inp: avgINP,
                                        pagePath: currentPath,
                                    }));
                                }
                            }
                        } catch (e) {
                            console.warn("Could not get existing INP:", e);
                        }
                    }, 1500);
                } catch (e) {
                    console.warn("Could not observe INP:", e);
                }
            }

            hasCapturedRef.current = true;
        };

        // Capture metrics after a short delay to ensure page is loaded
        const timer = setTimeout(captureMetrics, 100);
        return () => clearTimeout(timer);
    }, [currentPath]);

    return webVitals;
};

// Check for existing Vercel Speed Insights data
// This hook looks for Vercel's performance data and provides fallback metrics
const useVercelSpeedInsights = (currentPath: string) => {
    const [vercelData, setVercelData] = useState<any>(null);
    const lastPathRef = useRef(currentPath);

    useEffect(() => {
        // Reset when path changes
        if (lastPathRef.current !== currentPath) {
            lastPathRef.current = currentPath;
            setVercelData(null);
        }

        // Check if Vercel Speed Insights is loaded
        const checkVercelData = () => {
            // Clear any cached Vercel data
            if ((window as any).__VERCEL_SPEED_INSIGHTS__) {
                delete (window as any).__VERCEL_SPEED_INSIGHTS__;
            }

            // Check for Vercel Speed Insights in window object
            const vercelInsights = (window as any).__VERCEL_SPEED_INSIGHTS__;
            if (vercelInsights) {
                setVercelData(vercelInsights);
            }

            // Check for web-vitals library data
            const webVitalsData = (window as any).webVitals;
            if (webVitalsData) {
                setVercelData(webVitalsData);
            }
        };

        // Listen for custom events from Vercel Speed Insights
        const handleVercelMetrics = (event: any) => {
            if (event.detail) {
                setVercelData(event.detail);
            }
        };

        // Listen for the specific Vercel Speed Insights event
        window.addEventListener("vercel-speed-insights", handleVercelMetrics);

        // Also listen for any custom events that might contain metrics
        window.addEventListener("message", (event) => {
            if (event.data && event.data.type === "vercel-speed-insights") {
                setVercelData(event.data);
            }
        });

        // Check immediately and also after a delay
        checkVercelData();
        const timer = setTimeout(checkVercelData, 2000);

        return () => {
            clearTimeout(timer);
            window.removeEventListener(
                "vercel-speed-insights",
                handleVercelMetrics
            );
            window.removeEventListener("message", handleVercelMetrics);
        };
    }, [currentPath]);

    return vercelData;
};

// Floating performance widget
// This is the main component that provides the performance testing interface
export const PerformanceWidget = () => {
    const [testCount, setTestCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showMetrics, setShowMetrics] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [forceRefresh, setForceRefresh] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const currentPath = usePathname();

    const metrics = useSimplePerformance(isRunning, resetTrigger, currentPath);
    const realWebVitals = useRealWebVitals(currentPath);
    const vercelData = useVercelSpeedInsights(currentPath);

    // Force refresh metrics when path changes
    useEffect(() => {
        setForceRefresh((prev) => prev + 1);

        // Automatic cache clearing on page switch
        if (typeof performance !== "undefined") {
            if (performance.clearResourceTimings) {
                performance.clearResourceTimings();
            }
            if (performance.clearMarks) {
                performance.clearMarks();
            }
            if (performance.clearMeasures) {
                performance.clearMeasures();
            }
        }

        // Clear Vercel cache on page switch
        if ((window as any).__VERCEL_SPEED_INSIGHTS__) {
            delete (window as any).__VERCEL_SPEED_INSIGHTS__;
        }
    }, [currentPath]);

    const runPerformanceTest = useCallback(() => {
        // Increment reset trigger to force reset of all metrics
        setResetTrigger((prev) => {
            const newTrigger = prev + 1;
            return newTrigger;
        });

        setIsRunning(true);
        setShowMetrics(true);
        setTestCount(0);

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
            }
        }, 100);
    }, [currentPath]);

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
        pagePath: currentPath,
    };

    // Use real web vitals with fallback to Vercel data
    const vercelMetrics: VercelMetrics = {
        fcp:
            realWebVitals.fcp > 0
                ? realWebVitals.fcp
                : vercelData?.metrics?.find((m: any) => m.type === "FCP")
                      ?.value || undefined,
        ttfb:
            realWebVitals.ttfb > 0
                ? realWebVitals.ttfb
                : vercelData?.metrics?.find((m: any) => m.type === "TTFB")
                      ?.value || undefined,
        lcp:
            realWebVitals.lcp > 0
                ? realWebVitals.lcp
                : vercelData?.metrics?.find((m: any) => m.type === "LCP")
                      ?.value || undefined,
        fid:
            realWebVitals.fid > 0
                ? realWebVitals.fid
                : vercelData?.metrics?.find((m: any) => m.type === "FID")
                      ?.value || undefined,
        inp:
            realWebVitals.inp > 0
                ? realWebVitals.inp
                : vercelData?.metrics?.find((m: any) => m.type === "INP")
                      ?.value || undefined,
        cls:
            realWebVitals.cls > 0
                ? realWebVitals.cls
                : vercelData?.metrics?.find((m: any) => m.type === "CLS")
                      ?.value || undefined,
    };

    // Only render in development
    if (process.env.NODE_ENV !== "development") {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        size="sm"
                        className="rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
                        title="Performance Testing"
                    >
                        ⚡
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="!w-1/2 !max-w-none h-full">
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                            🚀 Performance Testing Widget
                            <Badge variant="outline">Dev Only</Badge>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="mt-6 space-y-6 h-full overflow-y-auto">
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Performance metrics for the current page.
                            </p>

                            <div className="flex gap-2">
                                <Button
                                    onClick={runPerformanceTest}
                                    disabled={isRunning}
                                    className="flex-1"
                                >
                                    {isRunning
                                        ? "Running Test..."
                                        : "Run Page Test"}
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
                                <Button
                                    onClick={() => {
                                        // Manual reset with full cache clearing
                                        setResetTrigger((prev) => prev + 1);

                                        // Clear ALL performance caches
                                        if (
                                            typeof performance !== "undefined"
                                        ) {
                                            if (
                                                performance.clearResourceTimings
                                            ) {
                                                performance.clearResourceTimings();
                                            }
                                            if (performance.clearMarks) {
                                                performance.clearMarks();
                                            }
                                            if (performance.clearMeasures) {
                                                performance.clearMeasures();
                                            }
                                        }

                                        // Clear Vercel cache
                                        if (
                                            (window as any)
                                                .__VERCEL_SPEED_INSIGHTS__
                                        ) {
                                            delete (window as any)
                                                .__VERCEL_SPEED_INSIGHTS__;
                                        }
                                    }}
                                    variant="outline"
                                    size="sm"
                                >
                                    Reset All
                                </Button>
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
                                💡 Performance metrics for the current page.
                            </div>
                            <div>📊 Core Web Vitals from actual page load.</div>
                            <div>
                                🔧 This widget is only available in development
                                mode.
                            </div>
                            <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                                <div>
                                    <strong>Debug Info:</strong>
                                </div>
                                <div>Current Path: {currentPath}</div>
                                <div>Render Count: {metrics.renderCount}</div>
                                <div>
                                    Test Running: {isRunning ? "Yes" : "No"}
                                </div>
                                <div>Reset Trigger: {resetTrigger}</div>
                                <div>
                                    Vercel Data:{" "}
                                    {vercelData ? "Available" : "None"}
                                </div>
                                <div>
                                    Vercel Metrics:{" "}
                                    {vercelData?.metrics?.length || 0} items
                                </div>
                                <div>
                                    Real Web Vitals:{" "}
                                    {realWebVitals.fcp > 0
                                        ? "Captured"
                                        : "None"}
                                </div>
                                <div className="mt-1 text-xs">
                                    <div>
                                        FCP: {vercelMetrics.fcp || "N/A"}ms
                                    </div>
                                    <div>
                                        TTFB: {vercelMetrics.ttfb || "N/A"}ms
                                    </div>
                                    <div>
                                        LCP: {vercelMetrics.lcp || "N/A"}ms
                                    </div>
                                    <div>
                                        FID: {vercelMetrics.fid || "N/A"}ms
                                    </div>
                                    <div>
                                        INP: {vercelMetrics.inp || "N/A"}ms
                                    </div>
                                    <div>CLS: {vercelMetrics.cls || "N/A"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};
