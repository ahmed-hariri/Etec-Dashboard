import { Button } from "@/components/shared/chadcn/ui/button"
import { popUpTypes } from "@/types"

export default function PuchasedAction(props: Partial<{
    popUp: popUpTypes,
    setPopUp: (popUp: popUpTypes) => void,
    methode: (Id: string | null) => void,
}>) {
    const { popUp, setPopUp, methode } = props

    return <>
        {popUp?.remove && (
            <div className="w-full h-screen backdrop-blur-sm fixed flex justify-center items-center">
                <div className="p-4 rounded-lg bg-black flex flex-col gap-5 text-white shadow-lg">
                    <h1 className="text-lg font-[600]">You want remove this products!</h1>
                    <div className="ml-40 flex gap-3">
                        {[
                            { name: 'Remove', style: 'text-[17px] bg-red-500 text-white' },
                            { name: 'Cancel', style: 'text-[17px] bg-white text-black hover:text-white' }
                        ]?.map((item, index) => (
                            <Button key={index} className={`${item?.style}`} onClick={() => {
                                if (item?.name === 'Cancel') {
                                    setPopUp?.({ remove: false, productId: null })
                                } else {
                                    methode?.(popUp?.productId ?? null)
                                }
                            }}>
                                {item?.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>
};