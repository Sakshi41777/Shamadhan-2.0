import React from "react";

function StudentCard({ student }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition transform hover:scale-105">
      <div className="flex items-center space-x-4">
        {/* Avatar Circle */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
          {student.name.charAt(0)}
        </div>

        {/* Student Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{student.name}</h2>
          <p className="text-gray-500 text-sm">ID: {student.id}</p>
          <p className="text-blue-500 font-medium">{student.branch}</p>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;