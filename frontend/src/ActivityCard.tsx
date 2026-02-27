import React from 'react';
import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import type { Activity } from './MockData';
import { CgChevronDown, CgChevronUp } from "react-icons/cg";

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const isFull = activity.participants >= activity.maxParticipants;

  const [ open, setOpen ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ content, setContent ] = useState("");

  useEffect (() => {
    if (open && !content) {
        setLoading(true);
        setTimeout(() => {
            setContent(`${activity.description}`)
            setLoading(false);
        }, 1000);
    }
  }, [open, content, activity.description]);

  const toggleCard = () => {
    setOpen(!open);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow flex flex-col gap-4 items-start sm:items-center w-full group">
      {/* Category Icon / Color Strip */}
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full group'>
        <div className="hidden sm:flex h-12 w-12 rounded-lg bg-blue-50 text-blue-600 items-center justify-center shrink-0">
          <Users size={24} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
              {activity.category}
            </span>
            <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {activity.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 mt-2">
            <div className="flex items-center text-sm text-gray-500 gap-1.5">
              <MapPin size={14} className="text-gray-400" />
              <span className="truncate">{activity.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 gap-1.5">
              <Calendar size={14} className="text-gray-400" />
              <span>{activity.date}</span>
              <Clock size={14} className="text-gray-400 ml-1.5" />
              <span>{activity.time}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${isFull ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${(activity.participants / activity.maxParticipants) * 100}%` }}
                  ></div>
              </div>
              <span className="text-xs font-medium text-gray-600">
                  {activity.participants}/{activity.maxParticipants} deltagare
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
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-sm'}`}
          >
            {isFull ? 'Fullbokat' : 'Gå med'}
            {!isFull && <ChevronRight size={16} />}
          </button>
        </div>
      </div>

      <button className='py-2'
      onClick={toggleCard}>
        {open ? <CgChevronUp /> : <CgChevronDown /> } </button>
        {open && (
        <div>
          {loading ? (
            <p>laddar...</p> 
            ) : (
            <div className='flex flex-row gap-10'>
              <p className='w-3/5 pb-2'>{content}</p>
              <div className='w-2/5 px-1'>
                <h4>Deltagare ({activity.participants}/{activity.maxParticipants}):</h4>
                <p>{activity.participantNames.map((name, index) => (
                  <div className='py-2 px-3 border border-blue-500/30 rounded-3xl bg-blue-100/50 text-blue-500/70 m-2'
                    key={index}>
                      {name}
                  </div>
                ))}</p>
              '</div>
            </div>
          )}
        </div>
        )}
    </div>
  );
};

export default ActivityCard;
