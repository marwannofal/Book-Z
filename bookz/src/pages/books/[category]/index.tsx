// pages/categories/[category].tsx
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";
import Loading from "@/components/loading";

interface Item {
  id: string;
  name: string;
  description: string;
}

interface CategoryPageProps {
  category: string;
  items: Item[];
}

// Dummy data to use in case of an error
const dummyItems: Item[] = [
  { id: "1", name: "Dummy Item 1", description: "This is a dummy item." },
  { id: "2", name: "Dummy Item 2", description: "This is another dummy item." },
];

const CategoryPage: NextPage<CategoryPageProps> = ({ category, items }) => {
  const router = useRouter();

  // Handle the case where the page might be accessed with a wrong category or no data
  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Category: {category}</h1>

      {items.length === 0 ? (
        <p>No items found in this category.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold">{item.name}</h2>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.params as { category: string };

  try {
    // Replace with your actual API endpoint
    const response = await axios.get(
      `https://api.example.com/categories/${category}`
    );
    const items: Item[] = response.data;

    return {
      props: {
        category,
        items,
      },
    };
  } catch (error) {
    // Return dummy data on error
    return {
      props: {
        category,
        items: dummyItems,
      },
    };
  }
};

export default CategoryPage;
