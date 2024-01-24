import { useState } from "react";
import useFetchCandidates from "./useFetchCandidates";
import RenderCandidates from "./RenderCandidates";


export default function ShowCandidates({ year, chamber, state, district, onCandidateSelect }) {

    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useFetchCandidates(year, chamber, state, district, setCandidates);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleCandidateClick = (candidate) => {
        onCandidateSelect(candidate);
        setSelectedCandidate(candidate);
        setIsOpen(false);
    };

    return (
        <RenderCandidates
            candidates={candidates}
            selectedCandidate={selectedCandidate}
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            handleCandidateClick={handleCandidateClick}
        />
    );
    
};