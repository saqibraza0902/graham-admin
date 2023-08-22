import Button from "@/ui/form/Button";
// import CheckBox from "@/ui/form/CheckBox";
import Input from "@/ui/form/Input";
// import PhoneInput from "@/ui/form/PhoneInput";
// import Select from "@/ui/form/Select";
import React, { useState } from "react";
// import { LoginValues, loginSchema } from "./utils";
import { useRouter } from "next/navigation";
import { URLS } from "@/utils/URLS";
import { useAppDispatch } from "@/redux/hooks";
// import { loginUser, toggleLoading } from "@/redux/slices/auth";
// import httpCommon from "@/services/httpCommon";
import { handleApiError } from "@/utils/hanldeApiError";
import { toast } from "react-toastify";
import api from "@/instance/api";
import { loginUser } from "@/redux/slices/auth";

const LoginForm = () => {
  const [loading, setloading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const onSubmit = async () => {
    try {
      setloading(true);
      const res = await api.post("/admin/login", values);
      if (res?.data?.requiredVerification) {
        toast.success("Verification code sent to your email.");
        // router.push(`${URLS.VERIFY_OTP}?email=${formValues.email}`);
      } else {
        dispatch(
          loginUser({
            user: res.data.user,
            token: res.data.token,
          })
        );
        toast.success("Login successful");
        router.replace(URLS.HOME);
      }
    } catch (error) {
      const err = handleApiError(error);
      toast.error(err);
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <h1 className="text-6xl font-bold tracking-[0.233px] font-Poppins text-center">
        Sign In
      </h1>
      <p className="text-black font-Roboto text-base tracking-[0.1px] w-full mt-5 text-center">
        Just sign in if you have an account in here. Enjoy our Website
      </p>
      <div className="bg-white py-10 px-8 rounded-20px mt-10">
        <form>
          <div className="space-y-5">
            <Input
              value={values.email}
              placeholder="Email"
              showIcon={false}
              className="bg-brand_white-600"
              name="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <Input
              value={values.password}
              placeholder="Password"
              name="password"
              className="bg-brand_white-600"
              showIcon={false}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <Button
            onClick={() => onSubmit()}
            disabled={loading}
            type="submit"
            className="mt-8"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
