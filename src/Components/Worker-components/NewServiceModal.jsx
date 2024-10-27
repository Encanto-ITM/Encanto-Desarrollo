import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import GenericButton from '../UI/GenericButton';

export default function NewServiceModal({ open, onClose, worker }) {
    const [serviceData, setServiceData] = useState({
        serviceName: '',
        price: '',
        materialList: '',
        details: '',
        schedule: '',
        considerations: '',
        aproxTime: '',
        typeServiceId: 9,
        typeServiceName: 'Corte de pelo caballeros',
    });
    const [typeServices, setTypeServices] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    //const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchTypeServices = async () => {
            try {
                const response = await fetch('https://tulookapiv2.vercel.app/api/api/type_services');
                const data = await response.json();
                setTypeServices(data);
            } catch (error) {
                console.error('Error fetching type services:', error);
            }
        };

        fetchTypeServices();
    }, []);

    
    useEffect(() => {
        if (open) {
            const fetchService = async () => {
                try {
                    const response = await fetch('https://tulookapiv2.vercel.app/api/api/services');
                    const data = await response.json();
                    console.log('Response data:', data);
                } catch (error) {
                    console.error('Error fetching service data:', error);
                }
            };

            fetchService();
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const validateForm = (data) => {
        let formErrors = {};
        if (!data.serviceName) formErrors.serviceName = 'El nombre del servicio es requerido.';
        if (!data.price) formErrors.price = 'El precio es requerido.';
        if (!data.materialList) formErrors.materialList = 'La lista de materiales es requerida.';
        if (!data.details) formErrors.details = 'Los detalles son requeridos.';
        if (!data.schedule) formErrors.schedule = 'El horario es requerido.';
        if (!data.considerations) formErrors.considerations = 'Las consideraciones son requeridas.';
        if (!data.aproxTime) formErrors.aproxTime = 'El tiempo aproximado es requerido.';
        return formErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm(serviceData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitted(true);
            return;
        }

        const newServiceData = {
            name: serviceData.serviceName,
            price: serviceData.price,
            material_list: serviceData.materialList,
            details: serviceData.details,
            schedule: serviceData.schedule,
            considerations: serviceData.considerations,
            aprox_time: serviceData.aproxTime,
            type_service_id: serviceData.typeServiceId,
            owner_id: worker.id,
            //image: null,
        };

        try {
            const response = await fetch('https://tulookapiv2.vercel.app/api/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newServiceData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response text:', errorText);
                throw new Error(`Error en el servidor: ${response.status}`);
            }

            const result = await response.json();
            console.log('Result:', result);

            onClose();
        } catch (error) {
            console.error('Error al crear el servicio:', error.message);
        }
    };

    const handleTypeServiceChange = (e) => {
        const selectedId = e.target.value;
        const selectedService = typeServices.find(service => service.id === parseInt(selectedId));
        setServiceData({
            ...serviceData,
            typeServiceId: selectedId,
            typeServiceName: selectedService?.name || '',
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-red-500 font-bold">X</button>
                    <h2 className="text-xl font-bold mb-4">Nuevo Servicio</h2>

                    <form onSubmit={handleSubmit}>
                        {/*<div className="mt-4">
                            <label className="block text-sm font-medium">Imagen del Servicio</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </div>*/}

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Nombre del Servicio</label>
                            <input
                                type="text"
                                name="serviceName"
                                value={serviceData.serviceName}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                            {submitted && errors.serviceName && <p className="text-red-500 text-sm mt-1">{errors.serviceName}</p>}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Precio</label>
                            <input
                                type="number"
                                name="price"
                                value={serviceData.price}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                            {submitted && errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Lista de Materiales</label>
                            <input
                                type="text"
                                name="materialList"
                                value={serviceData.materialList}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                            {submitted && errors.materialList && <p className="text-red-500 text-sm mt-1">{errors.materialList}</p>}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Detalles</label>
                            <textarea
                                name="details"
                                value={serviceData.details}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                            {submitted && errors.details && <p className="text-red-500 text-sm mt-1">{errors.details}</p>}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Horario</label>
                            <input
                                type="text"
                                name="schedule"
                                value={serviceData.schedule}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                            {submitted && errors.schedule && <p className="text-red-500 text-sm mt-1">{errors.schedule}</p>}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Consideraciones</label>
                            <textarea
                                name="considerations"
                                value={serviceData.considerations}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                            {submitted && errors.considerations && <p className="text-red-500 text-sm mt-1">{errors.considerations}</p>}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Tiempo Aproximado</label>
                            <input
                                type="text"
                                name="aproxTime"
                                value={serviceData.aproxTime}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                            {submitted && errors.aproxTime && <p className="text-red-500 text-sm mt-1">{errors.aproxTime}</p>}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Tipo de Servicio</label>
                            <select
                                name="typeServiceId"
                                value={serviceData.typeServiceId}
                                onChange={handleTypeServiceChange}
                                className="mt-1 p-2 border rounded w-full"
                            >
                                {typeServices.map(service => (
                                    <option key={service.id} value={service.id}>{service.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-center">
                            <GenericButton type="submit" placeholder="Agregar Servicio" />
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
