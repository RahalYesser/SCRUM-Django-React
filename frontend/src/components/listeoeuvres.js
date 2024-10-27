import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Listeoeuvres = () => {
  const [oeuvres, setOeuvres] = useState([]);

  useEffect(() => {
    // Fetch oeuvres from Django API
    axios
      .get("http://127.0.0.1:8000/oeuvre/")
      .then((response) => {
        setOeuvres(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the oeuvres!", error);
      });
  }, []);

  // Function to handle deleting an oeuvre
  const handleDelete = async (oeuvreId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/oeuvre/${oeuvreId}/`);
      // Remove the deleted oeuvre from the state
      setOeuvres(oeuvres.filter((oeuvre) => oeuvre.id !== oeuvreId));
      alert("Oeuvre deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the oeuvre!", error);
      alert("Failed to delete the oeuvre.");
    }
  };
  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-8 py-3 mb-8">
        <div className="w-full flex justify-end p-4">
          <Link to="/oeuvres/addoeuvre">
            <button
              type="button"
              class="focus:outline-none text-white bg-purple hover:bg-purple-900 focus:ring-4 
        focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 
        dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Ajouter un oeuvre
            </button>
          </Link>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-16 py-3">
                <span>Image</span>
              </th>
              <th scope="col" class="px-6 py-3">
                Titre
              </th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {oeuvres.map((oeuvre) => (
              <tr
                key={oeuvre.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="p-4">
                  {oeuvre.image && (
                    <img src={oeuvre.image} alt={oeuvre.titre} width="150" />
                  )}
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {oeuvre.titre}
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {oeuvre.description}
                  {/* <div class="flex items-center">
                        <button class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only"></span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                            </svg>
                        </button>

                        <button class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Quantity button</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div> */}
                </td>

                <td class="px-6 py-4">
                  <div className="flex">

                  
                  <Link
                    to={`/oeuvres/editoeuvre/${oeuvre.id}`} 
                    class="font-medium text-green-600 dark:text-red-500 hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Link>
                  <Link
                    onClick={() => handleDelete(oeuvre.id)}
                    to="/oeuvres"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      

    </>
  );
};

export default Listeoeuvres;
