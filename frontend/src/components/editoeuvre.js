import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const EditOeuvre = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(""); // To hold existing image URL

  // Fetch the existing oeuvre data when the component mounts
  useEffect(() => {
    const fetchOeuvre = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/oeuvre/${id}/`);
        const oeuvre = response.data;
        setTitre(oeuvre.titre);
        setDescription(oeuvre.description);
        setExistingImage(oeuvre.image); // Assuming the image URL is returned in the response
      } catch (error) {
        console.error("Error fetching oeuvre data", error);
      }
    };

    fetchOeuvre();
  }, [id]);

  // Handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to send to Django backend
    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      // Send data to Django backend using Axios
      const response = await axios.put(
        `http://127.0.0.1:8000/oeuvre/${id}/`, // PUT request to update
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Oeuvre updated successfully!");
        // Optionally, redirect or clear the form
      }
    } catch (error) {
      console.error("There was an error updating the oeuvre!", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-8 py-3">
      <Link to="/oeuvres">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 font-bold text-purple cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </Link>

      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="titre"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Titre d'oeuvre
          </label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            type="text"
            rows="4"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div id="image" className="p-4">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="text-center text-sm font-medium text-gray-900">
              Importer une image
            </div>
            {existingImage && (
              <img src={existingImage} alt="Existing Oeuvre" className="mb-4 w-full h-auto" />
            )}
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <input
                  name="files"
                  id="files"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full text-2xl cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="text-white bg-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800"
        >
          Modifier
        </button>
      </form>
    </div>
  );
};

export default EditOeuvre;
