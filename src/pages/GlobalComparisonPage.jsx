import React from 'react';
import GlobalComparison from '../components/GlobalComparison';
import PageHeading from "../components/PageHeading";

const GlobalComparisonPage = () => {
    return (
        <div className="page-shell">
            <PageHeading
                title="Compare cities"
                subtitle="View current weather, comfort, and air quality for multiple cities side by side."
                eyebrow="City comparison"
            />
            <GlobalComparison />
        </div>
    );
};

export default GlobalComparisonPage;
