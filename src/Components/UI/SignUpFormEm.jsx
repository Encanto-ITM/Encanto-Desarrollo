import React, { useState, useEffect } from 'react';
import SignInputsEm from './SignInputsEm'; // Componente para los inputs con parametro value
import GenericButton from './GenericButton'; // Componente para el botón genérico
import { sha256 } from 'js-sha256'; // Importación de la función de hash

// Componente principal del formulario de registro
export function SignUpFormEm({ onToggleForm }) {
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        contact_number: '',
        contact_public: '0',
        is_active: '1',
        password: '',
        password_confirmation: '',
        acounttype_id: '3',
        professions_id: '',
    });

    // Estado para las profesiones, errores y estado de envío
    const [professions, setProfessions] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Hook para cargar profesiones desde una API al montar el componente
    useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const response = await fetch('https://tulook-api.vercel.app/api/api/professions');
                const data = await response.json();

                // Verifica si la respuesta es un arreglo
                if (Array.isArray(data.data)) {
                    const filteredProfessions = data.data.filter(
                        profession => ![1, 7, 8].includes(profession.id) // Filtra profesiones específicas
                    );
                    setProfessions(filteredProfessions); // Actualiza el estado de profesiones
                } else {
                    console.error('La respuesta no contiene un arreglo de profesiones:', data);
                    setProfessions([]);
                }
            } catch (error) {
                console.error('Error al cargar las profesiones:', error); // Manejo de errores
            }
        };

        fetchProfessions(); // Llama a la función para obtener profesiones
    }, []); // Dependencias vacías, solo se ejecuta al montar

    // Maneja los cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target; // Desestructura nombre y valor del input
        setFormData({ ...formData, [name]: value }); // Actualiza el estado del formulario
    };

    // Maneja el cambio en la selección de profesiones
    const handleProfessionChange = (e) => {
        setFormData({ ...formData, professions_id: e.target.value }); // Actualiza la profesión seleccionada
    };

    // Valida los datos del formulario
    const validateForm = (data) => {
        let formErrors = {}; // Objeto para almacenar errores
        if (!data.name) formErrors.name = "El nombre es requerido.";
        if (!data.lastname) formErrors.lastname = "El apellido es requerido.";
        if (!data.email) formErrors.email = "El correo electrónico es requerido.";
        if (!data.contact_number) formErrors.contact_number = "El número de contacto es requerido.";
        if (data.contact_number.length < 8) formErrors.contact_number = "El número de contacto debe tener al menos 10 dígitos.";
        if (!data.password) formErrors.password = "La contraseña es requerida.";
        if (data.password !== data.password_confirmation) {
            formErrors.password_confirmation = "Las contraseñas no coinciden."; // Verifica que las contraseñas coincidan
        }
        if (!data.professions_id) formErrors.professions_id = "La profesión es requerida.";
        return formErrors; // Devuelve los errores encontrados
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        setSubmitted(true); // Cambia el estado de enviado a verdadero
        setSuccessMessage(''); // Limpia el mensaje de éxito al intentar enviar

        const formErrors = validateForm(formData); // Valida el formulario
        if (Object.keys(formErrors).length > 0) { // Si hay errores
            setErrors(formErrors); // Establece los errores en el estado
            return; // Sale de la función
        }

        // Prepara los datos para enviar, encriptando las contraseñas
        const formDataToSubmit = {
            ...formData,
            password: sha256(formData.password),
            password_confirmation: sha256(formData.password_confirmation),
        };

        console.log('Datos del formulario antes de enviar:', formDataToSubmit); // Muestra los datos en la consola

        // Envía los datos a la API
        fetch('https://tulook-api.vercel.app/api/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataToSubmit), // Convierte a JSON
        })
        .then(response => response.json())
        .then(data => {
            console.log('Éxito:', data); // Muestra la respuesta de éxito
            setSuccessMessage('Registro exitoso. Iniciar Sesión.'); // Mensaje de éxito
            resetForm(); // Llama a la función para limpiar el formulario
        })
        .catch((error) => {
            console.error('Error:', error); // Manejo de errores en el envío
        });
    };

    // Resetea los campos del formulario
    const resetForm = () => {
        console.log("Resetting form..."); // Log para verificar si se llama
        setFormData({
            name: '',
            lastname: '',
            email: '',
            contact_number: '',
            contact_public: '0',
            is_active: '1',
            password: '',
            password_confirmation: '',
            acounttype_id: '3',
            professions_id: '',
        });
        setErrors({}); // Limpia errores
        setSubmitted(false); // Resetear estado de envío
    };

    // Renderiza el formulario
    return (
        <section className="flex flex-col md:flex-row w-full max-w-4xl mx-auto p-8 overflow-hidden">
            <div className="flex flex-col w-full lg:w-1/2 bg-white gap-4 p-6 place-items-center rounded-tl-[40px] rounded-bl-[40px] shadow-lg flex-grow Forms">
                <div className="h-32 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                    <img
                        src="/img/identificador.png"
                        className="w-auto h-full mx-auto"
                        alt="identificador"
                    />
                </div>
                <h1 className="text-xl font-bold text-center mb-4">Registrarse</h1>

                {/* Muestra el mensaje de éxito si existe */}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                {/* Campos del formulario */}
                <SignInputsEm 
                    placeholder="Nombre" 
                    name="name" 
                    onChange={handleChange} 
                    value={formData.name} // Control del input
                />
                {submitted && errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

                <SignInputsEm 
                    placeholder="Apellido" 
                    name="lastname"
                    onChange={handleChange} 
                    value={formData.lastname} // Control del input
                />
                {submitted && errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}

                <SignInputsEm 
                    placeholder="Correo electrónico" 
                    name="email" 
                    type="email"
                    onChange={handleChange} 
                    value={formData.email} // Control del input
                />
                {submitted && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <SignInputsEm 
                    placeholder="Número de contacto" 
                    name="contact_number" 
                    onChange={handleChange} 
                    value={formData.contact_number} // Control del input
                />
                {submitted && errors.contact_number && <p className="text-red-500 text-sm">{errors.contact_number}</p>}

                <div className="w-[80%]">
                    <select 
                        name="contact_public" 
                        onChange={handleChange} 
                        value={formData.contact_public} // Control del input
                        className="flex border-2 border-black text-center w-full h-10 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="0">Contacto Público No</option>
                        <option value="1">Contacto Público Sí</option>
                    </select>
                </div>

                <SignInputsEm 
                    placeholder="Contraseña" 
                    name="password" 
                    type="password" 
                    onChange={handleChange} 
                    value={formData.password} // Control del input
                />
                {submitted && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                <SignInputsEm 
                    placeholder="Confirmar contraseña" 
                    name="password_confirmation" 
                    type="password" 
                    onChange={handleChange} 
                    value={formData.password_confirmation} // Control del input
                />
                {submitted && errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}

                <div className="w-[80%]">
                    <select 
                        name="professions_id" 
                        id="professions" 
                        onChange={handleProfessionChange} 
                        value={formData.professions_id} // Control del input
                        className="flex border-2 border-black text-center w-full h-10 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">Selecciona una profesión</option>
                        {Array.isArray(professions) && professions.length > 0 ? (
                            professions.map((profession) => (
                                <option key={profession.id} value={profession.id}>
                                    {profession.profession}
                                </option>
                            ))
                        ) : (
                            <option value="">No hay profesiones disponibles</option>
                        )}
                    </select>
                    {submitted && errors.professions_id && <p className="text-red-500 text-sm">{errors.professions_id}</p>}
                </div>

                <GenericButton 
                    type="button" 
                    onClick={handleSubmit} 
                    placeholder="Registrarse" 
                />

                {/* Enlace para cambiar a inicio de sesión */}
                <div onClick={onToggleForm} className="text-black hover:underline text-center cursor-pointer" role='button'>
                    Iniciar Sesión
                </div>
            </div>
            <div className="flex w-full lg:w-1/2 min-h-full overflow-hidden flex-grow md:block">
                <img
                    src="/img/Register-Hombre.png"
                    className="w-full h-full object-cover rounded-tr-[40px] rounded-br-[40px]"
                    alt="Register Hombre"
                    loading="lazy"
                />
            </div>
        </section>
    );
}