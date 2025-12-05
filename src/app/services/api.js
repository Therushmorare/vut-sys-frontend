const API_BASE_URL = "http://seta-management-api-env.eba-rd7cpwya.us-east-1.elasticbeanstalk.com/api";

export const registerStudent = async (formData) => {
  try {
    // Map frontend keys to backend keys
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      id_number: formData.idNumber,
      faculty: formData.faculty,
      programme: formData.programme,
      password: formData.password,
    };

    const response = await fetch(`${API_BASE_URL}/students/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering student:", error);
    return { success: false, message: "Network error" };
  }
};