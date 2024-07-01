import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Button } from "./ui/button";

interface CardWrapperProps {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export default function CardWrapper({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className="flex w-full flex-col items-center justify-between gap-y-4">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={150}
            height={150}
            className="rounded-full bg-white p-2"
          />
          <p className="text-md text-muted-foreground font-semibold">
            {headerLabel}
          </p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* Place for Social Auth */}
      {/* {showSocial && (
        <CardFooter>
          <SocialAuth />
        </CardFooter>
      )} */}
      <CardFooter>
        <Button
          variant={"link"}
          className="w-full font-normal"
          size={"sm"}
          asChild
        >
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
