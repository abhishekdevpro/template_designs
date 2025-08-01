// // import React, { useContext } from "react";
// // import {
// //   Phone,
// //   Mail,
// //   MapPin,
// //   Github,
// //   Linkedin,
// //   Twitter,
// //   Globe,
// //   Instagram,
// //   Facebook
// // } from "lucide-react";
// // import { ResumeContext } from "../context/ResumeContext";

// // const ICON_COMPONENTS = {
// //   phone: Phone,
// //   email: Mail,
// //   location: MapPin,
// //   github: Github,
// //   linkedin: Linkedin,
// //   twitter: Twitter,
// //   website: Globe,
// //   instagram: Instagram,
// //   facebook: Facebook
// // };

// // const ContactAndSocialMedia = ({
// //   title,
// //   contactData,
// //   socialMediaData,
// //   layout = "column",
// //   contactClass = "",
// //   socialMediaClass = "",
// //   addressCharacterLimit = 30,
// //   textColor = "text-black",
// //   className = ""
// // }) => {
// //   const { backgroundColorss } = useContext(ResumeContext);
// //   const finalTextColor = backgroundColorss ? textColor : "text-black";

// //   const getIcon = (iconName) => {
// //     const IconComponent = ICON_COMPONENTS[iconName.toLowerCase()];
// //     if (!IconComponent) return null;

// //     return (
// //       <div>
// //         <IconComponent className="w-5 h-5" />
// //       </div>
// //     );
// //   };

// //   const renderContactItem = (icon, data, truncate = false) => {
// //     if (!data) return null;

// //     const displayData = truncate && data.length > addressCharacterLimit
// //       ? `${data.slice(0, addressCharacterLimit)}...`
// //       : data;

// //     return (
// //       <div className={`flex items-center px-2 ${contactClass}`}>
// //         <span className={finalTextColor}>{getIcon(icon)}</span>
// //         &nbsp;
// //         <span className={finalTextColor}>{displayData}</span>
// //       </div>
// //     );
// //   };

// //   const renderSocialMediaLinks = () => {
// //     if (!Array.isArray(socialMediaData) || socialMediaData.length === 0) {
// //       return <p className={`text-gray-600 dark:text-gray-300 ${finalTextColor}`}>&nbsp;</p>;
// //     }

// //     return socialMediaData.map((socialMedia, index) => (
// //       <a
// //         href={`http://${socialMedia.link}`}
// //         aria-label={socialMedia.socialMedia}
// //         key={index}
// //         title={socialMedia.socialMedia}
// //         target="_blank"
// //         rel="noreferrer"
// //         className={`flex items-center px-2 ${socialMediaClass}`}
// //       >
// //         <span className={finalTextColor}>
// //           {getIcon(socialMedia.socialMedia.toLowerCase())}
// //         </span>
// //         &nbsp;
// //         <span className={`truncate ${finalTextColor}`}>
// //           {socialMedia.socialMedia}
// //         </span>
// //       </a>
// //     ));
// //   };

// //   return (
// //     <div
// //       className={`flex ${
// //         layout === "row"
// //           ? "flex-row items-center flex-wrap gap-2"
// //           : "flex-col gap-2"
// //       } ${className}`}
// //     >
// //       {title && (
// //         <h3
// //           className={`text-xl font-light mb-2 border-b-2 ${
// //             finalTextColor === "text-black" ? "border-black" : "border-white"
// //           } ${finalTextColor}`}
// //         >
// //           {title}&nbsp;
// //         </h3>
// //       )}

// //       {contactData && (
// //         <>
// //           {renderContactItem("phone", contactData.teldata)}
// //           {renderContactItem("email", contactData.emaildata)}
// //           {renderContactItem("location", contactData.addressdata, true)}
// //         </>
// //       )}

// //       {renderSocialMediaLinks()}
// //     </div>
// //   );
// // };

// // export default ContactAndSocialMedia;

// import React, { useContext } from "react";
// import {
//   Phone,
//   Mail,
//   MapPin,
//   Github,
//   Linkedin,
//   Twitter,
//   Globe,
//   Instagram,
//   Facebook,
// } from "lucide-react";
// import { ResumeContext } from "../context/ResumeContext";

// const ICON_COMPONENTS = {
//   phone: Phone,
//   email: Mail,
//   location: MapPin,
//   github: Github,
//   linkedin: Linkedin,
//   twitter: Twitter,
//   website: Globe,
//   instagram: Instagram,
//   facebook: Facebook,
// };

// const ContactAndSocialMedia = ({
//   title,
//   contactData,
//   socialMediaData,
//   layout = "column",
//   contactClass = "",
//   socialMediaClass = "",
//   addressCharacterLimit = 30,
//   textColor = "text-black",
//   className = "",
// }) => {
//   const { backgroundColorss } = useContext(ResumeContext);
//   const finalTextColor = backgroundColorss ? textColor : "text-black";

//   const getIcon = (iconName) => {
//     const IconComponent = ICON_COMPONENTS[iconName.toLowerCase()];
//     if (!IconComponent) return null;

//     return (
//       <div className={`${layout === "row" ? "px-2" : "pr-2"}`}>
//         <IconComponent className="w-5 h-5" />
//       </div>
//     );
//   };

//   const renderContactItem = (icon, data, truncate = false) => {
//     if (!data) return null;

//     const displayData = data

//     return (
//       <div className={`flex items-center gap-2 ${contactClass} hover:outline-dashed hover:outline-2 hover:outline-gray-400 hover:scale-105 transition-transform duration-300`}>
//         <span className={finalTextColor}>{getIcon(icon)}</span>

//         <span
//           className={finalTextColor}
//           contentEditable
//           suppressContentEditableWarning
//         >
//           {displayData}
//         </span>
//       </div>
//     );
//   };

