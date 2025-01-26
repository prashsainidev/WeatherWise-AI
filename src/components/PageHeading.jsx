import React from 'react';
import '../styles/PageHeading.css'; // We will create this CSS file to handle styling

const PageHeading = ({ title, subtitle }) => {
    return (
        <div className="page-heading">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
};

export default PageHeading;
