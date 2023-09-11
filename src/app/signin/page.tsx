"use client";
import { ChangeEvent, useState } from "react";
import Style from "./signin.module.css";
import { signIn } from "next-auth/react";
import Providers from "@/components/provider";
import { useSearchParams, useRouter } from "next/navigation";

export default function Page() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/post";

  const router = useRouter();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setFormValues({ username: "", password: "" });

    try {
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   body: JSON.stringify(formValues),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      const res = await signIn("credentials", {
        redirect: false,
        username: formValues.username,
        password: formValues.password,
        callbackUrl: callbackUrl,
      });

      setLoading(false);
      console.log(res);
      if (!res?.ok) {
        setError("invalid email or password");
        return;
      } else {
        router.push(callbackUrl);
      }
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
            type="email"
            name="username"
            value={formValues.username}
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
          {loading ? "loading..." : "Sign IN"}
        </button>
      </form>
    </div>
  );
}
