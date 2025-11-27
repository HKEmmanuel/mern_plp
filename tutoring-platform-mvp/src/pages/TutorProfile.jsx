import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Mail, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTutor, createRequest } from '../services/api';

function TutorProfile() {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const data = await getTutor(id);
        setTutor(data);
      } catch (error) {
        console.error('Error fetching tutor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id]);

  if (loading) return <div className="text-center py-12">Chargement...</div>;

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tuteur non trouvé</h1>
          <Link to="/student-dashboard" className="text-primary-600 hover:text-primary-700">
            Retour à la liste des tuteurs
          </Link>
        </div>
      </div>
    );
  }

  const handleRequestSession = async (e) => {
    e.preventDefault();
    try {
      await createRequest({
        tutorId: tutor.user._id,
        subject: tutor.subject,
        level: tutor.level,
        message: requestMessage
      });
      alert(`Demande de session envoyée à ${tutor.user.name} !`);
      setRequestMessage('');
      setShowRequestForm(false);
    } catch (error) {
      alert('Erreur lors de l\'envoi de la demande');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        {/* Back Button */}
        <Link
          to="/student-dashboard"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la liste</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Header */}
              <div className="flex items-start space-x-6 mb-6 pb-6 border-b border-gray-200">
                <img
                  src={tutor.photo}
                  alt={tutor.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{tutor.name}</h1>
                  <p className="text-xl text-primary-600 font-semibold mb-2">{tutor.subject}</p>
                  <p className="text-gray-600 mb-3">{tutor.level}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(tutor.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">{tutor.rating}/5</span>
                    <span className="text-gray-600">({tutor.reviews} avis)</span>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos</h2>
                <p className="text-gray-700 leading-relaxed">{tutor.description}</p>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Disponibilités</h2>
                <div className="flex flex-wrap gap-3">
                  {tutor.availability.map((day) => (
                    <div
                      key={day}
                      className="flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-lg"
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Preview */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Avis récents</h2>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">Étudiant anonyme</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Excellent tuteur ! Explications claires et pédagogie au top. Je recommande vivement.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-gray-600 text-sm mb-2">Tarif</p>
                <p className="text-4xl font-bold text-primary-600">{tutor.rate}</p>
              </div>

              {/* Request Session */}
              {!showRequestForm ? (
                <button
                  onClick={() => setShowRequestForm(true)}
                  className="w-full btn-primary mb-3 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Demander une session</span>
                </button>
              ) : (
                <form onSubmit={handleRequestSession} className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre message
                  </label>
                  <textarea
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    required
                    rows="4"
                    placeholder="Décrivez brièvement vos besoins et vos disponibilités..."
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none mb-3"
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      Envoyer
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowRequestForm(false);
                        setRequestMessage('');
                      }}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              )}

              <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Contacter directement</span>
              </button>

              {/* Info Box */}
              <div className="mt-6 bg-primary-50 rounded-lg p-4">
                <p className="text-xs text-primary-900 leading-relaxed">
                  <strong>Note :</strong> Avant de réserver une session, assurez-vous de bien
                  décrire vos besoins et vos disponibilités au tuteur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;
