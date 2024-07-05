import { type ClassValue, clsx } from "clsx";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "ShootYourShot",
  description = "The new Gen-Z dating app.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@vatsalparmar98",
    },
    icons,
    metadataBase: new URL("https://cendmate.com"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function generatePassword(password: string) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: genHash,
  };
}

export function validPassword(password: string, hash: string, salt: string) {
  const checkHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === checkHash;
}

export const allPrompts = [
  "What's your favorite Netflix show?",
  "What's your go-to comfort food?",
  "What's your favorite music band?",
  "What's your favorite color?",
  "What's your favorite clothing style?",
  "What's your favorite season?",
];

export const allCategories = [
  "Food",
  "Hobbies",
  "Technology",
  "Lifestyle",
  "Dating",
];

export const interestItems = [
  {
    id: "camping",
    label: "Camping",
  },
  {
    id: "cooking",
    label: "Cooking",
  },
  {
    id: "coding",
    label: "Coding",
  },
  {
    id: "hiking",
    label: "Hiking",
  },
  {
    id: "clubbing",
    label: "Clubbing",
  },
  {
    id: "driving",
    label: "Driving",
  },
] as const;
