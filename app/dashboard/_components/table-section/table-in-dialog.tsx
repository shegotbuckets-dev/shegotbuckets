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
    renderRow: (item: T) => React.ReactNode[];
}

export const TableInDialog = <T,>({
    headers,
    data,
    renderRow,
}: TableInDialogProps<T>) => {
    if (!data.length) return null;

    return (
        <div className="overflow-auto max-h-[400px] mt-4">
            <Table>
                <TableHeader>
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
                            {renderRow(item).map((cell, cellIndex) => (
                                <TableCell
                                    key={cellIndex}
                                    className="text-center"
                                >
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
