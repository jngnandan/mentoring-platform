// import React, { useState, useEffect } from 'react';
// import { Container, Paper, Text, Select, Loader, Grid } from '@mantine/core';

// // Sample product data
// const products = [
//   { id: 1, name: 'Product 1', category: 'Category 1', price: 20 },
//   { id: 2, name: 'Product 2', category: 'Category 2', price: 30 },
//   { id: 3, name: 'Product 3', category: 'Category 1', price: 25 },
//   // Add more products here
// ];

// function CatelogPage() {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [filteredProducts, setFilteredProducts] = useState(products);
//   const [loading, setLoading] = useState(true);

//   // Simulate fetching product data from an API
//   useEffect(() => {
//     // In a real application, you would make an API request here
//     setTimeout(() => {
//       setFilteredProducts(products);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // Handle category filter changes
//   const handleCategoryChange = (event) => {
//     const category = event.target.value;
//     if (category === 'All') {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter((product) => product.category === category);
//       setFilteredProducts(filtered);
//     }
//     setSelectedCategory(category);
//   };

//   return (
//     <Container size="md">
//       <Text align="center" size="xl" weight={700} style={{ marginBottom: '20px' }}>
//         Product Catalog
//       </Text>
//       <Paper padding="md" shadow="xs">
//         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//           <Text size="sm" style={{ marginRight: '10px' }}>
//             Filter by Category:
//           </Text>
//           <Select id="category" value={selectedCategory} onChange={handleCategoryChange}>
//             <option value="All">All</option>
//             <option value="Category1">Category 1</option>
//             <option value="Category2">Category 2</option>
//             {/* Add more category options */}
//           </Select>
//         </div>
//         {loading ? (
//           <div style={{ display: 'flex', justifyContent: 'center' }}>
//             <Loader size="xl" />
//           </div>
//         ) : (
//           <Grid gutter="md" cols={3}>
//             {filteredProducts.map((product) => (
//               <Paper key={product.id} padding="sm">
//                 <Text size="lg" weight={700}>
//                   {product.name}
//                 </Text>
//                 <Text size="sm" style={{ marginTop: '5px' }}>
//                   Category: {product.category}
//                 </Text>
//                 <Text size="sm" style={{ marginTop: '5px' }}>
//                   Price: ${product.price}
//                 </Text>
//                 {/* You can add more product details here */}
//               </Paper>
//             ))}
//           </Grid>
//         )}
//       </Paper>
//     </Container>
//   );
// }

// export default CatelogPage;
