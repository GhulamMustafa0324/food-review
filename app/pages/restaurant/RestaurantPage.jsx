import Image from "next/image";
import React from "react";

const RestaurantPage = () => {
  return (
    <div className="container mx-auto">
      <div className="relative">
        <Image
          src="/images/restaurant2.jpg"
          alt="Restaurant Image"
          className="w-full h-1/2 object-cover"
          fill
          sizes="50vw"
        />
        <div className="absolute bottom-4 left-4 text-white font-bold text-xl">
          Restaurant Name
        </div>
      </div>
      <div className="my-8">
        <h2 className="text-2xl font-bold">About</h2>
        <p>Restaurant description and additional details go here.</p>
      </div>
      <div className="my-8">
        <h2 className="text-2xl font-bold">Contact Information</h2>
        <p>Phone: 123-456-7890</p>
        <p>Email: info@example.com</p>
      </div>
      <div className="my-8">
        <h2 className="text-2xl font-bold">Location</h2>
        <p>Address: 123 Main Street, City, State</p>
      </div>
      <div className="my-8">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="mt-4">
          <div className="bg-white p-4 rounded border border-gray-300">
            <div className="font-bold mb-2">Reviewer Name</div>
            <div className="text-gray-600">
              This restaurant is amazing! The food and service were excellent.
            </div>
          </div>
          <div className="bg-white p-4 rounded border border-gray-300 mt-4">
            <div className="font-bold mb-2">Another Reviewer</div>
            <div className="text-gray-600">
              Great ambiance and delicious food. Highly recommended!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
