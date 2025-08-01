import Image from "next/image";
// import usflag from "../../public/assets/uslogo.png";
// import canadaflag from "../../public/assets/canada.png";
// import indiaflag from "../../public/assets/indiaflag.png";
// import unitedkingdomflag from "../../public/assets/unitedkingdomflag.png";
// import germanyflag from "../../public/assets/germanyflag.png";
// import australiaflag from "../../public/assets/australiaflag.png";
// import franceflag from "../../public/assets/franceflag.png";
// import netherlandsflag from "../../public/assets/netherlandsflag.png";
// import irelandflag from "../../public/assets/irelandflag.png";
// import singaporeflag from "../../public/assets/singaporeflag.png";

// const countries = [
//   { id: "us", name: "United States", flag: usflag },
//   { id: "ca", name: "Canada", flag: canadaflag },
//   { id: "in", name: "India", flag: indiaflag },
//   { id: "uk", name: "United Kingdom", flag: unitedkingdomflag },
//   { id: "de", name: "Germany", flag: germanyflag },
//   { id: "au", name: "Australia", flag: australiaflag },
//   { id: "fr", name: "France", flag: franceflag },
//   { id: "nl", name: "Netherlands", flag: netherlandsflag },
//   { id: "ie", name: "Ireland", flag: irelandflag },
//   { id: "sg", name: "Singapore", flag: singaporeflag },
// ];
const countries = [
  { id: "us", name: "United States", flag: "/assets/uslogo.png" },
  { id: "ca", name: "Canada", flag: "/assets/canada.png" },
  { id: "in", name: "India", flag: "/assets/indiaflag.png" },
  { id: "uk", name: "United Kingdom", flag: "/assets/unitedkingdomflag.png" },
  { id: "de", name: "Germany", flag: "/assets/germanyflag.png" },
  { id: "au", name: "Australia", flag: "/assets/australiaflag.png" },
  { id: "fr", name: "France", flag: "/assets/franceflag.png" },
  { id: "nl", name: "Netherlands", flag: "/assets/netherlandsflag.png" },
  { id: "ie", name: "Ireland", flag: "/assets/irelandflag.png" },
  { id: "sg", name: "Singapore", flag: "/assets/singaporeflag.png" },
];

export default function CountrySelection({ onBack, onSelectCountry }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col">
      <header className="bg-primar text-white px-4 py-6 flex items-center justify-between"></header>
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <div className="max-w-3xl text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary hover:text-primary/90 leading-snug mb-2">
            For which country to tailor your resume to its specific
            requirements.
          </h1>
          <p className="text-md md:text-lg text-success hover:text-success/90 ">
            Select the country to tailor your resume to its specific
            requirements.
          </p>
        </div>

        <div className="py-10 px-4 w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              ...countries.filter((c) => ["us", "ca", "in"].includes(c.id)),
              ...countries.filter((c) => !["us", "ca", "in"].includes(c.id)),
            ].map((country) => (
              <button
                key={country.id}
                onClick={() => onSelectCountry(country.id)}
                className="p-5 rounded-2xl shadow-md border border-gray-200 bg-primary/20 hover:bg-primary hover:text-white hover:shadow-xl flex flex-col items-center transition-all duration-200 group"
              >
                <Image
                  src={country.flag}
                  alt={country.name}
                  width={100}
                  height={100}
                  loading="lazy"
                  className="mb-4 transition-transform duration-200 group-hover:scale-105"
                />
                <span className="text-primary group-hover:text-white font-semibold text-lg mb-2 transition-colors duration-200">
                  {country.name}
                </span>
                <span className="text-xl text-gray-400 group-hover:text-success transition-colors duration-200">
                  →
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={onBack}
              className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 
              font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
