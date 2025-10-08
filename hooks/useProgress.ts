import { useState, useEffect } from "react";
import { useReviews } from "./useReviews";

export const useProgress = (dashboardData?: any) => {
    const { allUpcomingReviews, pendingReviews, loading: reviewsLoading } = useReviews();
    const [dailyProgress, setDailyProgress] = useState({
      progress: 0,
      completedToday: 0,
      scheduledForToday: 0,
      totalForToday: 0,
      loading: true
    });
  
    useEffect(() => {
      if (!dashboardData || reviewsLoading) {
        return;
      }

      const calculateProgress = () => {
        const today = new Date().toISOString().split('T')[0];
        
        const completedToday = dashboardData?.completedToday || 0;
        const scheduledForToday = allUpcomingReviews[today]?.length || 0;
        const pendingForToday = pendingReviews.length;
        
        let totalForToday = scheduledForToday + pendingForToday;
        let progress = 0;
        
        if (totalForToday > 0) {
          progress = completedToday >= totalForToday ? 100 : 
                    Math.round((completedToday / totalForToday) * 100);
        } else if (completedToday > 0) {
          progress = 100;
          totalForToday = completedToday;
        }
  
        setDailyProgress({
          progress,
          completedToday,
          scheduledForToday: totalForToday,
          totalForToday,
          loading: false
        });
      };
  
      calculateProgress();
    }, [allUpcomingReviews, pendingReviews, dashboardData, reviewsLoading]);
  
    return dailyProgress;
};