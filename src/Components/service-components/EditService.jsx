import React, { useState } from 'react';
import Modal from '@mui/material/Modal';

export function EditService({ serviceData, isOpen, onClose, onUpdate }) {
    const [name, setName] = useState(serviceData.name || '');
    const [price, setPrice] = useState(serviceData.price || '');
    const [schedule, setSchedule] = useState(serviceData.schedule || '');
    const [materialList, setMaterialList] = useState(serviceData.material_list || '');
    const [considerations, setConsiderations] = useState(serviceData.considerations || '');
    const [aproxTime, setAproxTime] = useState(serviceData.aprox_time || '');
    const [details, setDetails] = useState(serviceData.details || '');
    const [fieldToEdit, setFieldToEdit] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedService = {
            name,
            price,
            schedule,
            material_list: materialList,
            considerations,
            aprox_time: aproxTime,
            details,
        };

        try {
            const response = await fetch(`https://tulookapiv2.vercel.app/api/api/services/${serviceData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedService),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el servicio');
            }
            const result = await response.json();
            onUpdate(result);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-red-500 font-bold">X</button>
                    <h2 className="text-xl font-bold mb-4">Editar Servicio</h2>
                    {fieldToEdit && <h3 className="text-lg mb-2">Modificando: {fieldToEdit}</h3>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Nombre del Servicio</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setFieldToEdit('Nombre');
                                }}
                                placeholder="Nombre del servicio"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Precio</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                    setFieldToEdit('Precio');
                                }}
                                placeholder="Precio"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Horario</label>
                            <input
                                type="text"
                                value={schedule}
                                onChange={(e) => {
                                    setSchedule(e.target.value);
                                    setFieldToEdit('Horario');
                                }}
                                placeholder="Horario"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Materiales</label>
                            <textarea
                                value={materialList}
                                onChange={(e) => {
                                    setMaterialList(e.target.value);
                                    setFieldToEdit('Materiales');
                                }}
                                placeholder="Materiales"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Consideraciones</label>
                            <textarea
                                value={considerations}
                                onChange={(e) => {
                                    setConsiderations(e.target.value);
                                    setFieldToEdit('Consideraciones');
                                }}
                                placeholder="Consideraciones"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Duración Estimada</label>
                            <input
                                type="text"
                                value={aproxTime}
                                onChange={(e) => {
                                    setAproxTime(e.target.value);
                                    setFieldToEdit('Duración Estimada');
                                }}
                                placeholder="Duración estimada"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Detalles</label>
                            <textarea
                                value={details}
                                onChange={(e) => {
                                    setDetails(e.target.value);
                                    setFieldToEdit('Detalles');
                                }}
                                placeholder="Detalles"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 rounded text-white">Cancelar</button>
                            <button type="submit" className="px-4 py-2 bg-purple rounded text-white">Guardar Cambios</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
