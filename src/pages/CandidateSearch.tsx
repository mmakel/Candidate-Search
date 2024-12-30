import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchResultsUser, setSearchResultsUser] = useState<any[]>([]);
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);

  console.log(searchResults);

  useEffect(() => {
    const search = async () => {
      const results = await searchGithubUser(searchTerm);
      setSearchResultsUser(results);
      const generalResults = await searchGithub();
      setSearchResults(generalResults);
    };

    if (triggerSearch) {
      search();
      setTriggerSearch(false);
    }
  }, [triggerSearch, searchTerm]);

  const handleSearch = () => {
    setTriggerSearch(true);
  };

  return (
    <div>
      <h1>CandidateSearch</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResultsUser.map((user: any, index: number) => (
          <li key={index}>{user.login}</li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;