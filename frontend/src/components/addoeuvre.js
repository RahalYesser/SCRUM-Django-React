import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Addoeuvre = () => {
  // State to handle form data
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

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
      const response = await axios.post(
        "http://127.0.0.1:8000/oeuvre/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Oeuvre added successfully!");
        // Optionally, clear the form
        setTitre("");
        setDescription("");
        setImage(null);
      }
    } catch (error) {
      console.error("There was an error adding the oeuvre!", error);
    }
  };
  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-8 py-3">
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

        <form class="max-w-sm mx-auto">
          <div class="mb-5">
            <label
              for="titre"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Titre d'oeuvre
            </label>
            <input
              type="text"
              id="titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div class="mb-5">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              type="text"
              rows="4"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              class="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div id="image" class="p-4">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <div className="text-center text-sm font-medium text-gray-900">
                Importer une image
              </div>

              <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    class="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  ></svg>
                  <input
                    name="files"
                    id="files"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                    className="w-full text-2xl cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  />
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            class="text-white bg-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800"
          >
            Ajouter
          </button>
        </form>
      </div>
    </>
  );
};

export default Addoeuvre;
