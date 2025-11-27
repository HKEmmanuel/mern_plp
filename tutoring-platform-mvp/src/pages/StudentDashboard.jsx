import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import TutorCard from '../components/TutorCard';
import FilterBar from '../components/FilterBar';
import { getTutors } from '../services/api';

function StudentDashboard() {
  const [selectedSubject, setSelectedSubject] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const data = await getTutors();
        setTutors(data);
      } catch (error) {
        console.error('Error fetching tutors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  // Extract unique subjects from tutors data
  const subjects = [...new Set(tutors.map((tutor) => tutor.subject))];

  // Filter tutors based on selected subject and search query
  const filteredTutors = tutors.filter((tutor) => {
    const matchesSubject = selectedSubject === 'Tous' || tutor.subject === selectedSubject;
    const matchesSearch = tutor.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  if (loading) return <div className="text-center py-12">Chargement...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Trouvez votre tuteur idéal
          </h1>
          <p className="text-lg text-gray-600">
            Parcourez notre sélection de tuteurs qualifiés et trouvez celui qui vous correspond
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par nom, matière ou mots-clés..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          subjects={subjects}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredTutors.length}</span>{' '}
            {filteredTutors.length === 1 ? 'tuteur trouvé' : 'tuteurs trouvés'}
          </p>
        </div>

        {/* Tutors Grid */}
        {filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun tuteur ne correspond à votre recherche.
            </p>
            <button
              onClick={() => {
                setSelectedSubject('Tous');
                setSearchQuery('');
              }}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
