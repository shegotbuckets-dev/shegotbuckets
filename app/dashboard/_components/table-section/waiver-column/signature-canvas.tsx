import { Button } from "@/components/ui/button";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { Check, Undo2 } from "lucide-react";

interface SignatureCanvasProps {
    onSave: (signature: string) => void;
    onCancel?: () => void;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
    onSave,
    onCancel,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    // Initialize canvas context
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.lineWidth = 2;
                ctx.lineCap = "round";
                ctx.strokeStyle = "var(--foreground)";
                contextRef.current = ctx;
            }
        }
    }, []);

    // Handle canvas resize
    const updateCanvasSize = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const parent = canvas.parentElement;
            if (parent) {
                const { width } = parent.getBoundingClientRect();
                setCanvasSize({ width, height: width * 0.5 });
            }
        }
    }, []);

    useEffect(() => {
        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);
        return () => window.removeEventListener("resize", updateCanvasSize);
    }, [updateCanvasSize]);

    // Drawing handlers
    const getCoordinates = (
        e:
            | React.MouseEvent<HTMLCanvasElement>
            | React.TouchEvent<HTMLCanvasElement>
    ): { x: number; y: number } | null => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const rect = canvas.getBoundingClientRect();
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    };

    const startDrawing = useCallback(
        (
            e:
                | React.MouseEvent<HTMLCanvasElement>
                | React.TouchEvent<HTMLCanvasElement>
        ) => {
            if ("touches" in e) e.preventDefault();
            const coords = getCoordinates(e);
            if (!coords || !contextRef.current) return;

            setIsDrawing(true);
            setHasSignature(true);
            contextRef.current.beginPath();
            contextRef.current.moveTo(coords.x, coords.y);
        },
        []
    );

    const draw = useCallback(
        (
            e:
                | React.MouseEvent<HTMLCanvasElement>
                | React.TouchEvent<HTMLCanvasElement>
        ) => {
            if (!isDrawing || !contextRef.current) return;
            if ("touches" in e) e.preventDefault();

            const coords = getCoordinates(e);
            if (!coords) return;

            contextRef.current.lineTo(coords.x, coords.y);
            contextRef.current.stroke();
            contextRef.current.beginPath();
            contextRef.current.moveTo(coords.x, coords.y);
        },
        [isDrawing]
    );

    const stopDrawing = useCallback(() => {
        setIsDrawing(false);
        if (contextRef.current) {
            contextRef.current.beginPath();
        }
    }, []);

    const clearSignature = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas && contextRef.current) {
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
            setHasSignature(false);
        }
    }, []);

    const saveSignature = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const signature = canvas.toDataURL("image/png");
            onSave(signature);
            onCancel?.();
        }
    }, [onSave, onCancel]);

    return (
        <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-xl font-bold mb-4">Sign Your Name</h2>
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    className="border-2 border-gray-300 rounded-lg touch-none w-[70vw] sm:w-[40rem] bg-background dark:bg-foreground"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
                {!hasSignature && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="text-gray-400">Sign here</p>
                    </div>
                )}
            </div>
            <p className="text-sm text-muted-foreground mt-2 mb-4">
                Use your finger or a stylus to sign above
            </p>
            <div className="flex justify-between w-[70vw] sm:w-[40rem] space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSignature}
                    disabled={!hasSignature}
                    className="border-2 hover:border-yellow-500 hover:bg-yellow-50 hover:text-yellow-600 disabled:border-gray-200"
                >
                    <Undo2 className="w-4 h-4 mr-2" />
                    Clear
                </Button>
                <Button
                    size="sm"
                    onClick={saveSignature}
                    disabled={!hasSignature}
                    className="hover:bg-primary-800 hover:opacity-80"
                >
                    <Check className="w-4 h-4 mr-2" />
                    Save Signature
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onCancel}
                    className="border-2 hover:border-red-500 hover:bg-red-50 hover:text-red-600 disabled:border-gray-200"
                >
                    Cancel
                </Button>
            </div>
        </motion.div>
    );
};
