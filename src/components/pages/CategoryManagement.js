// src/pages/CategoryManagement.js
import React, { useState } from 'react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = () => {
    if (categoryName.trim() !== '') {
      setCategories([...categories, categoryName]);
      setCategoryName('');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Category Management</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-secondary mb-2">Add Category</h2>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleAddCategory}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Add Category
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-secondary mb-2">List of Categories</h2>
          <ul className="list-disc list-inside">
            {categories.map((category, index) => (
              <li key={index} className="mb-1">
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
