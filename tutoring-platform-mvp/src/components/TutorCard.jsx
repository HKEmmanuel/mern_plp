import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';

function TutorCard({ tutor }) {
  return (
    <div className="card p-6 hover:-translate-y-1 transition-all duration-300">
      {/* Tutor Photo */}
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={tutor.photo}
          alt={tutor.user?.name || 'Tutor'}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{tutor.user?.name}</h3>
          <p className="text-primary-600 font-medium">{tutor.subject}</p>
          <p className="text-sm text-gray-600">{tutor.level}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{tutor.description}</p>

      {/* Rating & Reviews */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-gray-900">{tutor.rating}</span>
        </div>
        <span className="text-sm text-gray-600">({tutor.reviewsCount} avis)</span>
      </div>

      {/* Availability */}
      <div className="flex items-start space-x-2 mb-4">
        <Calendar className="w-4 h-4 text-gray-600 mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-gray-600 mb-1">Disponibilités :</p>
          <div className="flex flex-wrap gap-1">
            {tutor.availability.map((day) => (
              <span
                key={day}
                className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Price & CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          <p className="text-2xl font-bold text-primary-600">{tutor.rate}</p>
        </div>
        <Link
          to={`/tutor/${tutor._id}`}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          Voir le profil
        </Link>
      </div>
    </div>
  );
}

TutorCard.propTypes = {
  tutor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    subject: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    rate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    availability: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number.isRequired,
    reviewsCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default TutorCard;
