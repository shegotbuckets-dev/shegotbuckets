"use client";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

export function Combobox({
    name,
    selectPlaceholder,
    options,
}: {
    name: string;
    selectPlaceholder: string;
    options: { label: string }[];
}) {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    return (
        <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">{name}</p>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {selectedOption
                            ? options.find(
                                  (option) => option.label === selectedOption
                              )?.label
                            : selectPlaceholder}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.label}
                                        value={option.label}
                                        onSelect={(currentValue) => {
                                            setSelectedOption(
                                                currentValue === selectedOption
                                                    ? ""
                                                    : currentValue
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        {option.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                selectedOption === option.label
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
