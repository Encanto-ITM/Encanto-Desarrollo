export default function ServiceCard({ serviceName }) {
    return (
        <section className="flex flex-col items-center bg-white p-6 drop-shadow-md rounded-xl gap-2 min-h-[300px] justify-center"> 
            <img 
                className="h-32 w-auto object-contain" 
                src="/img/Barberia.png" 
                alt="service" 
            />
            <h2 className="text-purple text-center text-xl font-semibold">
                {serviceName}
            </h2>
        </section>
    );
}
