// MyCourses.jsx
import React from 'react';
import { BookOpen, Clock, CheckCircle, BarChart2, Calendar, Award } from 'lucide-react';

const MyCourses = () => {
  const courses = [
    {
      id: 1,
      code: 'CS-401',
      name: 'Advanced Web Development',
      instructor: 'Prof. Sarah Johnson',
      progress: 75,
      nextDeadline: 'Dec 15, 2023',
      assignments: 2,
      resources: 5
    },
    {
      id: 2,
      code: 'DS-302',
      name: 'Data Structures & Algorithms',
      instructor: 'Dr. Michael Chen',
      progress: 45,
      nextDeadline: 'Dec 18, 2023',
      assignments: 3,
      resources: 8
    },
    {
      id: 3,
      code: 'AI-210',
      name: 'Introduction to AI',
      instructor: 'Dr. Priya Patel',
      progress: 30,
      nextDeadline: 'Dec 20, 2023',
      assignments: 1,
      resources: 4
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Courses</h1>
        <p className="text-slate-600">Manage your enrolled courses and track your progress</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-2">
                    {course.code}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-800">{course.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{course.instructor}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-slate-600">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    <span>Due: {course.nextDeadline}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-slate-400" />
                    <span>{course.assignments} Assignments</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <BookOpen className="w-4 h-4 mr-2 text-slate-400" />
                    <span>{course.resources} Resources</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <BarChart2 className="w-4 h-4 mr-2 text-slate-400" />
                    <span>View Analytics</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Course
              </button>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Continue
              </button>
            </div>
          </div>
        ))}

        {/* Add New Course Card */}
        <div className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-8 text-center hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-medium text-slate-800 mb-1">Enroll in New Course</h3>
          <p className="text-sm text-slate-500 mb-4">Browse available courses to continue learning</p>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Browse Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;