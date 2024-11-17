import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { RosterData } from "./register-button";

interface PreviewTableProps {
    data: RosterData[];
}

export const PreviewTable = ({ data }: PreviewTableProps) => {
    if (!data.length) return null;

    const columns = Object.keys(data[0]);

    return (
        <div className="overflow-auto max-h-[400px] mt-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column} className="text-center">
                                {column}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                <TableCell key={column} className="text-center">
                                    {row[column]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