//   const renderSocialMediaLinks = () => {
//     if (!Array.isArray(socialMediaData) || socialMediaData.length === 0) {
//       return (
//         <p className={`text-gray-600 dark:text-gray-300 ${finalTextColor}`}>
//           &nbsp;
//         </p>
//       );
//     }

//     return socialMediaData.map((socialMedia, index) => (
//       <a
//         href={`http://${socialMedia.link}`}
//         aria-label={socialMedia.socialMedia}
//         key={index}
//         title={socialMedia.socialMedia}
//         target="_blank"
//         rel="noreferrer"
//         className={`flex items-center gap-2 ${socialMediaClass} hover:outline-dashed hover:outline-2 hover:outline-gray-400 hover:scale-105 transition-transform duration-300`}
//       >
//         <span className={finalTextColor}>
//           {getIcon(socialMedia.socialMedia.toLowerCase())}
//         </span>
//         &nbsp;
//         <span
//           className={`truncate ${finalTextColor}`}
//           contentEditable
//           suppressContentEditableWarning
//         >
//           {socialMedia.socialMedia}
//         </span>
//       </a>
//     ));
//   };

//   return (
//     <div
//       className={`flex ${
//         layout === "row"
//           ? "flex-row items-center flex-wrap gap-2"
//           : "flex-col gap-2"
//       } ${className}`}
//     >
//       {title && (
//         <h3
//           className={`text-xl font-light mb-2 border-b-2 ${
//             finalTextColor === "text-black" ? "border-black" : "border-white"
//           } ${finalTextColor}`}
//           contentEditable
//           suppressContentEditableWarning
//         >
//           {title}&nbsp;
//         </h3>
//       )}

//       {contactData && (
//         <>
//           {renderContactItem("phone", contactData.teldata)}
//           {renderContactItem("email", contactData.emaildata)}
//           {renderContactItem("location", contactData.addressdata, true)}
//         </>
//       )}

//       {renderSocialMediaLinks()}
//     </div>
//   );
// };

// export default ContactAndSocialMedia;

import React, { useContext } from "react";

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

import { ResumeContext } from "../context/ResumeContext";

const ICON_COMPONENTS = {
  phone: FaPhone,
  email: FaEnvelope,
  location: FaMapMarkerAlt,
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  website: FaGlobe,
  instagram: FaInstagram,
  facebook: FaFacebook,
};

const ContactAndSocialMedia = ({
  title,
  contactData,
  socialMediaData,
  layout = "column",
  contactClass = "",
  socialMediaClass = "",
  addressCharacterLimit = 30,
  textColor = "text-black",
  className = "",
}) => {
  const { backgroundColorss } = useContext(ResumeContext);
  const finalTextColor = backgroundColorss ? textColor : "text-black";

  const getIcon = (iconName) => {
    const IconComponent = ICON_COMPONENTS[iconName.toLowerCase()];
    if (!IconComponent) return null;

    return (
      <div className={`${layout === "row" ? "px-2" : "pr-2"}`}>
        <IconComponent className="w-5 h-5" />
      </div>
    );
  };

  const renderContactItem = (icon, data, truncate = false) => {
    if (!data) return null;

    const displayData = data;

    return (
      <div
        className={`flex items-center gap-2 text-sm text-bold ${contactClass} hover:outline-dashed hover:outline-2 hover:outline-gray-400 hover:scale-105 transition-transform duration-300`}
      >
        <span className={`${finalTextColor} text-sm font-light`}>
          {getIcon(icon)}
        </span>

        <span
          className={`${finalTextColor} text-sm font-light break-all`}
          contentEditable
          suppressContentEditableWarning
        >
          {displayData}
        </span>
      </div>
    );
  };

  const renderSocialMediaLinks = () => {
    if (!Array.isArray(socialMediaData) || socialMediaData.length === 0) {
      return (
        <p className={`text-gray-600 dark:text-gray-300 ${finalTextColor}`}>
          &nbsp;
        </p>
      );
    }

    return socialMediaData.map((socialMedia, index) => (
      <a
        href={`http://${socialMedia.link}`}
        aria-label={socialMedia.socialMedia}
        key={index}
        title={socialMedia.socialMedia}
        target="_blank"
        rel="noreferrer"
        className={`flex items-center text-sm font-light ${socialMediaClass} hover:outline-dashed hover:outline-2 hover:outline-gray-400 hover:scale-105 transition-transform duration-300`}
      >
        <span className={` ${finalTextColor} text-sm font-light`}>
          {getIcon(socialMedia.socialMedia.toLowerCase())}
        </span>
        &nbsp;
        <span
          className={`truncate ${finalTextColor} text-sm font-light ml-1`}
          contentEditable
          suppressContentEditableWarning
        >
          {socialMedia.socialMedia}
        </span>
      </a>
    ));
  };

  return (
    <div
      className={`flex ${
        layout === "row"
          ? "flex-row items-center flex-wrap gap-2"
          : "flex-col gap-2"
      } ${className}`}
    >
      {title && (
        <h3
          className={` text-xl font-semibold mb-1  border-b-2 ${
            finalTextColor === "text-black" ? "border-black" : "border-white"
          } ${finalTextColor}`}
          style={{
            borderBottom: `1px solid `,
          }}
          contentEditable
          suppressContentEditableWarning
        >
          {title}&nbsp;
        </h3>
      )}

      {contactData && (
        <>
          {renderContactItem("phone", contactData.teldata)}
          {renderContactItem("email", contactData.emaildata)}
          {renderContactItem("location", contactData.addressdata, true)}
        </>
      )}

      {renderSocialMediaLinks()}
    </div>
  );
};

export default ContactAndSocialMedia;
