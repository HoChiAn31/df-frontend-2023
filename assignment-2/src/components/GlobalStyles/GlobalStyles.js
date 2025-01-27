import React from 'react';
import PropTypes from 'prop-types';
import './GlobalStyles.module.scss';

function GlobalStyles({ children }) {
    return React.Children.only(children);
}
GlobalStyles.protoTypes = {
    children: PropTypes.node.isRequired,
};
export default GlobalStyles;
