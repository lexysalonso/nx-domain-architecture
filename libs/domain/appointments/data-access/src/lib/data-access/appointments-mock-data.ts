import {
  Appointment,
  AppointmentLocation,
} from '@proj/domain/appointments/model';

export const MOCK_LOCATIONS: AppointmentLocation[] = [
  { id: 'loc-miramar', name: 'Miramar Studio' },
  { id: 'loc-pembroke', name: 'Pembroke Pines Studio' },
  { id: 'loc-weston', name: 'Weston Beauty Bar' },
];

function appointmentTime(
  daysFromToday: number,
  hour: number,
  minute: number,
  durationMinutes: number,
): Pick<Appointment, 'startAt' | 'endAt'> {
  const start = new Date();
  start.setHours(hour, minute, 0, 0);
  start.setDate(start.getDate() + daysFromToday);
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  return { startAt: start.toISOString(), endAt: end.toISOString() };
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1001',
    client: {
      id: 'cli-101',
      fullName: 'Sofia Martinez',
      phone: '(954) 555-0101',
    },
    service: {
      id: 'srv-01',
      name: 'Silk Press',
      durationMinutes: 90,
      price: 95,
    },
    teamMember: {
      id: 'tm-01',
      fullName: 'Camila Rodriguez',
      role: 'Hair Stylist',
    },
    location: MOCK_LOCATIONS[0],
    ...appointmentTime(0, 9, 0, 90),
    status: 'confirmed',
    paymentStatus: 'partially_paid',
    notes: 'Client prefers fragrance-free products.',
  },
  {
    id: 'apt-1002',
    client: {
      id: 'cli-102',
      fullName: 'Isabella Johnson',
      phone: '(305) 555-0102',
    },
    service: {
      id: 'srv-02',
      name: 'Gel Manicure',
      durationMinutes: 60,
      price: 55,
    },
    teamMember: {
      id: 'tm-02',
      fullName: 'Valentina Perez',
      role: 'Nail Artist',
    },
    location: MOCK_LOCATIONS[1],
    ...appointmentTime(0, 10, 30, 60),
    status: 'checked_in',
    paymentStatus: 'unpaid',
  },
  {
    id: 'apt-1003',
    client: {
      id: 'cli-103',
      fullName: 'Mia Williams',
      phone: '(786) 555-0103',
    },
    service: {
      id: 'srv-03',
      name: 'Classic Lash Fill',
      durationMinutes: 75,
      price: 80,
    },
    teamMember: { id: 'tm-03', fullName: 'Emma Davis', role: 'Lash Artist' },
    location: MOCK_LOCATIONS[2],
    ...appointmentTime(0, 11, 15, 75),
    status: 'in_progress',
    paymentStatus: 'paid',
  },
  {
    id: 'apt-1004',
    client: {
      id: 'cli-104',
      fullName: 'Olivia Brown',
      phone: '(954) 555-0104',
    },
    service: {
      id: 'srv-04',
      name: 'Brow Shape & Tint',
      durationMinutes: 45,
      price: 48,
    },
    teamMember: {
      id: 'tm-04',
      fullName: 'Daniela Lopez',
      role: 'Brow Specialist',
    },
    location: MOCK_LOCATIONS[0],
    ...appointmentTime(0, 13, 0, 45),
    status: 'booked',
    paymentStatus: 'unpaid',
  },
  {
    id: 'apt-1005',
    client: { id: 'cli-105', fullName: 'Ava Garcia', phone: '(305) 555-0105' },
    service: {
      id: 'srv-05',
      name: 'Balayage',
      durationMinutes: 180,
      price: 240,
    },
    teamMember: {
      id: 'tm-01',
      fullName: 'Camila Rodriguez',
      role: 'Hair Stylist',
    },
    location: MOCK_LOCATIONS[1],
    ...appointmentTime(0, 14, 0, 180),
    status: 'confirmed',
    paymentStatus: 'partially_paid',
  },
  {
    id: 'apt-1006',
    client: { id: 'cli-106', fullName: 'Emma Wilson', phone: '(786) 555-0106' },
    service: {
      id: 'srv-06',
      name: 'Hydrating Facial',
      durationMinutes: 60,
      price: 120,
    },
    teamMember: {
      id: 'tm-05',
      fullName: 'Natalia Hernandez',
      role: 'Esthetician',
    },
    location: MOCK_LOCATIONS[2],
    ...appointmentTime(1, 9, 30, 60),
    status: 'booked',
    paymentStatus: 'unpaid',
  },
  {
    id: 'apt-1007',
    client: {
      id: 'cli-107',
      fullName: 'Charlotte Anderson',
      phone: '(954) 555-0107',
    },
    service: {
      id: 'srv-07',
      name: 'Acrylic Full Set',
      durationMinutes: 105,
      price: 90,
    },
    teamMember: {
      id: 'tm-02',
      fullName: 'Valentina Perez',
      role: 'Nail Artist',
    },
    location: MOCK_LOCATIONS[0],
    ...appointmentTime(1, 11, 0, 105),
    status: 'confirmed',
    paymentStatus: 'paid',
  },
  {
    id: 'apt-1008',
    client: {
      id: 'cli-108',
      fullName: 'Amelia Thompson',
      phone: '(305) 555-0108',
    },
    service: {
      id: 'srv-08',
      name: 'Volume Lash Set',
      durationMinutes: 150,
      price: 175,
    },
    teamMember: { id: 'tm-03', fullName: 'Emma Davis', role: 'Lash Artist' },
    location: MOCK_LOCATIONS[1],
    ...appointmentTime(1, 13, 30, 150),
    status: 'cancelled',
    paymentStatus: 'refunded',
    notes: 'Cancelled by client.',
  },
  {
    id: 'apt-1009',
    client: {
      id: 'cli-109',
      fullName: 'Harper Moore',
      phone: '(786) 555-0109',
    },
    service: {
      id: 'srv-09',
      name: "Women's Haircut",
      durationMinutes: 60,
      price: 75,
    },
    teamMember: {
      id: 'tm-01',
      fullName: 'Camila Rodriguez',
      role: 'Hair Stylist',
    },
    location: MOCK_LOCATIONS[2],
    ...appointmentTime(2, 10, 0, 60),
    status: 'confirmed',
    paymentStatus: 'unpaid',
  },
  {
    id: 'apt-1010',
    client: {
      id: 'cli-110',
      fullName: 'Evelyn Taylor',
      phone: '(954) 555-0110',
    },
    service: {
      id: 'srv-10',
      name: 'Dermaplaning Facial',
      durationMinutes: 75,
      price: 145,
    },
    teamMember: {
      id: 'tm-05',
      fullName: 'Natalia Hernandez',
      role: 'Esthetician',
    },
    location: MOCK_LOCATIONS[0],
    ...appointmentTime(2, 12, 0, 75),
    status: 'booked',
    paymentStatus: 'unpaid',
  },
  {
    id: 'apt-1011',
    client: { id: 'cli-111', fullName: 'Luna White', phone: '(305) 555-0111' },
    service: {
      id: 'srv-11',
      name: 'Keratin Treatment',
      durationMinutes: 150,
      price: 210,
    },
    teamMember: {
      id: 'tm-06',
      fullName: 'Gabriela Santos',
      role: 'Senior Stylist',
    },
    location: MOCK_LOCATIONS[1],
    ...appointmentTime(-1, 14, 0, 150),
    status: 'completed',
    paymentStatus: 'paid',
  },
  {
    id: 'apt-1012',
    client: { id: 'cli-112', fullName: 'Ella Harris', phone: '(786) 555-0112' },
    service: {
      id: 'srv-12',
      name: 'Signature Pedicure',
      durationMinutes: 75,
      price: 70,
    },
    teamMember: {
      id: 'tm-02',
      fullName: 'Valentina Perez',
      role: 'Nail Artist',
    },
    location: MOCK_LOCATIONS[2],
    ...appointmentTime(-1, 10, 30, 75),
    status: 'no_show',
    paymentStatus: 'unpaid',
  },
];
