'use client'
import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({placeholder}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Input
        aria-label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
        isClearable
        placeholder={placeholder}
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '$gray100',
          borderRadius: '$lg',
          boxShadow: '$sm',
          paddingRight: '30px',
        }}
      />
      <FaSearch
        style={{
          position: 'absolute',
          left: '1020px',
          right:'',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />

    </div>
  );
};

export default SearchBar;
