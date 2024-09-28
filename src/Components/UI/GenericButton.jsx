export default function GenericButton({ type = "button", onClick, placeholder, white = false }) {
    return (
        <button
            type={type}
            className={`font-bold flex items-center justify-center ${white ? 'bg-white hover:bg-gray-300 text-black' : 'bg-purple hover:bg-black text-white'} p-2 w-[80%] h-10 rounded-xl transition-colors duration-300 mt-3`}
            onClick={onClick}
        >
            {placeholder}
        </button>
    );
}
