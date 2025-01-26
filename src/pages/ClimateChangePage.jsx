import React from 'react';
import PageHeading from "../components/PageHeading"; // Import the PageHeading component
import ClimateChange from '../components/ClimateChange';

const ClimateChangePage = () => {
    return (
        <div>
            <PageHeading
                title="Climate Change Insights"
                subtitle="Explore the latest data and trends on global climate change and its impact on weather patterns."
            />
            <ClimateChange />
        </div>
    );
};

export default ClimateChangePage;
