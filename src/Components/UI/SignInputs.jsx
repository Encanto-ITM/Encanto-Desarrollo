export default function SignInputs({ type, name, onChange, placeholder, className = "" }) {
    return (
        <input 
            type={type}
            name={name}
            onChange={onChange}
            className={`border-2 border-black text-center w-full h-12 rounded-xl shadow-sm transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent ${className}`} // Cambié a backticks
            placeholder={placeholder} 
        />
    );
}
