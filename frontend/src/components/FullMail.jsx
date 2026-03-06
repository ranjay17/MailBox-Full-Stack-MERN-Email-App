import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const FullMail = () => {
  const inbox = useSelector((store) => store.mail.inbox);
  const sentBox = useSelector((store) => store.mail.sent);
  const { id } = useParams();

  const mail =
    inbox.find((m) => m._id == id) || sentBox.find((m) => m._id == id);

  if (!mail) {
    return (
      <p className="text-center text-gray-600 mt-10 text-lg">No Mail Found</p>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 py-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">From:</span> {mail.from}
          </p>
          <p className="text-gray-700 text-sm mt-1">
            <span className="font-semibold">To:</span> {mail.to}
          </p>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
          {mail.subject}
        </h3>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {mail.body}
        </p>
      </div>
    </div>
  );
};

export default FullMail;
