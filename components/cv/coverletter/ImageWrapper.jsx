import Image from "next/image";
import PropTypes from "prop-types";

const ImageWrapper = ({
  src,
  alt,
  defaultSize = 100,
  size,
  border = "2px",
  borderColor = "black",
}) => {
  const finalSize = size || defaultSize; // Use dynamic size if provided, otherwise use default size
  console.log(src, ">>>>>imagewrapper.jsx");
  return (
    <div
      className="rounded-full overflow-hidden"
      style={{
        width: `${finalSize}px`,
        height: `${finalSize}px`,
        border: `${border} solid ${borderColor}`,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={finalSize}
          height={finalSize}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
    </div>
  );
};

ImageWrapper.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  defaultSize: PropTypes.number,
  size: PropTypes.number,
  border: PropTypes.string,
  borderColor: PropTypes.string,
};

ImageWrapper.defaultProps = {
  alt: "profile image",
  defaultSize: 100,
  border: "2px",
  borderColor: "black",
};
export default ImageWrapper;
