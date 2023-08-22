/* eslint-disable @next/next/no-img-element */
"use client";
import protectAuthPages from "@/hooks/protectAuthPages";
import LoginForm from "@/ui/form/login/LoginForm";
import Image from "next/image";
import React from "react";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-brand_yellow-500 md:py-8 md:px-14 py-4 px-5">
      <div>
        <Image
          alt=""
          src={"/assets/images/logo.png"}
          className="object-contain"
          height={81}
          width={81}
        />
      </div>
      <div className="flex items-center gap-x-16 mt-14">
        <div className="lg:inline-flex lg:flex-[0.5] hidden">
          <img
            alt=""
            src={"/assets/images/loginhero.svg"}
            className="object-fill w-full h-auto"
          />
        </div>
        <div className="lg:flex-[0.5] flex-1">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default protectAuthPages(SignIn);
