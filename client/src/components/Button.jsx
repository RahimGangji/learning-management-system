import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, styleContainer, onClick }) => {
    return (
        <button
            className={`btn bg-[#6d28d2] border-0 text-white hover:bg-[#7b09ed] px-6 py-0 my-0 text-[16px] ${styleContainer}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    styleContainer: PropTypes.string,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    styleContainer: "",
    onClick: () => {},
};

export default Button;
