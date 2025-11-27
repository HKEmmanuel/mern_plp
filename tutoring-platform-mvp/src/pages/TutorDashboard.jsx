import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, BookOpen, Calendar, CheckCircle, XCircle, PlusCircle } from 'lucide-react';
import { getTutorRequests, updateRequestStatus } from '../services/api';

function TutorDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getTutorRequests();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await updateRequestStatus(id, 'accepted');
      setRequests(requests.map(req =>
        req._id === id ? { ...req, status: 'accepted' } : req
      ));
      alert('Demande acceptée !');
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await updateRequestStatus(id, 'declined');
      setRequests(requests.map(req =>
        req._id === id ? { ...req, status: 'declined' } : req
      ));
      alert('Demande refusée.');
    } catch (error) {
      console.error('Error declining request:', error);
    }
  };

  if (loading) return <div className="text-center py-12">Chargement...</div>;

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const processedRequests = requests.filter(req => req.status !== 'pending');

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tableau de bord tuteur
          </h1>
          <p className="text-lg text-gray-600">
            Gérez votre profil et vos demandes de tutorat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar / Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                
                <div className="mt-6">
                  <Link 
                    to="/create-profile" 
                    className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors w-full"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Créer / Modifier Profil</span>
                  </Link>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Créez votre profil pour apparaître dans les recherches.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Requests Section */}
          <div className="lg:col-span-2">
            {/* Pending Requests */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Demandes en attente ({pendingRequests.length})
              </h2>

              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request._id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {request.student?.name || 'Étudiant inconnu'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {request.subject} • {request.level}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Reçu le {new Date(request.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-gray-700 text-sm">{request.message}</p>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleAccept(request._id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Accepter</span>
                        </button>
                        <button
                          onClick={() => handleDecline(request._id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Refuser</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-500">Aucune demande en attente pour le moment.</p>
                </div>
              )}
            </div>

            {/* Processed Requests */}
            {processedRequests.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Demandes traitées
                </h2>
                <div className="space-y-3">
                  {processedRequests.map((request) => (
                    <div key={request._id} className="bg-white rounded-lg shadow-sm p-4 opacity-75">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.student?.name}</h3>
                          <p className="text-sm text-gray-600">{request.subject}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {request.status === 'accepted' ? 'Acceptée' : 'Refusée'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorDashboard;
