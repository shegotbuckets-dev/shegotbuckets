import { Button } from "@/components/ui/button";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { Check, Undo2 } from "lucide-react";

interface SignatureCanvasProps {
    onSave: (signature: string) => void;
    onClose: () => void;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
    onSave,
    onClose,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateCanvasSize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const parent = canvas.parentElement;
                if (parent) {
                    const { width } = parent.getBoundingClientRect();
                    setCanvasSize({ width, height: width * 0.5 });
                }
            }
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);
        return () => window.removeEventListener("resize", updateCanvasSize);
    }, []);

    const startDrawing = useCallback(
        (
            e:
                | React.MouseEvent<HTMLCanvasElement>
                | React.TouchEvent<HTMLCanvasElement>
        ) => {
            setIsDrawing(true);
            setHasSignature(true);
            draw(e);
        },
        []
    );

    const stopDrawing = useCallback(() => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.beginPath();
        }
    }, []);

    const draw = useCallback(
        (
            e:
                | React.MouseEvent<HTMLCanvasElement>
                | React.TouchEvent<HTMLCanvasElement>
        ) => {
            if (!isDrawing) return;
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.lineWidth = 2;
                    ctx.lineCap = "round";
                    ctx.strokeStyle = "#000";

                    let clientX, clientY;
                    if ("touches" in e) {
                        e.preventDefault(); // Prevent scrolling on touch devices
                        clientX = e.touches[0].clientX;
                        clientY = e.touches[0].clientY;
                    } else {
                        clientX = e.clientX;
                        clientY = e.clientY;
                    }

                    const rect = canvas.getBoundingClientRect();
                    const x = clientX - rect.left;
                    const y = clientY - rect.top;

                    ctx.lineTo(x, y);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                }
            }
        },
        [isDrawing]
    );

    const clearSignature = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setHasSignature(false);
            }
        }
    }, []);

    const saveSignature = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const signature = canvas.toDataURL();
            onSave(signature);
            onClose();
        }
    }, [onSave]);

    return (
        <motion.div
            className="flex flex-col items-center sm:max-w-[50rem] mx-auto p-4 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-xl font-boldmb-4">Sign Here</h2>
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    className="border-2 border-gray-300 rounded-lg touch-none w-[70vw] sm:w-[40rem]"
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
            <div className="flex justify-between w-full space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSignature}
                    disabled={!hasSignature}
                >
                    <Undo2 className="w-4 h-4 mr-2" />
                    Clear
                </Button>
                <Button
                    size="sm"
                    onClick={saveSignature}
                    disabled={!hasSignature}
                >
                    <Check className="w-4 h-4 mr-2" />
                    Save Signature
                </Button>
            </div>
            <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="mt-2"
            >
                Cancel
            </Button>
        </motion.div>
    );
};
