import React, { useState } from "react";
import { Star } from "lucide-react";

const FeedbackForm = () => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">Feedback</h2>
            <div className="flex items-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={24}
                        className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                        onClick={() => setRating(star)}
                    />
                ))}
            </div>
            <textarea
                className="w-full mt-3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
                placeholder="Share your thoughts on this recipe..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <button
                className="mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                onClick={() => alert(`Submitted Rating: ${rating} Stars\nFeedback: ${feedback}`)}
            >
                Submit Feedback
            </button>
        </div>
    );
};

export default FeedbackForm;
