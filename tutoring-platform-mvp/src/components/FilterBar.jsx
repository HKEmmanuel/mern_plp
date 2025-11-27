import { Filter } from 'lucide-react';
import PropTypes from 'prop-types';

function FilterBar({ selectedSubject, onSubjectChange, subjects }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <Filter className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-900">Filtrer par matière</h2>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSubjectChange('Tous')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            selectedSubject === 'Tous'
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tous
        </button>
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => onSubjectChange(subject)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedSubject === subject
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
}

FilterBar.propTypes = {
  selectedSubject: PropTypes.string.isRequired,
  onSubjectChange: PropTypes.func.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilterBar;
