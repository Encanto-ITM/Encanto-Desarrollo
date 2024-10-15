import React, { useState, useEffect } from 'react';
import SignInputsEm from './SignInputsEm'; 
import GenericButton from './GenericButton'; 
import { sha256 } from 'js-sha256'; 


export function SignUpFormEm({ onToggleForm }) {
    
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

   
    const [professions, setProfessions] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const response = await fetch('https://tulookapiv2.vercel.app/api/api/professions');
                const data = await response.json();

               
                if (Array.isArray(data)) {
                    const filteredProfessions = data.filter(
                        profession => ![1, 7, 8].includes(profession.id) 
                    );
                    setProfessions(filteredProfessions); 
                } else {
                    console.error('La respuesta no contiene un arreglo de profesiones:', data);
                    setProfessions([]);
                }
            } catch (error) {
                console.error('Error al cargar las profesiones:', error); 
            }
        };

        fetchProfessions(); 
    }, []); 

   
    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData({ ...formData, [name]: value }); 
    };

    const handleProfessionChange = (e) => {
        setFormData({ ...formData, professions_id: e.target.value }); 
    };

  
    const validateForm = (data) => {
        let formErrors = {};
        if (!data.name) formErrors.name = "El nombre es requerido.";
        if (!data.lastname) formErrors.lastname = "El apellido es requerido.";
        if (!data.email) formErrors.email = "El correo electrónico es requerido.";
        if (!data.contact_number) formErrors.contact_number = "El número de contacto es requerido.";
        if (data.contact_number.length < 8) formErrors.contact_number = "El número de contacto debe tener al menos 10 dígitos.";
        if (!data.password) formErrors.password = "La contraseña es requerida.";
        if (data.password !== data.password_confirmation) {
            formErrors.password_confirmation = "Las contraseñas no coinciden."; 
        }
        if (!data.professions_id) formErrors.professions_id = "La profesión es requerida.";
        return formErrors; 
    };

  
    const handleSubmit = (e) => {
        e.preventDefault(); 
        setSubmitted(true); 
        setSuccessMessage(''); 

        const formErrors = validateForm(formData); 
        if (Object.keys(formErrors).length > 0) { 
            setErrors(formErrors); 
            return;
        }

     
        const formDataToSubmit = {
            ...formData,
            password: sha256(formData.password),
            password_confirmation: sha256(formData.password_confirmation),
        };

        console.log('Datos del formulario antes de enviar:', formDataToSubmit); 
       
        fetch('https://tulookapiv2.vercel.app/api/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataToSubmit), 
        })
        .then(response => response.json())
        .then(data => {
            console.log('Éxito:', data); 
            setSuccessMessage('Registro exitoso. Iniciar Sesión.'); 
            resetForm();
        })
        .catch((error) => {
            console.error('Error:', error); 
        });
    };

    
    const resetForm = () => {
        console.log("Resetting form..."); 
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
        setErrors({}); 
        setSubmitted(false); 
    };

 
    return (
        <section className="flex flex-col md:flex-row w-full max-w-4xl mx-auto p-8 overflow-hidden" style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}>
            <div className="flex flex-col w-full lg:w-1/2 bg-white gap-4 p-6 place-items-center rounded-tl-[40px] rounded-bl-[40px] shadow-lg flex-grow Forms">
                <div className="h-32 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                    <img
                        src="/img/identificador.png"
                        className="w-auto h-full mx-auto"
                        alt="identificador"
                    />
                </div>
                <h1 className="text-xl font-bold text-center mb-4">Registrarse</h1>

                
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

             
                <SignInputsEm 
                    placeholder="Nombre" 
                    name="name" 
                    onChange={handleChange} 
                    value={formData.name} 
                />
                {submitted && errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

                <SignInputsEm 
                    placeholder="Apellido" 
                    name="lastname"
                    onChange={handleChange} 
                    value={formData.lastname} 
                />
                {submitted && errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}

                <SignInputsEm 
                    placeholder="Correo electrónico" 
                    name="email" 
                    type="email"
                    onChange={handleChange} 
                    value={formData.email} 
                />
                {submitted && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <SignInputsEm 
                    placeholder="Número de contacto" 
                    name="contact_number" 
                    onChange={handleChange} 
                    value={formData.contact_number} 
                />
                {submitted && errors.contact_number && <p className="text-red-500 text-sm">{errors.contact_number}</p>}

                <div className="w-[80%]">
                    <select 
                        name="contact_public" 
                        onChange={handleChange} 
                        value={formData.contact_public} 
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
                    value={formData.password} 
                />
                {submitted && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                <SignInputsEm 
                    placeholder="Confirmar contraseña" 
                    name="password_confirmation" 
                    type="password" 
                    onChange={handleChange} 
                    value={formData.password_confirmation} 
                />
                {submitted && errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}

                <div className="w-[80%]">
                    <select 
                        name="professions_id" 
                        id="professions" 
                        onChange={handleProfessionChange} 
                        value={formData.professions_id} 
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

               
                <div onClick={onToggleForm} className="text-black hover:underline text-center cursor-pointer" role='button'>
                    Iniciar Sesión
                </div>
            </div>
            <div className="flex w-full lg:w-1/2 min-h-full overflow-hidden flex-grow hidden md:block">
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