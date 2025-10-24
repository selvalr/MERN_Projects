import React, { useState } from "react";
import axios from "axios";

function ContactForm({ setContacts, contacts }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Intrested");

  const resetForm = () => {
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setStatus("Intrested");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Name and Email are required!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/contacts", {
        name,
        company,
        email,
        phone,
        status,
      });

      // add new contact on top of list
      setContacts([res.data, ...contacts]);

      resetForm();
    } catch (err) {
      console.error("Error creating contact:", err);
      alert("Failed to add contact. Please try again.");
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="name"
          placeholder="Name"
          id="name"
          className="bg-[#eff4ff] p-3 rounded-2xl w-full text-[#827f8d] outline-0"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          id="company"
          className="bg-[#eff4ff] p-3 rounded-2xl w-full text-[#827f8d] outline-0"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          className="bg-[#eff4ff] p-3 rounded-2xl w-full text-[#827f8d] outline-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          id="phone"
          className="bg-[#eff4ff] p-3 rounded-2xl w-full text-[#827f8d] outline-0"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select
          value={status}
          className="bg-[#eff4ff] p-3 rounded-2xl w-full text-[#2a292c] outline-0 cursor-pointer"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Intrested">Intrested</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Closed">Closed</option>
        </select>
        <button
          type="submit"
          className="text-white px-4 py-3 rounded-2xl hover:bg-[#001a52] bg-[#00277a] transition w-full mt-[10px] cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
