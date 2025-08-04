import { useState, useEffect, useCallback } from 'react';

const getProgressFromStorage = () => {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const progress = localStorage.getItem('courseProgress');
    return progress ? JSON.parse(progress) : {};
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return {};
  }
};

export const useProgress = () => {
  const [progress, setProgress] = useState(getProgressFromStorage());

  useEffect(() => {
    try {
      localStorage.setItem('courseProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [progress]);

  const completeLesson = useCallback((courseId, lessonId) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      if (!newProgress[courseId]) {
        newProgress[courseId] = [];
      }
      if (!newProgress[courseId].includes(lessonId)) {
        newProgress[courseId].push(lessonId);
      }
      return newProgress;
    });
  }, []);

  const getCourseProgress = useCallback((courseId, totalLessons) => {
    const completed = progress[courseId] || [];
    return totalLessons > 0 ? (completed.length / totalLessons) * 100 : 0;
  }, [progress]);

  const isLessonCompleted = useCallback((courseId, lessonId) => {
    return progress[courseId]?.includes(lessonId) || false;
  }, [progress]);

  return { progress, completeLesson, getCourseProgress, isLessonCompleted };
};
