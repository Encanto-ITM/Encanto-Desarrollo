export default function SignInputs({ placeholder }) {
    return (
        <input 
            type="text" 
            className="flex border-2 border-black text-center w-full md:w-[90%] lg:w-[80%]  h-10 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 p-2 sm:w-1/2"
            placeholder={placeholder} 
        />
    );
}
