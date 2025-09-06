// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function ProfileView() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 space-y-4">
//       <div className="flex items-center gap-6">
//         <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
//           {user.name?.[0]?.toUpperCase() || "U"}
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//             {user.name}
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
//         </div>
//         <button
//           onClick={() => navigate("/edit-profile")}
//           className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
//         >
//           Edit Profile
//         </button>
//       </div>

//       {/* Skills */}
//       {user.skills?.length > 0 && (
//         <div>
//           <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
//             Skills
//           </h3>
//           <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
//             {user.skills.map((skill, idx) => (
//               <span
//                 key={idx}
//                 className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-white rounded-full text-sm"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Links */}
//       <div className="flex gap-4 mt-2">
//         {user.github && (
//           <a
//             href={user.github}
//             target="_blank"
//             className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
//           >
//             GitHub
//           </a>
//         )}
//         {user.linkedin && (
//           <a
//             href={user.linkedin}
//             target="_blank"
//             className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
//           >
//             LinkedIn
//           </a>
//         )}
//       </div>

//       {/* Resume */}
//       {user.resume && (
//         <div className="mt-4">
//           <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
//             Resume
//           </h3>
//           <iframe
//             src={user.resume}
//             className="w-full h-60 border rounded"
//             title="Resume"
//           ></iframe>
//         </div>
//       )}
//     </div>
//   );
// }
