"use client";
import { ChangeEvent, useState } from "react";
import Style from "./signup.module.css";
import { signIn } from "next-auth/react";
import Providers from "@/components/provider";

export default function Page() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ name: "", email: "", password: "" });

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      signIn("credentials", { callbackUrl: "/" });
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div className={Style.formsignin}>
      <form onSubmit={onSubmit}>
        <div className="m-6 py-1">
          <input
            required
            type="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-control"
          />
        </div>
        <div className="m-6 py-1">
          <input
            required
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email address"
            className="form-control"
          />
        </div>
        <div className="m-6 py-1">
          <input
            required
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-control"
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
          className="btn btn-primary btn-block w-100 py-2 my-2"
          disabled={loading}
        >
          {loading ? "loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
