export default function GenericButton({ type = "button", onClick, placeholder, white = false, className = "" }) {
    return (
        <button
            type={type}
            className={`font-bold flex items-center justify-center ${white ? 'bg-white hover:bg-gray-300 text-black' : 'bg-purple hover:bg-black text-white'} p-2  h-10 rounded transition-colors duration-300 ${className}`}
            onClick={onClick}
        >
            {placeholder}
        </button>
    );
}
