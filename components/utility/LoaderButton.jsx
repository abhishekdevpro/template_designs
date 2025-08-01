// import React from 'react';
// import { Loader } from 'lucide-react'; // Loader icon from lucide-react
// import PropTypes from 'prop-types';

// const LoaderButton = ({ isLoading, onClick, children, className = '', ...props }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`relative flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300 ${className}`}
//       disabled={isLoading}
//       {...props}
//     >
//       {isLoading ? (
//         <Loader className="animate-spin w-5 h-5 text-white mr-2" />
//       ) : null}
//       <span className={isLoading ? 'opacity-50' : 'opacity-100'}>
//         {children}
//       </span>
//     </button>
//   );
// };

// LoaderButton.propTypes = {
//   isLoading: PropTypes.bool.isRequired,
//   onClick: PropTypes.func,
//   children: PropTypes.node.isRequired,
//   className: PropTypes.string,
// };

// export default LoaderButton;

import React from 'react';
import { Loader } from 'lucide-react'; // Loader icon from lucide-react
import PropTypes from 'prop-types';

const LoaderButton = ({ isLoading, onClick, children, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 ${className}`}
      disabled={isLoading}
      {...props}
    >
{        console.log(isLoading,children)
}      {isLoading ? (
        <Loader className="animate-spin w-6 h-6 text-white absolute left-4" />
      ) : null}
      <span className={isLoading ? 'opacity-50' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

LoaderButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default LoaderButton;

