"use client";

import type { z } from "zod";
import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { registerSchema } from "~/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState, useTransition } from "react";
import { register } from "~/actions/register";
import FormError from "./form-error";
import FormSuccess from "./form-success";

export default function RegisterForm() {
  type TRegisterValues = z.infer<typeof registerSchema>;
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const registerForm = useForm<TRegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: TRegisterValues) => {
    console.log("VALUES", values);
    if (values.password === values.confirm_password) {
      startTransition(() => {
        register(values)
          .then((data) => {
            if (data.success) setSuccess(data.success);
            if (data.error) setError(data.error);
          })
          .catch(() => {
            setError("Something went wrong!");
          });
      });
    } else {
      registerForm.setError("confirm_password", {
        message: "Passwords dont match",
      });
    }
  };

  return (
    <>
      <CardWrapper
        headerLabel="Create your account"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
      >
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <div className="flex flex-row gap-2">
                <FormField
                  name="name"
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="slug"
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-text dark:text-darkText sm:text-sm">
                              @
                            </span>
                          </div>
                          <Input
                            placeholder="johndoe"
                            {...field}
                            className="pl-10"
                            disabled={isPending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="email"
                control={registerForm.control}
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

              <div className="flex flex-row gap-2">
                <FormField
                  name="gender"
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Gender</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pick your gender..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                          <SelectItem value="TRANS">Trans</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="lookingFor"
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Interested In</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your interest..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                          <SelectItem value="TRANS">Trans</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="password"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="**********"
                        {...field}
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirm_password"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="**********"
                        {...field}
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!success && <FormError message={error} />}
            <FormSuccess message={success} />

            <Button className="mt-5 w-full" disabled={isPending}>
              Create
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
