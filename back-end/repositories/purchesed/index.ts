import purchesedModel from "../../models/purchesed"

/*---> Get all purchesed product repository <---*/
export const purchesedRepository = async () => {
    try {
        const purchesedProduct = await purchesedModel.find().populate("userId");
        if (purchesedProduct) {
            return { data: purchesedProduct, message: "Gel all purchesed product!" }
        }
        return { data: [], message: "You dont have any purchesed product" }
    } catch (error) {
        console.error("Error get purchesed product:", error);
        return { data: [], message: "Error get purchesed product!" }
    }
}