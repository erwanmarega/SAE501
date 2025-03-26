"use client";

import Image from "next/image";

const activities = [
  {
    title: "Natation",
    description:
      "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
    link: "Choisir",
  },
  {
    title: "Aquagym",
    description:
      "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
    link: "Choisir",
  },
  {
    title: "Aquabike",
    description:
      "Measure what matters with Untitled's easy-to-use reports. You can filter, export, and drill down on the data in a couple clicks.",
    link: "Choisir",
  },
];

export default function ActivitiesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-12">
        <div className="w-full space-y-6 text-center">
          <div className="flex justify-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Image
                src="/assets/img/quote.png"
                alt="Quote Icon"
                width={32}
                height={32}
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900">
            Différentes Activités
          </h2>
          <p className="text-gray-600">
            Ensemble des disciplines proposés au sein de VSJ Natation
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6 w-full md:w-1/2">
            {activities.map((activity, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {activity.title}
                </h3>
                <p className="text-gray-600 text-sm">{activity.description}</p>
                <a
                  href="#"
                  className="text-blue-600 font-medium text-sm flex items-center"
                >
                  {activity.link} <span className="ml-1">→</span>
                </a>
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/assets/img/mockup.png"
              alt="Pool Mockup"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
