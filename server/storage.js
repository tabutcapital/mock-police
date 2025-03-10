class MemStorage {
  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.apiBaseUrl = "https://flask-service-management.onrender.com"; // Replace with your actual Flask API URL
  }

  async getUser(id) {
    // First check the local memory
    const user = this.users.get(id);
    if (user) return user;

    // If not in memory, fetch from Flask backend
    try {
      const response = await fetch(`${this.apiBaseUrl}/users/${id}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user from Flask:", error);
      return null;
    }
  }

  async getUserByUsername(username) {
    // Check the local memory first
    const user = Array.from(this.users.values()).find(user => user.username === username);
    if (user) return user;

    // If not in memory, fetch from Flask backend
    try {
      const response = await fetch(`${this.apiBaseUrl}/users?username=${username}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user by username from Flask:", error);
      return null;
    }
  }

  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);

    // Optionally, you can send the new user to the Flask backend
    try {
      const response = await fetch(`${this.apiBaseUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(insertUser),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const newUserFromBackend = await response.json();

      // Sync the user in local memory with the backend
      this.users.set(newUserFromBackend.id, newUserFromBackend);
      return newUserFromBackend;
    } catch (error) {
      console.error("Error creating user in Flask:", error);
      return user; // Fallback to in-memory user
    }
  }
}

const storage = new MemStorage();
export { storage };
