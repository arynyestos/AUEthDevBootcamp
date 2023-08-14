import React from 'react';
import { Flex, Box, Grid, GridItem, Text } from '@chakra-ui/react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
  return (
    <Box w="100vw" direction="column" align="center" justify="center" height="100vh" justifyContent="center" backgroundColor="#f0eded">
      <Flex direction="column" align="center" justify="center" height="100vh" justifyContent="center">
        <Header />
        <Body />
        <Footer />
      </Flex>
    </Box>
  );
}

export default App;
