import { Input } from "@/components/shared/chadcn/ui/input"
import { Label } from "@/components/shared/chadcn/ui/label"
import { Button } from "@/components/shared/chadcn/ui/button"
import { popUpTypes } from "@/types"

export default function CategorieAction(props: Partial<{
    popUp: popUpTypes,
    setPopUp: (popUp: popUpTypes) => void,
    method: (Id: string | null) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
}>) {
    const { popUp, setPopUp, method, handleChange, value } = props

    return <>
        {popUp?.modify && (
            <div className="w-full h-screen backdrop-blur-sm absolute flex justify-center items-center px-5 lg:px-0 z-50">
                <div className="w-full lg:max-w-[500px]">
                    <div className="w-full p-5 rounded-lg bg-[#f9f9f9] flex flex-col gap-5 text-black shadow-lg">
                        <h1 className="text-lg font-[600]">You want update this categorie!</h1>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col lg:flex-row gap-3">
                                {/* <!-- Inputs --> */}
                                <div className="w-full flex flex-col gap-2">
                                    <Label htmlFor="categorie" className="text-[16px]">Categorie</Label>
                                    <Input type="text" id="categorie" placeholder="categorie" className="py-4" onChange={handleChange} value={value ?? ""} />
                                </div>
                            </div>
                            {/* <!-- Buttons --> */}
                            <div className="w-full flex flex-col lg:flex-row justify-between gap-2">
                                {['Modify', 'Cancel']?.map((item, index) => (
                                    <Button key={index} className="w-full lg:w-1/2 py-[24px] text-[18px]" onClick={() => {
                                        if (item === 'Cancel') {
                                            setPopUp?.({ modify: false, id: null })
                                        } else {
                                            method?.(popUp?.id ?? null)
                                        }
                                    }}>
                                        {item}
                                    </Button>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
};