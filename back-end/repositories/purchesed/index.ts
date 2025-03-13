import { functionRepository, productTypes } from "../../dto";
import purchesedModel from "../../models/purchesed"

/*---> Get all purchesed product repository <---*/
export const purchesedRepository = async () => {
    try {
        const purchesedProduct = await purchesedModel.find().populate("userId", "email").populate({
            path: "products.productId",
            populate: { path: "categoryId", select: "categoryName" }
        });
        if (purchesedProduct) {
            return { data: purchesedProduct, message: "Gel all purchesed product!" }
        }
        return { data: [], message: "You dont have any purchesed product" }
    } catch (error) {
        console.error("Error get purchesed product:", error);
        return { data: [], message: "Error get purchesed product!" }
    }
}

/*---> Remove purchesed product repository <---*/
export const removePurchesedRepository: functionRepository<productTypes> = async (productId) => {
    const { id } = productId as productTypes
    try {
        const removeProduct = await purchesedModel.deleteOne({ _id: id });
        if (removeProduct.deletedCount === 1) {
            return { data: removeProduct.deletedCount, message: 'Purchesed product deleted successfully!' }
        }
        return { data: null, message: 'Product not found!' };
    } catch (error) {
        console.error('Error deleting purchesed product:', error);
        return { data: null, message: 'An error occurred while deleting the purchesed product.' };
    }
}