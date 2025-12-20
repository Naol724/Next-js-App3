"use client";

import { useEffect, useState } from "react";

export default function ViewStudents() {
  const [students, setStudents] = useState<any[]>([]);

  // Runs when page opens
  useEffect(() => {
    const savedStudents =
      JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(savedStudents);
  }, []);

  return (
  <div className="max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">All Students</h2>

    {students.length === 0 && (
      <p className="text-gray-500">No students found</p>
    )}

    {students.map((s, index) => (
      <div
        key={index}
        className="border p-4 mb-3 rounded shadow"
      >
        <p><b>Name:</b> {s.name}</p>
        <p><b>ID:</b> {s.studentId}</p>
        <p><b>Email:</b> {s.email}</p>
      </div>
    ))}
  </div>
);
}