import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Updated mock data
const payments = [
    {
        id: "INV001",
        amount: 250.0,
        status: "success",
        eventName: "College Basketball League",
        date: "2024-03-01",
    },
    {
        id: "INV002",
        amount: 150.0,
        status: "pending",
        eventName: "National Tournaments",
        date: "2024-03-02",
    },
    {
        id: "INV003",
        amount: 350.0,
        status: "success",
        eventName: "Summer Camp",
        date: "2024-03-03",
    },
    {
        id: "INV004",
        amount: 450.0,
        status: "failed",
        eventName: "Thanksgiving Camp",
        date: "2024-03-04",
    },
];

export default function PaymentsPage() {
    return (
        <div className="flex flex-col justify-center items-start flex-wrap px-4 pt-4 gap-4">
            <div className="grid md:grid-cols-1 sm:grid-cols-1 w-full gap-3">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Payment History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice ID</TableHead>
                                    <TableHead>Event Name</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-medium">
                                            {payment.id}
                                        </TableCell>
                                        <TableCell className="max-w-[200px]">
                                            {payment.eventName}
                                        </TableCell>
                                        <TableCell>
                                            ${payment.amount.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                payment.date
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    payment.status === "success"
                                                        ? "bg-green-100 text-green-800"
                                                        : payment.status ===
                                                            "pending"
                                                          ? "bg-yellow-100 text-yellow-800"
                                                          : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {payment.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
