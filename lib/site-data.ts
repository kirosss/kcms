export interface SiteConfig {
  header: {
    logo: string;
    phone: string;
    bookNowText: string;
    menuItems: { name: string; href: string }[];
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    image: string;
  };
  expertise: {
    badge: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string; icon: string }[];
  };
  about: {
    badge: string;
    title: string;
    content: string;
    image: string;
    stats: { label: string; value: string }[];
  };
  settings: {
    clinicName: string;
    clinicEmail: string;
    phone: string;
    websiteUrl: string;
    address: string;
    businessHours: { day: string; hours: string; closed: boolean }[];
  };
  appointments: {
    id: number;
    patient: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    status: string;
    image: string;
  }[];
  booking: {
    title: string;
    description: string;
    notificationEmail: string;
    fields: { name: string; label: string; type: string; required: boolean }[];
  };
  services: {
    id: number;
    title: string;
    category: string;
    price: string;
    status: string;
    icon: string;
    description: string;
    fullDescription?: string;
    image?: string;
    features?: string[];
    ctaText?: string;
  }[];
  footer: {
    description: string;
    socialLinks: { platform: string; url: string }[];
    quickLinks: { name: string; href: string }[];
    servicesLinks: { name: string; href: string }[];
    copyright: string;
  };
  testimonials: {
    id: number;
    name: string;
    role: string;
    content: string;
    status: string;
    rating: number;
    date: string;
  }[];
}

