"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import type { z } from "zod";
import { loginSchema } from "~/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { login } from "~/actions/login";
import FormError from "./form-error";
import FormSuccess from "./form-success";

export default function LoginForm() {
  type TLoginValues = z.infer<typeof loginSchema>;
  const loginForm = useForm<TLoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: TLoginValues) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            loginForm.reset();
            setError(data.error);
          }

          if (data?.success) {
            loginForm.reset();
            setSuccess(data?.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    <>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonHref="/auth/register"
        backButtonLabel="Don't have an account?"
      >
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {showTwoFactor && (
                <>
                  <FormField
                    name="code"
                    control={loginForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>2FA Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123456"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {!showTwoFactor && (
                <>
                  <FormField
                    name="email"
                    control={loginForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={loginForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            {...field}
                            type="password"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button type="submit" className="mt-5 w-full" disabled={isPending}>
              {showTwoFactor ? "Confirm" : "Login"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
