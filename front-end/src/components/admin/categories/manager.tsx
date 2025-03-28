"use client"

import { useCallback, useEffect } from "react";
import Title from "../../shared/title";
import { Input } from "@/components/shared/chadcn/ui/input"
import { Label } from "@/components/shared/chadcn/ui/label"
import { Button } from "@/components/shared/chadcn/ui/button"
import { toast, Toaster } from "sonner";
import { createNewCategorie, fetchAllCategories, refreshCache, removeCategorie, updateCategorie } from "@/api/category";
import { fetchData } from "@/util/fetchData";
import useCategorieStore from "@/store/pages/categoriesStore";
import CategorieTable from "./table";
import CategorieAction from "./action";

export default function CategoriesComponents() {
    /*---> States (Zustand) <---*/
    const {
        categorie, setCategorie,
        categories, setCategories,
        loading, setLoading,
        popUp, setPopUp
    } = useCategorieStore()
    const tableHead: string[] = ['Categorie ID', 'Name', 'Action']

    /*---> Functions <---*/
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCategorie?.(e?.target?.value);
    }
    const handleValues = useCallback(async (): Promise<void> => {
        const validation: boolean = categorie?.trim() !== "";
        if (!validation) {
            toast?.warning("Please fill in all the fields.");
            return
        }
        await addNewCategorie()
    }, [categorie])
    const addNewCategorie = async (): Promise<void> => {
        try {
            const response = await createNewCategorie({ categoryName: categorie ?? "" });
            if (response?.message === "Category has been created!") {
                toast?.success(response?.message)
                setCategorie?.('')
                refreshCache() // Clears the cache to fetch new data.
                await fetchData(fetchAllCategories, setCategories)
            } else {
                toast?.warning(response?.error)
                return
            }
        } catch (error) {
            console?.error("Error create categorie : ", error)
        }
    }
    const handelCategorie = (id: string | null): void => {
        const findCategorie = categories?.data?.find((product) => product?._id === id);
        if (findCategorie) {
            setPopUp?.({ modify: true, categorieId: id ?? null })
            setCategorie?.(findCategorie?.categoryName)
        }
    }
    const modifyCategorie = async (categorieId: string | null): Promise<void> => {
        try {
            const response = await updateCategorie(categorieId, { categoryName: categorie ?? "" });
            if (response?.message === "Categorie updated successfully!") {
                toast?.success(response?.message)
                setPopUp?.({ modify: false, remove: false, categorieId: '' });
                setCategorie?.('')
                refreshCache()
                await fetchData(fetchAllCategories, setCategories)
            }
        } catch (error) {
            console?.error("Error delete categorie : ", error)
        }
    }
    const deleteCategorie = async (categorieName: string | null): Promise<void> => {
        try {
            const response = await removeCategorie(categorieName);
            if (response?.message === "Category deleted successfully!") {
                toast?.success(response?.message)
                setPopUp?.({ modify: false, remove: false, categorieId: '' });
                refreshCache()
                await fetchData(fetchAllCategories, setCategories)
            }
        } catch (error) {
            console?.error("Error delete categorie : ", error)
        }
    }

    /*---> Effects <---*/
    useEffect(() => {
        fetchData(fetchAllCategories, setCategories, "Error get all categories :");
        setLoading(false);
    }, [setCategories, setLoading]);
    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Categories" paragraphe="Welcome back, here’s an overview of your categories." />
                <div className="w-full flex flex-col lg:flex-row items-center gap-3">
                    {/* <!-- Input --> */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-2">
                        <Label htmlFor="categorie" className="text-[16px]">Categorie</Label>
                        <Input type="text" id="categorie" placeholder="categorie" className="py-4" onChange={handleChange} value={categorie} />
                    </div>
                    {/* <!-- Button --> */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:mt-9">
                        <Button className="py-[19px] text-[15px]" onClick={handleValues}>
                            Create Categorie
                        </Button>
                    </div>
                </div>
                {/* <!-- Table Categories --> */}
                <CategorieTable
                    categories={categories} loading={loading} tableHead={tableHead ?? []}
                    handelCategorie={handelCategorie} setPopUp={setPopUp ?? (() => { })}
                />
            </div>
        </section>
        {/* <!-- Message --> */}
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
        {/* <!-- Remove Categorie --> */}
        <CategorieAction type="remove" popUp={popUp} setPopUp={setPopUp} methode={deleteCategorie} />
        {/* <!-- Modify Categorie --> */}
        <CategorieAction
            type="modify" popUp={popUp} setPopUp={setPopUp} methode={modifyCategorie}
            handleChange={handleChange} value={categorie}
        />
    </>
}