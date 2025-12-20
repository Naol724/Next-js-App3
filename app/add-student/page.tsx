"use client";

import { useState } from "react";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");

    const handleSubmit = () => {
  // 1. Put student data together
  const student = { name, studentId, email };

  // 2. Get old students from browser
  const existingStudents =
    JSON.parse(localStorage.getItem("students") || "[]");

  // 3. Add new student to old list
  existingStudents.push(student);

  // 4. Save back to browser
  localStorage.setItem(
    "students",
    JSON.stringify(existingStudents)
  );

  // 5. Message & clear inputs
  alert("Student saved!");
  setName("");
  setStudentId("");
  setEmail("");
};


  return (
    <main style={{ padding: "20px" }}>
      <h2>Add Student</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>Add Student</button>
    </main>
  );
}
