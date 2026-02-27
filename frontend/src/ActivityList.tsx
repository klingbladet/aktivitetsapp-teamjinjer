import React from 'react';
import ActivityCard from './ActivityCard';
import type { Activity } from './MockData';
import { LayoutGrid, ListFilter } from 'lucide-react';

interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <ListFilter size={20} className="text-blue-500" />
          Upptäck aktiviteter
          <span className="text-sm font-normal text-gray-400 ml-1">
            ({activities.length} resultat)
          </span>
        </h2>
        <div className="flex gap-2">
           <button className="p-2 text-gray-400 bg-white border border-gray-200 rounded-lg shadow-sm hover:text-blue-500 hover:bg-blue-50 transition-colors">
              <LayoutGrid size={18} />
           </button>
        </div>
      </div>

      <div className="space-y-4 px-4 pb-12">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center border border-dashed border-gray-200 shadow-sm">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                <ListFilter size={32} />
             </div>
             <p className="text-gray-500 font-medium text-lg">Inga aktiviteter hittades</p>
             <p className="text-gray-400 text-sm mt-1">Försök med ett annat sökord eller kategori.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityList;
