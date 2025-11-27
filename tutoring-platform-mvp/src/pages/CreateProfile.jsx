import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BookOpen, DollarSign, Clock, Image as ImageIcon } from 'lucide-react';
import { createTutorProfile } from '../services/api';

function CreateProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    level: '',
    rate: '',
    description: '',
    photo: '',
    availability: []
  });

  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvailabilityChange = (day) => {
    if (formData.availability.includes(day)) {
      setFormData({
        ...formData,
        availability: formData.availability.filter(d => d !== day)
      });
    } else {
      setFormData({
        ...formData,
        availability: [...formData.availability, day]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTutorProfile(formData);
      navigate('/tutor-dashboard');
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Erreur lors de la création du profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Créer votre profil Tuteur</h1>
            <p className="text-gray-600 mt-2">Complétez vos informations pour être visible par les étudiants</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject & Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Matière</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Ex: Mathématiques"
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    name="level"
                    required
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.level}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Primaire">Primaire</option>
                    <option value="Collège">Collège</option>
                    <option value="Lycée">Lycée</option>
                    <option value="Supérieur">Supérieur</option>
                    <option value="Adulte">Adulte</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Rate & Photo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tarif horaire</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="rate"
                    required
                    placeholder="Ex: 25€/h"
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.rate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    name="photo"
                    required
                    placeholder="https://..."
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.photo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                required
                rows="4"
                placeholder="Présentez-vous, votre expérience et votre méthodologie..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Disponibilités</label>
              <div className="flex flex-wrap gap-3">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleAvailabilityChange(day)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.availability.includes(day)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Création en cours...' : 'Créer mon profil'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;
