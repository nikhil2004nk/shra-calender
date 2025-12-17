import type { Event } from '../../data';

interface EventDetailsModalProps {
  event: Event | null;
  onClose: () => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {event.imageUrl && (
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
              <p className="text-gray-500 mt-1">
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {event.location && (
              <div>
                <h3 className="font-medium text-gray-900">Location</h3>
                <p className="text-gray-600">{event.location}</p>
              </div>
            )}

            {event.description && (
              <div>
                <h3 className="font-medium text-gray-900">Description</h3>
                <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
              </div>
            )}

            {'director' in event && (
              <div>
                <h3 className="font-medium text-gray-900">Director</h3>
                <p className="text-gray-600">{event.director}</p>
              </div>
            )}

            {'cast' in event && event.cast.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900">Cast</h3>
                <p className="text-gray-600">{event.cast.join(', ')}</p>
              </div>
            )}

            {'organizer' in event && (
              <div>
                <h3 className="font-medium text-gray-900">Organizer</h3>
                <p className="text-gray-600">{event.organizer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
