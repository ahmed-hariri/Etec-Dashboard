import Title from "../title";

export default function DashboardComponents() {
    return <>
        <section className="w-[84%] h-screen flex justify-center px-10 py-5">
            <div className="w-full lg:min-w-[68rem] 2xl:max-w-[74rem]">
                <Title title="Dashboard" paragraphe="Welcome back, here's your order overview." />
            </div>
        </section>
    </>
}