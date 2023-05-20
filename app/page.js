"use client";
import Image from "next/image";
import Link from "next/link";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import firebase from "./utils/firebaseConfig";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  limit,
  query,
} from "firebase/firestore";
// import { useRouter } from "next/router";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // const router = useRouter();

  useEffect(() => {
    const firestore = getFirestore();
    const restaurantsCollection = collection(firestore, "restaurants");
    const limitedRestaurantsQuery = query(restaurantsCollection, limit(12));

    const unsubscribe = onSnapshot(limitedRestaurantsQuery, (snapshot) => {
      const updatedRestaurants = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(updatedRestaurants);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const { name, description } = restaurant;
    const lowerCaseSearchInput = searchInput.toLowerCase();

    return (
      name.toLowerCase().includes(lowerCaseSearchInput) ||
      description.toLowerCase().includes(lowerCaseSearchInput)
    );
  });

  const handleRestaurantClick = (restaurantId) => {
    // router.push(`/pages/restaurant/${restaurantId}`);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebase);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase);
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful sign-in
        const user = result.user;
        console.log("User signed in:", user);
      })
      .catch((error) => {
        // Handle error
        console.error("Error signing in with Google:", error);
      });
  };

  const handleSignOut = () => {
    const auth = getAuth(firebase);
    signOut(auth)
      .then(() => {
        // Handle successful sign-out
        setUser(null);
      })
      .catch((error) => {
        // Handle error
        console.error("Error signing out:", error);
      });
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-transparent z-50 text-white py-8 px-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              <Link href="/">
                <span className="text-white hover:text-gray-400">
                  Foodie Reviews
                </span>
              </Link>
            </h1>
          </div>
          <div className="flex items-center">
            <div className="flex-grow">
              <input
                type="text"
                value={searchInput}
                onChange={handleSearch}
                placeholder="Search..."
                className="px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {user ? (
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-md mr-4 hover:bg-red-700"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="bg-red-600 text-white px-4 py-2 rounded-md mr-4 hover:bg-red-700"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </nav>
      </header>

      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Welcome to Foodie Reviews
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl">
            Discover and review the best restaurants in town
          </p>
        </div>

        <Image
          className="object-cover absolute inset-0 object-center opacity-40 "
          alt="Background Image"
          src="/images/restaurant2.jpg"
          fill
          sizes="100vw"
        />
      </div>

      <main className="flex-grow">
        <section className="my-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Popular Restaurants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="p-4 border-b-2 cursor-pointer"
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                {/* Restaurant image */}
                <div className="w-full h-48 mb-4 relative">
                  <img
                    src={restaurant.image.url}
                    alt={restaurant.image.alt}
                    width={restaurant.image.width}
                    height={restaurant.image.height}
                    className="w-full h-48 object-cover mb-4"
                  />
                </div>

                {/* Restaurant details */}
                <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                <p className="text-sm mb-4">{restaurant.description}</p>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">&#9733;</span>
                  <span>{restaurant.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Show all restaurants button */}

        <div className="p-4 border-b-2 flex items-center justify-center">
          <Link
            className="text-black hover:underline bg-gray-200 px-4 py-2 rounded-md"
            href="/"
          >
            See All Restaurants
          </Link>
        </div>
      </main>

      <footer className="text-center py-4">
        <p>&copy; 2023 Foodie Reviews. All rights reserved.</p>
      </footer>
    </div>
  );
}
