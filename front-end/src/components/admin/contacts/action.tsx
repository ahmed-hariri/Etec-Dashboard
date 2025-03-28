import { Button } from "@/components/shared/chadcn/ui/button"
import { popUpTypes } from "@/types"

export default function ContactsAction(props: Partial<{
    popUp: popUpTypes,
    setPopUp: (popUp: popUpTypes) => void,
    methode: (Id: string | null) => void,
}>) {
    const { popUp, setPopUp, methode } = props

    return <>
        {/* <!-- Remove contact --> */}
        {popUp?.remove && (
            <div className="w-full h-screen backdrop-blur-sm fixed flex justify-center items-center">
                <div className="p-4 rounded-lg bg-[#f9f9f9] flex flex-col gap-5 text-black shadow-lg">
                    <h1 className="text-lg font-[600]">You want remove this products!</h1>
                    <div className="ml-40 flex gap-3">
                        {['Remove', 'Cancel']?.map((item, index) => (
                            <Button key={index} className="text-[17px]" onClick={() => {
                                if (item === 'Cancel') {
                                    setPopUp?.({ remove: false, productId: null })
                                } else {
                                    methode?.(popUp?.contactId ?? null)
                                }
                            }}>
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>
};