"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useStore } from "../utils/zustandStore";
import { Button } from "./buttons";
import { useRouter } from "next/navigation";

export const LandingPage = () => {
  const session = useSession();
  const router=useRouter();
  const sessionData = session?.data as {
    user: { name: string; email: string; id: string };
  } | null;

  const { reset, setUserCredentials } = useStore();

  return (
    <div className="flex flex-col items-center w-full text-gray-900">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl font-bold">TaskManager</h1>
        <nav>
          {!sessionData && (
            <Button
              text={"SignIn"}
              onClick={() =>
                signIn("provider", { callbackUrl: "/pages/dashboard" })
              }
            />
          )}
          {sessionData && (
            <Button
              text={"SignOut"}
              onClick={() => {
                signOut();
                reset();
              }}
            />
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full text-center py-20 bg-blue-100">
        <h2 className="text-4xl font-bold mb-4">
          Organize Your Work, Simplify Your Life
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Manage your tasks efficiently and boost productivity with TaskManager.
        </p>
        <Button text="Start For Free"  onClick={()=>router.push('/signup')}></Button>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-blue-200 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold">Task Scheduling</h3>
          <p className="text-gray-600">
            Plan your tasks effectively and never miss a deadline.
          </p>
        </div>
        <div className="p-6 bg-green-200 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold">Collaboration</h3>
          <p className="text-gray-600">
            Work with your team seamlessly on shared tasks.
          </p>
        </div>
        <div className="p-6 bg-yellow-200 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold">Progress Tracking</h3>
          <p className="text-gray-600">
            Monitor your progress with insightful analytics.
          </p>
        </div>
      </section>

      {/* Call To Action */}
      <section className="w-full text-center py-16 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold">Boost Your Productivity Today!</h2>
        <p className="text-lg mb-6">
          Join thousands of users managing tasks effortlessly.
        </p>
        <Button text={"Get Started"} onClick={()=>router.push('/signup')}/>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center bg-gray-100">
        <p className="text-gray-600">
          &copy; 2025 TaskManager. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
