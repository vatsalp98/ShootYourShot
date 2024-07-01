import { faker } from "@faker-js/faker";

export default function Community() {
  const review = () => {
    return {
      pfp: faker.image.avatar(),
      fullName: faker.person.fullName(),
      jobTitle: faker.person.jobTitle(),
      review: faker.lorem.sentences({ min: 1, max: 3 }),
    };
  };

  return (
    <section className="inset-0 flex w-full flex-col items-center justify-center border-b-2 border-b-border bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-base dark:border-b-darkBorder dark:bg-darkBg">
      <div className="w-container mx-auto max-w-full px-5 py-20 lg:py-[100px]">
        <h2 className="mb-14 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
          Loved by the community
        </h2>
        <div className="w900:grid-cols-1 w900:gap-0 grid grid-cols-3 gap-4 lg:gap-8">
          {[
            [review(), review()],
            [review(), review(), review()],
            [review(), review()],
          ].map((card, index) => (
            <div className="group flex flex-col justify-center" key={index}>
              {card.map(({ jobTitle, pfp, fullName, review }, index) => (
                <div
                  className="w900:mx-auto w900:min-h-20 w900:w-2/3 w500:w-full mb-4 min-h-48 w-full rounded-base border-2 border-border bg-bg p-5 shadow-light dark:border-darkBorder dark:bg-darkBg dark:shadow-dark lg:mb-8"
                  key={index}
                >
                  <div className="flex items-center gap-5">
                    <img
                      className="h-12 w-12 rounded-base border-2 border-border dark:border-darkBorder"
                      src={pfp}
                      alt="pfp"
                    />

                    <div>
                      <h4 className="text-lg font-heading">{fullName}</h4>
                      <p className="text-sm font-base">{jobTitle}</p>
                    </div>
                  </div>
                  <div className="mt-5">{review}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
