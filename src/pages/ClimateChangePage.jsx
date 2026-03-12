import React from 'react';
import PageHeading from "../components/PageHeading";
import ClimateChange from '../components/ClimateChange';

const ClimateChangePage = () => {
    return (
        <div className="page-shell">
            <PageHeading
                title="Climate trends"
                subtitle="Review short-term temperature, wind, pressure, and visibility data for your selected city."
                eyebrow="Climate Lens"
            />
            <ClimateChange />
        </div>
    );
};

export default ClimateChangePage;
