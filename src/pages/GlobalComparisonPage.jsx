import React from 'react';
import GlobalComparison from '../components/GlobalComparison';
import PageHeading from "../components/PageHeading";

const GlobalComparisonPage = () => {
    return (
        <div>
            <PageHeading
                title="Global Weather Comparison"
                subtitle="Compare weather conditions of cities worldwide with just a few clicks!"
            />
            <GlobalComparison />
        </div>
    );
};

export default GlobalComparisonPage;
