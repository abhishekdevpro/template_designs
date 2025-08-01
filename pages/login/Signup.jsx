import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import logo from "./logo.png";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      toast.error("All fields are required");
      return;
    }

    setIsLoading(true);

    const body = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "https://api.abroadium.com/api/user/auth/signup",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, response.status, "userinfoooo");
      if (response.status === 200) {
        toast.success(
          "Verification link sent on your email ID, please activate to login "
        );

        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
        });

        // router.push("/login");
      } else {
        toast.error("Failed to sign up");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-8 rounded-xl shadow-lg shadow-slate-700 w-full max-w-lg m-5">
        <div className="flex justify-center mb-4">
          <Image src={logo} className="w-40 h-10" alt="Logo" />
        </div>
        <div className="text-2xl text-black text-center font-bold">
          Create an Account
        </div>
        <form onSubmit={handleSignup}>
          <div className="flex gap-7 mt-2">
            <div className="mb-4">
              <label className="block text-black">First Name*</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your first name"
                required
                minLength={2}
                maxLength={40}
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black">Last Name*</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your last name"
                required
                minLength={2}
                maxLength={40}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-black">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Phone*</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your phone number"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Password*</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your password"
                required
                minLength={6}
                maxLength={30}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                disabled={isLoading}
              >
                {showPassword ? "🕵🏻 Hide " : "👁 View"}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                required
                className="mr-2"
                disabled={isLoading}
              />
              <Link href={"/terms&conditions"}>
                {" "}
                Agree to terms & conditions
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing up...
              </>
            ) : (
              "Signup"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
