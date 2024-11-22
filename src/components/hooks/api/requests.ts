export const postData = async (url: any, body: any) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("An error occurred while posting data.");
  }

  return response.json();
};

export const putData = async (url: any, body: any) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("An error occurred while updating data.");
  }

  return response.json();
};

export const deleteData = async (url: any) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while deleting data.");
  }

  return response.json();
};
