import type { NextPage } from 'next';
import Head from 'next/head';
import { Menu } from '../components/menu';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Bike Rentals</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Menu>
      <h1>teste</h1>
    </Menu>
  </div>
);

export default Home;