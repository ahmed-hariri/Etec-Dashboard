import { TableCell, TableRow } from "@/components/chadcn/ui/table";

export default function TableMessage(props: { colSpan: number, content: string }) {
    const { colSpan, content } = props;

    return <>
        <TableRow>
            <TableCell colSpan={colSpan} className="w-full text-center py-5 text-[17px] font-bold">
                <h1>{content}</h1>
            </TableCell>
        </TableRow>
    </>
}