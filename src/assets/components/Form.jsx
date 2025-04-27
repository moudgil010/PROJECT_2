import React, { useState } from "react";
import { initializeApp } from "firebase/app";

import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-LxEoJohuPAHACgmcMzcZWRI8GjseymQ",
  authDomain: "my-project-aff6a.firebaseapp.com",
  projectId: "my-project-aff6a",
  storageBucket: "my-project-aff6a.firebasestorage.app",
  messagingSenderId: "532976635465",
  appId: "1:532976635465:web:0d4786b00e1c552e887998",
  measurementId: "G-PR9GKM96P7",
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app); 

const Form = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing on submit

    try {
      await addDoc(collection(db, "users"), {
        fullName,
        email,
        phone,
        gender,
      });

      alert("Registration successful!");
      // Reset
      setFullName("");
      setEmail("");
      setPhone("");
      setGender("male"); 
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting form: " + error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full rounded-2xl border-gray-300 border-2">
        <h1 className="text-white text-2xl font-bold text-center mx-auto">
          Registration Form
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center m-2 p-2 ">
          <div className="w-full mb-4">
            <label className="text-white block mb-2">Full Name:</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full mb-4">
            <label className="text-white block mb-2">Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full mb-4">
            <label className="text-white block mb-2">Phone:</label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full mb-4">
            <label className="text-white block mb-2">Gender:</label>
            <div className="flex gap-4 text-white">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked = {gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                  defaultChecked
                  required
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked = {gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                  required
                />
                Female
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
