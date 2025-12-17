export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'event' | 'reminder' | 'holiday';
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: '2025-12-15',
    time: '10:00',
    location: 'Conference Room A',
    description: 'Weekly team sync',
    type: 'event'
  },
  {
    id: '2',
    title: 'Project Deadline',
    date: '2025-12-20',
    time: '23:59',
    location: 'Office',
    description: 'Submit final project deliverables',
    type: 'reminder'
  },
  {
    id: '3',
    title: 'Christmas',
    date: '2025-12-25',
    time: '00:00',
    location: '',
    description: 'Christmas Day',
    type: 'holiday'
  },
  {
    id: '4',
    title: 'New Year\'s Eve',
    date: '2025-12-31',
    time: '20:00',
    location: 'Downtown',
    description: 'New Year celebration',
    type: 'event'
  },
  {
    id: '5',
    title: 'Doctor Appointment',
    date: '2025-12-10',
    time: '14:30',
    location: 'City Hospital',
    description: 'Annual checkup',
    type: 'event'
  }
];
