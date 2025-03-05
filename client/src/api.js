// const API_BASE_URL = "https://flask-service-management.onrender.com"; // Update with your actual API URL

// export const api = {
//   getReports: async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/reports`);
//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error("Error fetching reports:", error);
//       return null;
//     }
//   },

//   getUsers: async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/users`);
//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       return null;
//     }
//   },

//   updateUser: async (userId, data) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error(`Error updating user ${userId}:`, error);
//       return null;
//     }
//   },

//   submitReport: async (reportData) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/reports`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(reportData),
//       });
//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error("Error submitting report:", error);
//       return null;
//     }
//   },
// };

// console.log("API file is working!");
// export { api };
