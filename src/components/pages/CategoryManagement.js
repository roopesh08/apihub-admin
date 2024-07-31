import React, { useState } from 'react';
import axios from 'axios';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [showBadge, setShowBadge] = useState(false);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      if (categoryName.trim() !== '') {
        const response = await axios.post('http://localhost:5000/api/categories', { name: categoryName, desc: categoryDesc });
        console.log('Full Response:', response);
        setCategories([...categories, categoryName, categoryDesc]);
        setCategoryName('');
        setCategoryDesc('');

        // Show badge and hide it after 3 seconds
        setShowBadge(true);
        setTimeout(() => {
          setShowBadge(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
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

          <input
            type="text"
            value={categoryDesc}
            onChange={(e) => setCategoryDesc(e.target.value)}
            placeholder="Category Description"
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleAddCategory}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Add Category
          </button>
          {showBadge && (
            <div className="mt-2 text-green-500 font-bold">
              Category added successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
