export default function Title(props: { title: string, description: string }) {
    const { title, description } = props;

    return <>
        <div>
            <h1 className="text-[32px] font-[700]">{title}</h1>
            <p className="text-gray-700">{description}</p>
        </div>
    </>
}