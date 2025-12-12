import React from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight, Filter } from 'lucide-react';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Tech Career Fair 2024",
      date: "2024-03-15",
      time: "10:00 AM - 4:00 PM",
      location: "University Main Hall",
      attendees: 150,
      type: "Career",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Meet top tech companies and explore internship and job opportunities. Network with industry professionals and attend workshops."
    },
    {
      id: 2,
      title: "Hackathon: Code for Good",
      date: "2024-04-05",
      time: "9:00 AM - 9:00 PM",
      location: "Tech Hub Building",
      attendees: 200,
      type: "Hackathon",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "24-hour hackathon focused on building solutions for social good. Work in teams and win exciting prizes!"
    },
    {
      id: 3,
      title: "Alumni Networking Mixer",
      date: "2024-03-22",
      time: "6:00 PM - 9:00 PM",
      location: "Grand Ballroom",
      attendees: 80,
      type: "Networking",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Connect with successful alumni from various industries. Great opportunity for mentorship and career advice."
    }
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Upcoming Events</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3 h-48 md:h-auto">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
                      {event.type}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800">{event.title}</h3>
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                
                <p className="text-slate-600 mt-2">{event.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-slate-600">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Clock className="w-4 h-4 mr-2 text-slate-400" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-slate-600">
                    <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                    {event.location}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center">
                    Register Now <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;