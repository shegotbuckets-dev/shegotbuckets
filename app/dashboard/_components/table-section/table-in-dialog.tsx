import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface TableInDialogProps<T> {
    headers: string[];
    data: T[];
    renderRow: (item: T, index: number) => React.ReactNode[];
}

export function TableInDialog<T>({
    headers,
    data,
    renderRow,
}: TableInDialogProps<T>) {
    if (!data.length) return null;

    return (
        <div className="relative h-full border rounded-md">
            <div className="absolute inset-0 overflow-auto">
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            {headers.map((header) => (
                                <TableHead key={header} className="text-center">
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                {renderRow(item, index).map(
                                    (cell, cellIndex) => (
                                        <TableCell
                                            key={cellIndex}
                                            className="text-center"
                                        >
                                            {cell}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
