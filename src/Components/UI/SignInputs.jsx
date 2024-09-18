export default function SignInputs({ placeholder }) {
    return (
        <input 
            type="text" 
            className="w-full border border-gray-300 rounded-md p-2 mb-4 hover:bg-gray-200 transition duration-300"
            placeholder={placeholder} 
        />
    );
}
