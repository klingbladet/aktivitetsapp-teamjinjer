import React from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import type { Activity } from './MockData';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const isFull = activity.participants >= activity.maxParticipants;

  return (
    <div className="bg-brand-soft-white rounded-2xl shadow-md border border-brand-dark/5 p-5 hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start sm:items-center w-full group">
      {/* Category Icon / Color Strip */}
      <div className="hidden sm:flex h-14 w-14 rounded-2xl bg-brand-dark/5 text-brand-dark items-center justify-center shrink-0 group-hover:bg-brand-dark group-hover:text-brand-light transition-colors duration-300">
        <Users size={28} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-brand-dark text-brand-light text-[10px] font-bold uppercase tracking-widest rounded-full">
            {activity.category}
          </span>
          <h3 className="text-xl font-black text-brand-dark truncate font-display group-hover:text-brand-dark/80 transition-colors">
            {activity.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-2">
          <div className="flex items-center text-sm text-brand-dark/70 gap-2">
            <MapPin size={16} className="text-brand-dark/30" />
            <span className="truncate font-medium">{activity.location}</span>
          </div>
          <div className="flex items-center text-sm text-brand-dark/70 gap-2">
            <Calendar size={16} className="text-brand-dark/30" />
            <span className="font-medium">{activity.date}</span>
            <Clock size={16} className="text-brand-dark/30 ml-2" />
            <span className="font-medium">{activity.time}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
           <div className="flex items-center gap-2 w-full max-w-[200px]">
             <div className="flex-1 h-2.5 bg-brand-dark/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isFull ? 'bg-red-500' : 'bg-brand-dark'} transition-all duration-500`}
                  style={{ width: `${(activity.participants / activity.maxParticipants) * 100}%` }}
                ></div>
             </div>
             <span className="text-xs font-bold text-brand-dark/60 whitespace-nowrap">
                {activity.participants} / {activity.maxParticipants}
             </span>
           </div>
        </div>
      </div>

      <div className="w-full sm:w-auto mt-4 sm:mt-0">
        <button 
          disabled={isFull}
          className={`w-full sm:w-auto px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 
            ${isFull 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
              : 'bg-brand-dark text-brand-light hover:bg-brand-dark/90 active:scale-95 shadow-sm'}`}
        >
          {isFull ? 'Fullbokat' : 'Gå med'}
          {!isFull && <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
