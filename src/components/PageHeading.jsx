import React from 'react';
import '../styles/PageHeading.css';

const PageHeading = ({ title, subtitle, eyebrow }) => {
    return (
        <div className="page-heading">
            {eyebrow && <span className="page-heading-eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
};

export default PageHeading;
