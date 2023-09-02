import React from 'react';
import { Flex, Box, Grid, GridItem, Text } from '@chakra-ui/react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {

  return (
      <Flex direction="column" align="center" w="100vw" h="100vh" backgroundColor="#f0eded">
        <Header />
        <Body />
        <Footer />
      </Flex>
  );
}

export default App;
