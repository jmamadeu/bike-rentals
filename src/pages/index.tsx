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
      <h1>Bike Rentals</h1>
      <p>Rent or cancel you rent for any bike anytime</p>
    </Menu>
  </div>
);

export default Home;
