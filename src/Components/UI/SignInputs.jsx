export default function SignInputs({ type, name, onChange, placeholder }) {
    return (
        <input 
            type={type}
            name={name}
           onChange={onChange}
            className="flex border-2 border-black text-center w-[80%]  h-10 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500  "
            placeholder={placeholder} 
        />
    );
}
