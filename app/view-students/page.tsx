"use client";

import { useEffect, useState } from "react";
import { Users, User, Mail, Hash, Trash2 } from "lucide-react";

interface Student {
  name: string;
  studentId: string;
  email: string;
}

export default function ViewStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  // Load students from localStorage
  useEffect(() => {
    const loadStudents = () => {
      const savedStudents = JSON.parse(localStorage.getItem("students") || "[]");
      setStudents(savedStudents);
    };
    
    // Load immediately
    loadStudents();
    
    // Also listen for storage changes (in case another tab adds students)
    const handleStorageChange = () => {
      loadStudents();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updatedStudents = students.filter((_, i) => i !== index);
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Student Directory
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage all student records in the system
        </p>
      </div>

      {/* Stats Card */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Total Students</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{students.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-4 border border-green-100 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 dark:text-green-300 font-medium">Active Records</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">{students.length}</p>
            </div>
            <User className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">Data Storage</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">Local</p>
            </div>
            <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        {students.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No Students Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              No student records have been added yet. Start by adding your first student!
            </p>
            <a
              href="/add-student"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              <User className="w-5 h-5" />
              Add First Student
            </a>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {students.map((student: Student, index: number) => (
              <div
                key={index}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {student.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {student.name}
                        </h3>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Hash className="w-4 h-4" />
                            <span className="text-sm">{student.studentId}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{student.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors flex items-center gap-2"
                    title="Delete student"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Note */}
      {students.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Showing {students.length} student{students.length !== 1 ? 's' : ''} • 
            Data is stored locally in your browser
          </p>
        </div>
      )}
    </div>
  );
}