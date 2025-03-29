import { categoriesTypes, popUpTypes } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shared/chadcn/ui/table"
import { Button } from "@/components/shared/chadcn/ui/button"
import TableMessage from "@/components/shared/table/message"

export default function CategorieTable(props: {
    categories: categoriesTypes,
    loading: boolean,
    tableHead: string[],
    handelCategorie: (categorieId: string | null) => void,
    setPopUp: (popUp: popUpTypes) => void
}) {
    const { categories, loading, tableHead, handelCategorie, setPopUp } = props

    return <>
        {loading ? (
            <iframe src="https://lottie.host/embed/95e591bc-3837-452b-9a4b-77ec3c873cc7/fEh9CBsGi6.lottie"></iframe>
        ) : (
            <Table className="rounded-lg overflow-hidden">
                <TableHeader className="bg-gray-100">
                    <TableRow className="border-b border-gray-300">
                        {tableHead && tableHead?.map((head, index) => (
                            <TableHead key={index} className="text-center">{head}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories && categories?.data?.length > 0 ? (
                        categories?.data?.map((categorie) => (
                            <TableRow key={categorie?._id} className="text-center">
                                <TableCell className="font-medium">{categorie?._id}</TableCell>
                                <TableCell className="font-bold text-[16.3px]">{categorie?.categoryName}</TableCell>
                                <TableCell className="flex justify-center gap-3">
                                    {['Modify', 'Remove']?.map((item, index) => (
                                        <Button key={index} className="px-[12px] py-[6px]" onClick={() => {
                                            if (item === 'Modify') {
                                                handelCategorie(categorie?._id ?? null)
                                            } else {
                                                setPopUp({ remove: true, categorieId: categorie?._id ?? null })
                                            }
                                        }}>
                                            {item}
                                        </Button>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableMessage colSpan={8} content="You dont have categories!" />
                    )}
                </TableBody>
            </Table>
        )}
    </>
}