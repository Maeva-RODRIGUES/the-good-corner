//frontend/src/components/Home.tsx

import ListAds from './ListAds';

function Home() {
  return (
    <main
      style={{
        padding: '20px',
        backgroundColor: 'red',
        color: 'white',
        width: '100%', 
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1>Home</h1>
      {/* enfant */}
      <ListAds /> 
    </main>
  );
}

export default Home;