export const defaultSiteConfig: SiteConfig = {
  header: {
    logo: 'Flexora',
    phone: '+1 (555) 000-1234',
    bookNowText: 'Book Now',
    menuItems: [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '#services' },
      { name: 'About', href: '#about' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Contact', href: '#booking' },
    ],
  },
  hero: {
    title: 'Restore Your Mobility, Reclaim Your Life.',
    subtitle: 'Expert physiotherapy and chiropractic care tailored to your unique recovery journey. We help you move better and feel stronger.',
    ctaText: 'Start Your Recovery',
    image: 'https://picsum.photos/seed/physio/1920/1080',
  },
  expertise: {
    badge: 'Our Expertise',
    title: 'Specialized Care for Every Body',
    subtitle: 'We offer a comprehensive range of services to address your unique health needs and help you achieve your wellness goals.',
    items: [
      { title: 'Physiotherapy', description: 'Personalized treatment plans for injury recovery and pain relief.', icon: 'Activity' },
      { title: 'Chiropractic', description: 'Spinal adjustments and alignment for optimal nervous system function.', icon: 'Zap' },
      { title: 'Massage Therapy', description: 'Therapeutic techniques to reduce muscle tension and stress.', icon: 'Heart' },
    ],
  },
  about: {
    badge: 'About Flexora',
    title: 'About Flexora',
    content: 'At Flexora, we believe in a holistic approach to physical health. Our team of dedicated professionals combines years of experience with the latest techniques to provide care that is as unique as you are. Whether you are recovering from an injury, managing chronic pain, or looking to improve your athletic performance, we are here to support you every step of the way.',
    image: 'https://picsum.photos/seed/clinic/800/600',
    stats: [
      { label: 'Happy Patients', value: '5,000+' },
      { label: 'Years Experience', value: '15+' },
      { label: 'Specialists', value: '12' },
    ],
  },
  settings: {
    clinicName: 'Flexora Physiotherapy',
    clinicEmail: 'hello@flexora.com',
    phone: '+1 (555) 000-1234',
    websiteUrl: 'https://flexora.com',
    address: '123 Wellness Way, Health City, HC 12345',
    businessHours: [
      { day: 'Mon', hours: '09:00 - 18:00', closed: false },
      { day: 'Tue', hours: '09:00 - 18:00', closed: false },
      { day: 'Wed', hours: '09:00 - 18:00', closed: false },
      { day: 'Thu', hours: '09:00 - 18:00', closed: false },
      { day: 'Fri', hours: '09:00 - 18:00', closed: false },
      { day: 'Sat', hours: '09:00 - 18:00', closed: false },
      { day: 'Sun', hours: 'Closed', closed: true },
    ],
  },
  appointments: [
    { id: 1, patient: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 234 567 890', service: 'Physiotherapy', date: 'Oct 24, 2023', time: '10:30 AM', status: 'Confirmed', image: 'https://picsum.photos/seed/sarah/40/40' },
    { id: 2, patient: 'Michael Chen', email: 'michael@example.com', phone: '+1 234 567 891', service: 'Chiropractic', date: 'Oct 24, 2023', time: '11:45 AM', status: 'Pending', image: 'https://picsum.photos/seed/michael/40/40' },
  ],
  booking: {
    title: 'Book Your Appointment',
    description: 'Take the first step towards a pain-free life. Fill out the form below and our team will contact you to confirm your session.',
    notificationEmail: 'hello@flexora.com',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'service', label: 'Service', type: 'select', required: true },
      { name: 'date', label: 'Preferred Date', type: 'date', required: true },
      { name: 'message', label: 'Message', type: 'textarea', required: false },
    ],
  },
  services: [
    { 
      id: 1, 
      title: 'Physiotherapy', 
      category: 'Medical', 
      price: '$120', 
      status: 'Active', 
      icon: 'Activity', 
      description: 'Comprehensive physical therapy for all ages.',
      fullDescription: 'Our physiotherapy services are designed to help you recover from injury, manage chronic pain, and improve your overall physical function. We use evidence-based techniques and personalized treatment plans to ensure the best possible outcomes for our patients.',
      image: 'https://picsum.photos/seed/physio1/800/1000',
      features: ['Injury Rehabilitation', 'Pain Management', 'Post-Surgical Care', 'Sports Injury Recovery'],
      ctaText: 'Book Physiotherapy'
    },
    { 
      id: 2, 
      title: 'Massage Therapy', 
      category: 'Wellness', 
      price: '$90', 
      status: 'Active', 
      icon: 'Heart', 
      description: 'Relaxing and therapeutic massage sessions.',
      fullDescription: 'Experience the healing power of touch with our professional massage therapy. Whether you need deep tissue work for muscle tension or a gentle Swedish massage for relaxation, our certified therapists will tailor each session to your specific needs.',
      image: 'https://picsum.photos/seed/massage1/800/1000',
      features: ['Deep Tissue Massage', 'Swedish Massage', 'Trigger Point Therapy', 'Prenatal Massage'],
      ctaText: 'Book Massage'
    },
    { 
      id: 3, 
      title: 'Chiropractic Care', 
      category: 'Medical', 
      price: '$150', 
      status: 'Active', 
      icon: 'Zap', 
      description: 'Expert spinal alignment and care.',
      fullDescription: 'Our chiropractic care focuses on the relationship between the spine and the nervous system. Through precise adjustments and holistic wellness advice, we help you achieve optimal health and performance by addressing the root cause of your discomfort.',
      image: 'https://picsum.photos/seed/chiro1/800/1000',
      features: ['Spinal Adjustments', 'Posture Correction', 'Nervous System Health', 'Joint Mobility'],
      ctaText: 'Book Chiropractic'
    },
  ],
  footer: {
    description: 'Expert physiotherapy and chiropractic care tailored to your unique recovery journey. We help you move better and feel stronger.',
    socialLinks: [
      { platform: 'Facebook', url: 'https://facebook.com' },
      { platform: 'Instagram', url: 'https://instagram.com' },
      { platform: 'Twitter', url: 'https://twitter.com' },
      { platform: 'LinkedIn', url: 'https://linkedin.com' },
    ],
    quickLinks: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Contact', href: '#booking' },
    ],
    servicesLinks: [
      { name: 'Physiotherapy', href: '/services/1' },
      { name: 'Massage Therapy', href: '/services/2' },
      { name: 'Chiropractic Care', href: '/services/3' },
      { name: 'Sports Rehab', href: '/services/4' },
    ],
    copyright: '© 2024 Flexora Physiotherapy. All rights reserved.',
  },
  testimonials: [
    { id: 1, name: 'Sarah Johnson', role: 'Athlete', content: 'Flexora helped me recover from a severe knee injury in record time. Their personalized approach and expert care are truly unmatched.', status: 'Approved', rating: 5, date: 'Oct 12, 2023' },
    { id: 2, name: 'Michael Chen', role: 'Software Engineer', content: 'After months of back pain from sitting at a desk, the chiropractic care at Flexora has been life-changing. I feel stronger and more mobile than ever.', status: 'Approved', rating: 5, date: 'Oct 15, 2023' },
  ],
};
