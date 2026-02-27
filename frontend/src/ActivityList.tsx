import React from 'react';
import ActivityCard from './ActivityCard';
import type { Activity } from './MockData';
import { LayoutGrid, ListFilter } from 'lucide-react';

interface ActivityListProps {
  activities: Activity[];
  chosenActivity?: number | null
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, chosenActivity }) => {
  let sortedActivities;
  console.log("chosen activity", chosenActivity)
  console.log("activities", activities)

  if (chosenActivity && chosenActivity !== null) {
    const activityToMove = activities.find(a => a.id === chosenActivity);
    
    if (activityToMove) {
      sortedActivities = [
        activityToMove,
        ...activities.filter(a => a.id !== chosenActivity)
      ];
    } else {
      sortedActivities = [...activities];
    }
  } else {
    sortedActivities = activities;
  } 
  
  console.log("sorted activities", sortedActivities)

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2 font-display">
          <ListFilter size={20} className="text-brand-dark" />
          Upptäck aktiviteter
          <span className="text-sm font-normal text-gray-400 ml-1">
            ({activities.length} resultat)
          </span>
        </h2>
        <div className="flex gap-2">
           <button className="p-2 text-brand-dark/40 bg-brand-light/50 border border-brand-dark/10 rounded-lg shadow-sm hover:text-brand-dark hover:bg-brand-light transition-colors">
              <LayoutGrid size={18} />
           </button>
        </div>
      </div>

      <div className="space-y-4 px-4 pb-12">
        {sortedActivities.length > 0 ? (
          sortedActivities.map((activity) => (
              <ActivityCard 
                key={activity.id} 
                chosen={chosenActivity == activity.id}  
                activity={activity} 
              />
          )
          )
        ) : (
          <div className="bg-brand-light/30 backdrop-blur-sm rounded-2xl p-12 flex flex-col items-center justify-center border border-dashed border-brand-dark/10 shadow-sm">
             <div className="w-16 h-16 bg-brand-dark/5 rounded-full flex items-center justify-center mb-4 text-brand-dark/20">
                <ListFilter size={32} />
             </div>
             <p className="text-brand-dark/60 font-medium text-lg">Inga aktiviteter hittades</p>
             <p className="text-brand-dark/40 text-sm mt-1">Försök med ett annat sökord eller kategori.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityList;
