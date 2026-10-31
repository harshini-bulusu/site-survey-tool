import React, { useState, useEffect } from 'react';
import SurveyService from '../services/survey.service';
import { Plus, Building, MapPin } from 'lucide-react';
import BuildingManager from './BuildingManager';

const PropertyManager = () => {
    const [properties, setProperties] = useState([]);
    const [newProperty, setNewProperty] = useState({ name: '', address: '', clientName: '' });
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [creatingSurveyFor, setCreatingSurveyFor] = useState(null);
    const [surveyName, setSurveyName] = useState('');
    const [surveyMessage, setSurveyMessage] = useState('');
    const [creatingSurvey, setCreatingSurvey] = useState(false);

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const response = await SurveyService.getAllProperties();
            setProperties(response.data);
        } catch (error) {
            console.error("Error loading properties:", error);
        }
    };

    const handleCreateProperty = async (e) => {
        e.preventDefault();
        try {
            await SurveyService.createProperty(newProperty);
            setNewProperty({ name: '', address: '', clientName: '' });
            setShowForm(false);
            loadProperties();
        } catch (error) {
            console.error("Error creating property:", error);
        }
    };

    const handleCreateSurvey = async (e, propertyId) => {
        e.preventDefault();
        e.stopPropagation();
        setCreatingSurvey(true);
        setSurveyMessage('');

        try {
            await SurveyService.createSurvey(propertyId, surveyName.trim());
            setSurveyMessage('Survey created. Refreshing dashboard...');
            window.location.reload();
        } catch (error) {
            const message = error.response?.data?.message || error.response?.data || error.message;
            setSurveyMessage(`Could not create survey: ${message}`);
        } finally {
            setCreatingSurvey(false);
        }
    };

    if (selectedProperty) {
        return (
            <div>
                <button
                    onClick={() => setSelectedProperty(null)}
                    className="mb-4 text-primary hover:underline flex items-center"
                >
                    &larr; Back to Properties
                </button>
                <h2 className="text-2xl font-bold mb-4">{selectedProperty.name}</h2>
                <BuildingManager propertyId={selectedProperty.id} />
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Properties</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Property
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <form onSubmit={handleCreateProperty} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Property Name"
                                className="input-field"
                                value={newProperty.name}
                                onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                className="input-field"
                                value={newProperty.address}
                                onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Client Name"
                                className="input-field"
                                value={newProperty.clientName}
                                onChange={(e) => setNewProperty({ ...newProperty, clientName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="btn-primary">Save Property</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(property => (
                    <div
                        key={property.id}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setSelectedProperty(property)}
                    >
                        <div className="flex items-start justify-between">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Building className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">{property.name}</h3>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            {property.address}
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Client: {property.clientName}</p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setCreatingSurveyFor(creatingSurveyFor === property.id ? null : property.id);
                                setSurveyName('');
                                setSurveyMessage('');
                            }}
                            className="mt-4 w-full py-2 bg-gray-50 text-gray-700 rounded hover:bg-gray-100 text-sm font-medium border border-gray-200"
                        >
                            {creatingSurveyFor === property.id ? 'Cancel' : 'Create Survey'}
                        </button>
                        {creatingSurveyFor === property.id && (
                            <form
                                onSubmit={(e) => handleCreateSurvey(e, property.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="mt-3 space-y-2"
                            >
                                <input
                                    type="text"
                                    placeholder="Survey name"
                                    className="input-field"
                                    value={surveyName}
                                    onChange={(e) => setSurveyName(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn-primary w-full" disabled={creatingSurvey}>
                                    {creatingSurvey ? 'Creating...' : 'Save Survey'}
                                </button>
                                {surveyMessage && <p className="text-sm text-red-600">{surveyMessage}</p>}
                            </form>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyManager;
