export default function ServiceCard({ serviceName }) {
    return (
        <section className="flex flex-col items-center bg-white p-8 drop-shadow-md rounded-xl gap-4">
            <img className="h-auto object-contain" src="/img/Barberia.png" alt="service" />
            <h2 className="text-purple text-center">{serviceName}</h2>
        </section>
    );
}