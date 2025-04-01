import { Button } from "@/components/shared/chadcn/ui/button"
import { popUpTypes } from "@/types"

export default function RemoveAction(props: Partial<{
    title: string,
    popUp: popUpTypes,
    setPopUp: (popUp: popUpTypes) => void,
    method: (Id: string | null) => void,
}>) {
    const { title, popUp, setPopUp, method } = props

    return <>
        {popUp?.remove && (
            <div className="w-full h-screen backdrop-blur-sm fixed flex justify-center items-center">
                <div className="p-4 rounded-lg flex flex-col gap-5 text-black bg-white shadow-lg">
                    <h1 className="text-lg font-[600]">{`You want remove this ${title}!`}</h1>
                    <div className="ml-40 flex gap-3">
                        {['Remove', 'Cancel']?.map((button, index) => (
                            <Button key={index} className="text-[17px]" onClick={() => {
                                if (button === 'Cancel') {
                                    setPopUp?.({ remove: false, id: null })
                                } else {
                                    method?.(popUp?.id ?? null)
                                }
                            }}>
                                {button}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>
};