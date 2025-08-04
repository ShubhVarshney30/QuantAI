"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { courses } from '@/lib/courses';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowLeft, BookOpen, BrainCircuit } from 'lucide-react';

const CourseCard = ({ course, onSelect, progress }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="cursor-pointer h-full group"
    onClick={() => onSelect(course)}
  >
    <Card className="bg-white/60 dark:bg-gray-800/30 backdrop-blur-sm border-gray-200/30 dark:border-gray-700/50 rounded-2xl h-full flex flex-col hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 shadow-lg shadow-gray-200/50 dark:shadow-none">
      <CardHeader>
        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 w-fit mb-4 shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">{course.title}</CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400 pt-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end pt-4">
        <Progress value={progress} className="w-full h-2 bg-gray-200 dark:bg-gray-700/50 rounded-full" />
        <p className="text-sm text-gray-600 dark:text-gray-500 mt-2">{Math.round(progress)}% Complete</p>
      </CardContent>
    </Card>
  </motion.div>
);

const LessonView = ({ lesson, onComplete, isCompleted }) => (
  <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl shadow-gray-300/30 dark:shadow-none">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">{lesson.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br />') }} />
      <Button onClick={onComplete} disabled={isCompleted} size="lg" className="w-full text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30">
        {isCompleted ? <><CheckCircle className="mr-2" /> Completed</> : (lesson.quiz ? 'Take Quiz' : 'Mark as Complete')}
      </Button>
    </CardContent>
  </Card>
);

const QuizView = ({ quiz, onQuizComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSubmit = () => {
    const correct = selectedAnswer === quiz.correctAnswer;
    setIsCorrect(correct);
    setTimeout(() => onQuizComplete(correct), 1500);
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl shadow-gray-300/30 dark:shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">{quiz.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-8">
          {quiz.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              disabled={isCorrect !== null}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 font-medium text-gray-700 dark:text-gray-300 ${selectedAnswer === index ? 'border-blue-500 bg-blue-100/50 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'}`}>
              {option}
            </motion.button>
          ))}
        </div>
        <Button onClick={handleSubmit} disabled={selectedAnswer === null || isCorrect !== null} size="lg" className="w-full text-lg font-semibold bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white transition-all duration-300 shadow-lg shadow-green-500/30">
          Submit Answer
        </Button>
        <AnimatePresence>
        {isCorrect === true && <motion.p initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="text-green-600 dark:text-green-400 text-center mt-4 font-semibold">Correct! Well done.</motion.p>}
        {isCorrect === false && <motion.p initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="text-red-600 dark:text-red-400 text-center mt-4 font-semibold">Not quite. The correct answer was: {quiz.options[quiz.correctAnswer]}</motion.p>}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

const CourseDetail = ({ course, onBack, progressHook }) => {
  const [activeLesson, setActiveLesson] = useState(course.lessons[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const { completeLesson, isLessonCompleted } = progressHook;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{duration: 0.3}}
      className="max-w-7xl mx-auto"
    >
      <Button onClick={onBack} variant="outline" className="mb-8 flex items-center gap-2 bg-white/50 dark:bg-gray-800/30 border-gray-300 dark:border-gray-700 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg">
        <ArrowLeft size={16} />
        Back to Courses
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 bg-white/60 dark:bg-gray-800/30 backdrop-blur-sm border-gray-200/30 dark:border-gray-700/50 p-4 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-none">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">{course.title}</h2>
          <ul className="space-y-2">
            {course.lessons.map(lesson => (
              <li key={lesson.id}>
                <button 
                  onClick={() => {
                    setActiveLesson(lesson);
                    setShowQuiz(false);
                  }}
                  className={`w-full text-left p-4 rounded-lg transition-colors flex items-center text-gray-700 dark:text-gray-300 ${activeLesson.id === lesson.id ? 'bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-white font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}>
                  {isLessonCompleted(course.id, lesson.id) ? <CheckCircle className="inline-block mr-3 text-green-500 dark:text-green-400 flex-shrink-0" size={20} /> : <BookOpen className="inline-block mr-3 text-gray-400 dark:text-gray-500 flex-shrink-0" size={20} />}
                  <span className="flex-grow">{lesson.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!showQuiz ? (
              <motion.div
                key="lesson"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{duration: 0.3}}
              >
                <LessonView 
                  lesson={activeLesson} 
                  onComplete={() => {
                    if (activeLesson.quiz) {
                      setShowQuiz(true);
                    } else {
                      completeLesson(course.id, activeLesson.id);
                    }
                  }}
                  isCompleted={isLessonCompleted(course.id, activeLesson.id)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{duration: 0.3}}
              >
                <QuizView 
                  quiz={activeLesson.quiz}
                  onQuizComplete={(isCorrect) => {
                    if(isCorrect) {
                      completeLesson(course.id, activeLesson.id);
                    }
                    setShowQuiz(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default function LearningPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const progressHook = useProgress();
  const { getCourseProgress } = progressHook;

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-950/50 text-gray-900 dark:text-white">
       <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white mb-12 rounded-2xl shadow-2xl shadow-blue-500/20">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full opacity-50"></div>
        <div className="absolute top-10 -left-10 w-40 h-40 bg-white/10 rounded-full opacity-50"></div>
        <div className="px-6 py-16 text-center z-10">
            <div className="inline-block p-4 rounded-2xl bg-white/20 w-fit mb-4 backdrop-blur-sm">
              <BrainCircuit className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Learning Center
            </h1>
            <p className="text-blue-100 text-lg opacity-90 max-w-2xl mx-auto">
              Empower your financial future, one lesson at a time. Knowledge is the new rich.
            </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedCourse ? (
          <CourseDetail 
            key="detail"
            course={selectedCourse} 
            onBack={() => setSelectedCourse(null)} 
            progressHook={progressHook} 
          />
        ) : (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {courses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onSelect={setSelectedCourse} 
                progress={getCourseProgress(course.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
//                             Submit Answer
//                           </Button>
//                         </div>
//                       </>
//                     ) : (
//                       <motion.div
//                         initial={{ scale: 0.8, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         className="text-center"
//                       >
//                         <TrophyIcon className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
//                         <h3 className="text-3xl font-bold text-emerald-600 mb-2">Congratulations! 🎉</h3>
//                         <p className="text-lg text-gray-600 dark:text-gray-300">
//                           You&apos;ve completed the lesson successfully!
//                         </p>
//                       </motion.div>
//                     )}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }
