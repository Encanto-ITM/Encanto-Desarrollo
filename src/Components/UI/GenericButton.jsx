export default function GenericButton({type, onClick, placeholder }) {
    return (
        <button
            type={type}   
            className="font-bold flex items-center justify-center bg-purple hover:bg-black text-white p-2 w-[80%] h-10 rounded-xl transition-colors duration-300 mt-3"
            onClick={onClick}
        >
            {placeholder}
        </button>
    )
}