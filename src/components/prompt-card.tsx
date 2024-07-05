import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { type ReactNode } from "react";

interface ActionCardProps {
  title: string;
  description: string;
  form: ReactNode;
}

export default function ActionCard({
  title,
  description,
  form,
}: ActionCardProps) {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>{form}</CardFooter>
    </Card>
  );
}
