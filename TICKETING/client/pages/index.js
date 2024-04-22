import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  // axios.get('/api/users/currentuser').catch((err) => {
  //   console.log(err.message);
  //});

  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
