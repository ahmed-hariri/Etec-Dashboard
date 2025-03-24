import { accountTypes, categoriesTypes, contactsTypes, ordersTypes, productsTypes } from "@/types";

/* <!-- All functions to connect and crud with back-end --> */
export const fetchData = async <T extends productsTypes | categoriesTypes | ordersTypes | accountTypes | contactsTypes>
    (
        fetchFunction: () => Promise<T>,
        setStateFunction: React.Dispatch<React.SetStateAction<T>>,
        message?: string
    ): Promise<void> => {
    try {
        const response = await fetchFunction();
        setStateFunction(response ?? ({ data: [] } as unknown as T));
    } catch (error) {
        console?.error(message, error);
    }
}