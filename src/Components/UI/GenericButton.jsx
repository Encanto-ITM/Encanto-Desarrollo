export default function GenericButton ({placeholder}) {
    return (
        <button className=" font-bold flex items-center justify-center bg-purple hover:bg-black text-white p-2 w-[80%] h-10 rounded-xl transition-colors duration-300 mt-3">{placeholder}</button>
    )
}