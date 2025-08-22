import React, { useState, useEffect } from "react";

import pusher from "@/config/pusherClient";
import { api } from "@/config/axios";

const TestComponent = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [csvFile, setCSVFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return alert("Please select a file");
    if (e.target.files.length > 0) {
      setCSVFile(e.target.files[0]);
    }
  };

  // Upload handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!csvFile) return alert("Please select a file first");

      const formData = new FormData();

      formData.append("file", csvFile);

      await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      alert("Error uploading file");
    }
  };

  // Subscribe to Pusher
  useEffect(() => {
    const channel = pusher.subscribe("csv-channel");

    channel.bind("new-row", (data: any) => {
      setRows((prev) => [...prev, data]);
    });

    return () => {
      pusher.unsubscribe("csv-channel");
    };
  }, []);

  return (
    <div className="p-5 flex flex-col">
      <h1>CSV Row Stream</h1>
      <form
        className="flex flex-col justify-start items-start gap-2"
        onSubmit={handleSubmit}
      >
        <input
          accept=".csv"
          id="csvFile"
          className="bg-gray-100 p-2"
          name="csvFile"
          type="file"
          onChange={handleFileChange}
        />
        <button className="bg-gray-100 p-2" type="submit">
          Upload
        </button>
      </form>
      <table border={1}>
        <thead>
          <tr>
            {rows[0] &&
              Object.keys(rows[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{val as string}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestComponent;
