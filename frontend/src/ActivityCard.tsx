import React from 'react';
import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import type { Activity } from './types';
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <>
      <div className="bg-brand-soft-white rounded-2xl shadow-md border border-brand-dark/5 p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-5 items-start sm:items-center w-full group">
        {/* Category Icon / Color Strip */}
        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full group'>
          <div className="hidden sm:flex h-14 w-14 rounded-2xl bg-brand-dark/5 text-brand-dark items-center justify-center shrink-0 transition-colors duration-300">
            <Users size={24} />
          </div>

          <div className='flex-1'>
            <div className="flex items-center text-sm text-gray-500 gap-1.5">
              <MapPin size={14} className="text-gray-400" />
              <span className="truncate">{activity.location}</span>
            </div>

            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isFull ? 'bg-brand-light' : 'bg-brand-dark'}`}
                      style={{ width: `${(activity.participants / activity.maxParticipants) * 100}%` }}
                    ></div>
                </div>
                <span className="text-xs font-medium flex-nowrap text-gray-600">
                    {activity.participants}/{activity.maxParticipants} deltagare
                </span>
              </div>
            </div>
          </div>

        <div className="w-full sm:w-auto mt-4 sm:mt-0 flex flex-col gap-2 items-end">
          <button 
            disabled={isFull}
            className={`w-full sm:w-auto px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 
              ${isFull 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                : 'bg-brand-dark text-white hover:bg-brand-dark/80 active:scale-95 shadow-sm'}`}
          >
            {isFull ? 'Fullbokat' : 'Gå med'}
            {!isFull && <ChevronRight size={16} />}
          </button>

          <div className="flex items-center text-sm text-gray-500 gap-1.5">
            <Calendar size={14} className="text-gray-400" />
            <span>{activity.date}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500 gap-1.5">
            <Clock size={14} className="text-gray-400 ml-1.5" />
            <span>{activity.time}</span>
          </div>

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
            <div className='flex flex-col gap-5'>
              <p className='w-full pb-2'>{content}</p>
              <div className='w-full px-1'>
                <h4>Deltagare ({activity.participants}/{activity.maxParticipants}):</h4>
                <div className='flex flex-wrap gap-2'>{activity.participants > 0 ? (
                <div className='py-2 px-3 border border-brand-light rounded-3xl bg-brand-light text-brand-dark'>
                  {activity.participants} anmälda deltagare
                </div>
              ) : (
                <div className='py-2 px-3 border border-brand-light rounded-3xl bg-brand-light text-brand-dark'>
                  Ingen har anmält sig ännu
                </div>
              )}</div>
              </div>
            </div>
          )}
        </div>
        )}

      </div>
    </>
  );
};

export default ActivityCard;
