"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { promptSchema } from "~/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { allCategories, allPrompts } from "~/lib/utils";
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

export default function PromptForm() {
  type TPromptValues = z.infer<typeof promptSchema>;
  const [open, setOpen] = useState(false);

  const promptForm = useForm<TPromptValues>({
    resolver: zodResolver(promptSchema),
  });

  const { mutate: createPrompt, isPending } =
    api.prompt.createPrompt.useMutation({
      onSuccess: () => {
        toast({
          title: "🎉 Prompt created!",
        });
        promptForm.reset();
        setOpen(false);
      },
      onError: (error) => {
        toast({
          title: error.message,
        });
        promptForm.reset();
      },
    });

  const onSubmit = (values: TPromptValues) => {
    createPrompt(values);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
        <SheetTrigger>
          <Button>Add Prompt</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="flex flex-col items-start justify-start text-start">
            <SheetTitle>Add Prompt &#10067;</SheetTitle>
            <SheetDescription>
              Respond to one of our answer or set your own and make a new
              prompt.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <Form {...promptForm}>
              <form
                onSubmit={promptForm.handleSubmit(onSubmit)}
                id="prompt-form"
              >
                <div className="space-y-4">
                  <FormField
                    name="category"
                    control={promptForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {allCategories.map((item, index) => (
                              <SelectItem key={index} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="question"
                    control={promptForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select question" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {allPrompts.map((item, index) => (
                              <SelectItem key={index} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="answer"
                    control={promptForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Answer</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Respond to the question..."
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
          <SheetFooter className="mt-2 flex flex-row items-end justify-end gap-4">
            <SheetClose className="">
              <Button variant={"neutral"}>Cancel</Button>
            </SheetClose>
            <Button
              className="gap-2"
              form="prompt-form"
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
