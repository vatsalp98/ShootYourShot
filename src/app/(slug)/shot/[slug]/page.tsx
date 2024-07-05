import {
  AvatarIcon,
  CheckIcon,
  HeartIcon,
  InstagramLogoIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/server";

interface SlugPageProps {
  params: {
    slug: string;
  };
}

export default async function SlugPage({ params: { slug } }: SlugPageProps) {
  const user = await api.user.getUserBySlug({ slug });

  return (
    <>
      <div className="flex w-full flex-col justify-between px-10 md:flex-row">
        <div className="flex h-full flex-col justify-between py-20">
          <div className="w-[250px]">
            <Avatar className="h-40 w-40">
              <AvatarImage />
              <AvatarFallback>
                <AvatarIcon className="h-40 w-40" />
              </AvatarFallback>
            </Avatar>
            <div className="mt-4 text-3xl font-bold">{user.name}</div>
            <div>@{user.slug}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="">
            <CardHeader>
              <div>
                <PersonIcon className="h-12 w-12" />
              </div>
              <CardTitle className="">Gender</CardTitle>
              <div className="flex">
                <Badge variant={"neutral"} className="rounded-lg">
                  {user.gender}
                </Badge>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div>
                <HeartIcon className="h-12 w-12" />
              </div>
              <CardTitle>Looking For</CardTitle>
              <div className="flex">
                <Badge variant={"neutral"} className="rounded-lg">
                  {user.lookingFor}
                </Badge>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div>
                <CheckIcon className="h-12 w-12" />
              </div>
              <CardTitle>Verified</CardTitle>
              <div className="flex">
                <Badge variant={"neutral"} className="rounded-lg">
                  {user.emailVerified ? "VERIFIED" : "UNVERIFIED"}
                </Badge>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div>
                <InstagramLogoIcon className="h-12 w-12" />
              </div>
              <CardTitle>Instagram</CardTitle>
              <div className="flex">
                <Badge variant={"neutral"} className="rounded-lg">
                  @vatsalparmar98
                </Badge>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div>
                <TwitterLogoIcon className="h-12 w-12" />
              </div>
              <CardTitle>Twitter</CardTitle>
              <div className="flex">
                <Badge variant={"neutral"} className="rounded-lg">
                  @vatsalparmar98
                </Badge>
              </div>
            </CardHeader>
          </Card>
          {user.prompts.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div>
                  <QuestionMarkCircledIcon className="h-12 w-12" />
                </div>
                <CardTitle>{item.category}</CardTitle>
                <div className="flex">
                  <Badge variant={"neutral"} className="rounded-lg">
                    {item.answer}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
