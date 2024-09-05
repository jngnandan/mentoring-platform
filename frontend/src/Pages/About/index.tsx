import React, { useEffect, useState, useContext } from 'react';
import { Card, Image, Text, Badge, Button, Loader } from '@mantine/core';
import { ContentContext } from '../../context/ContentContext.tsx';
import supabase from '../../supabaseClient'; // Note: No need for .js extension


function About() {
  const { compareProducts, setCompareProducts } = useContext(ContentContext);
  const [products, setProducts] = useState([]);
  const [supabaseProducts, setSupabaseProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSupabaseLoading, setIsSupabaseLoading] = useState(true);
  const [isSupabaseError, setIsSupabaseError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:9000/store/products', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products, status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched products:', data);

        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchSupabaseProducts = async () => {
      setIsSupabaseLoading(true);

      try {
        const { data, error } = await supabase
          .from('products') // Make sure to match the table name
          .select('*');

        if (error) {
          throw new Error(`Failed to fetch Supabase products: ${error.message}`);
        }

        console.log('Fetched Supabase products:', data);

        if (Array.isArray(data)) {
          setSupabaseProducts(data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching Supabase products:', error);
        setIsSupabaseError(true);
      } finally {
        setIsSupabaseLoading(false);
      }
    };

    fetchSupabaseProducts();
  }, []);

  return (
    <div className="mx-4 mt-10">
      <Card withBorder radius="md" className="py-8 px-6">
        <Text size="xl" fw={600} className="text-center pb-10">
          About
        </Text>
        <Text>
          Welcome to [Your Company Name], where innovation meets excellence. Since our inception in [year], we've been on a
          mission to [briefly describe your company's mission]. Our commitment to quality and customer satisfaction drives
          everything we do.
        </Text>
      </Card>

      <Card withBorder radius="md" className="py-8 px-6 mt-10">
        <Text size="xl" fw={600} className="text-center pb-10">
          Products from API
        </Text>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader color="gray" />
          </div>
        ) : isError ? (
          <div className="text-center">
            <Text color="red">Error loading products!</Text>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center">
            <Text>No products available.</Text>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card key={product.id} shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col">
                <Card.Section>
                  <Image
                    src={product.thumbnail}
                    height={160}
                    alt={product.title}
                  />
                </Card.Section>

                <div className="flex justify-between mt-2 mb-2">
                  <Text fw={500} className="truncate">{product.title}</Text>
                  <Badge color="pink">On Sale</Badge>
                </div>

                <Text size="sm" className="text-gray-500 line-clamp-2">
                  {product.description}
                </Text>

                <Text className="mt-2">
                  Price: {product.variants[0].prices[0].amount / 100} {product.variants[0].prices[0].currency_code.toUpperCase()}
                </Text>

                <Button
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => {
                    setCompareProducts([...compareProducts, product]);
                  }}
                >
                  Add to Compare
                </Button>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* New Section for Supabase Products */}
      <Card withBorder radius="md" className="py-8 px-6 mt-10">
        <Text size="xl" fw={600} className="text-center pb-10">
          Products from Supabase
        </Text>
        {isSupabaseLoading ? (
          <div className="flex justify-center items-center">
            <Loader color="gray" />
          </div>
        ) : isSupabaseError ? (
          <div className="text-center">
            <Text color="red">Error loading Supabase products!</Text>
          </div>
        ) : supabaseProducts.length === 0 ? (
          <div className="text-center">
            <Text>No Supabase products available.</Text>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {supabaseProducts.map((product) => (
              <Card key={product.id} shadow="sm" padding="lg" radius="md" withBorder className="flex flex-col">
                <Card.Section>
                  <Image
                    src={product.thumbnail}
                    height={160}
                    alt={product.title}
                  />
                </Card.Section>

                <div className="flex justify-between mt-2 mb-2">
                  <Text fw={500} className="truncate">{product.title}</Text>
                  <Badge color="pink">On Sale</Badge>
                </div>

                <Text size="sm" className="text-gray-500 line-clamp-2">
                  {product.description}
                </Text>

                <Text className="mt-2">
                  Price: {product.variants[0].prices[0].amount / 100} {product.variants[0].prices[0].currency_code.toUpperCase()}
                </Text>

                <Button
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => {
                    setCompareProducts([...compareProducts, product]);
                  }}
                >
                  Add to Compare
                </Button>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default About;