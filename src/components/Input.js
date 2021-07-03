import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    /** value of the input feild */
    value: PropTypes.string,
    /** Placeholder text for input feild */
    placeholder: PropTypes.string,
    /** Label for the input feild */
    label: PropTypes.string,
    /** id for the input */
    id: PropTypes.string,
    /** A function to be called on input change */
    handleChange: PropTypes.func,
}

const defaultProps = {
    value: '',
    placeholder: 'Select',
    label: "",
}

const Input = (props) => {
    const {label, id, value, placeholder, handleChange} = props;
    return (
        <div className="form-item">
            {label && <label htmlFor={id} className="form-label">{label}</label>}
            <input className="form-input" placeholder={placeholder} value={value} id={id} onChange={handleChange} />
        </div>
    )
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;