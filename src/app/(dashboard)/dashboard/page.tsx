import InterestForm from "~/components/interest-form";
import MaxWidthWrapper from "~/components/max-witdh-wrapper";
import ActionCard from "~/components/prompt-card";
import PromptForm from "~/components/prompt-form";
import { currentUser } from "~/lib/auth";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <>
      <MaxWidthWrapper className="mt-4">
        <div>
          <div>
            <h2 className="font-bold">Welcome Back, {user?.name} &#128075;</h2>
            <span className="text-sm text-gray-400">Your activity review</span>
          </div>

          <div className="mt-4 space-y-6">
            <ActionCard
              title="Your Prompts &#10067;"
              description="Get started by adding prompts to your profile to increase your chances of matching."
              form={<PromptForm />}
            />

            <ActionCard
              title="Your Interests &#9889;"
              description="Add your interests to help other know you better and increase the chances of compatibility with your matches."
              form={<InterestForm />}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
