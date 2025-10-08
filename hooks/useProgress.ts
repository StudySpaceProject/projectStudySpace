import { useState, useEffect } from "react";
import { useReviews } from "./useReviews";

export const useProgress = (dashboardData?: any) => {
    const { allUpcomingReviews, loading: reviewsLoading } = useReviews();
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
            
            let progress = 0;
            
            if (scheduledForToday > 0) {
                progress = completedToday >= scheduledForToday ? 100 : 
                          Math.round((completedToday / scheduledForToday) * 100);
            } else if (completedToday > 0) {
                progress = 100;
            }

            setDailyProgress({
                progress,
                completedToday,
                scheduledForToday,
                totalForToday: scheduledForToday,
                loading: false
            });
        };

        calculateProgress();
    }, [allUpcomingReviews, dashboardData, reviewsLoading]);

    return dailyProgress;
};