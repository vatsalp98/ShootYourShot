"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { interestSchema } from "~/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { interestItems } from "~/lib/utils";
import { api } from "~/trpc/react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./ui/sheet";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { Checkbox } from "./ui/checkbox";

export default function InterestForm() {
  type TInterestValues = z.infer<typeof interestSchema>;
  const [open, setOpen] = useState(false);

  const interestForm = useForm<TInterestValues>({
    resolver: zodResolver(interestSchema),
  });

  const { mutate: createInterest, isPending } =
    api.interest.createInterest.useMutation({
      onSuccess: () => {
        toast({
          title: "🎉 Prompt created!",
        });
        interestForm.reset();
        setOpen(false);
      },
      onError: (error) => {
        toast({
          title: error.message,
        });
        interestForm.reset();
      },
    });

  const onSubmit = (values: TInterestValues) => {
    createInterest(values);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
        <SheetTrigger>
          <Button>Add Interest</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="flex flex-col items-start justify-start text-start">
            <SheetTitle>Add Interests &#9889;</SheetTitle>
            <SheetDescription>
              All your interests to your profile for better compatibility.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <Form {...interestForm}>
              <form
                onSubmit={interestForm.handleSubmit(onSubmit)}
                id="interest-form"
              >
                <div className="space-y-4">
                  <FormField
                    name="interest"
                    control={interestForm.control}
                    render={() => (
                      <FormItem>
                        {interestItems.map((item) => (
                          <FormField
                            key={item.id}
                            control={interestForm.control}
                            name="interest"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
          <SheetFooter className="flex flex-row items-end justify-end gap-4">
            <SheetClose className="">
              <Button variant={"neutral"}>Cancel</Button>
            </SheetClose>
            <Button
              className="gap-2"
              form="interest-form"
              type="submit"
              disabled={isPending}
            >
              Save
              <PaperPlaneIcon />
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div></div>
    </>
  );
}
