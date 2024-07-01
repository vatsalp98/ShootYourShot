import PricingPlan from "./pricing-plan";

export default function Pricing() {
  return (
    <section className="inset-0 flex w-full flex-col items-center justify-center border-b-2 border-b-border bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-base dark:border-b-darkBorder dark:bg-darkBg">
      <div className="w-container mx-auto max-w-full px-5 py-20 lg:py-[100px]">
        <h2 className="mb-14 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
          Pricing
        </h2>
        <div className="w900:mx-auto w900:w-2/3 w900:grid-cols-1 w500:w-full grid grid-cols-2 gap-8">
          <PricingPlan
            planName="Basic"
            description="Free basic plan."
            price="Free"
            perks={[
              "5 Shots/day",
              "Up to 100 Matches",
              "Basic Booking",
              "48-hour support response time",
            ]}
          />
          <PricingPlan
            planName="Premium"
            description="Premium dating plan."
            price="10"
            perks={[
              "25 Shots/day",
              "Unlimited matches",
              "Advanced matching system",
              "24-hour support response time",
              "Custom booking calendar",
            ]}
            mostPopular
          />
        </div>
      </div>
    </section>
  );
}
