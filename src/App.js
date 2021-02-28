import logo from './assets/SpaceX-Logo.svg';
import './App.css';
import {gql, useQuery} from '@apollo/client';

const PAST_LAUNCHES = gql`
  query GetPastLaunces($numLaunches: Int!) {
    launchesPast(limit: $numLaunches) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
      }
    }
  }
`;

function App() {
    const {loading, error, data} = useQuery(PAST_LAUNCHES, {
        variables: {
            numLaunches: 10,
        },
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Oh no!</p>;
    }

    return (
            <ul>
                <li>
                    <img src={logo} alt="SpaceX" style={{height: 50}}/>
                </li>
                {data.launchesPast.map((launch) => (
                    <li key={launch.mission_name}>
                        <strong>{launch.mission_name}</strong>
                        <ul>
                            <li>
                                Launch Date:{' '}
                                {new Date(launch.launch_date_local).toLocaleDateString()}
                            </li>
                            <li>Rocket: {launch.rocket.rocket_name}</li>
                            <li>Launch Site: {launch.launch_site.site_name_long}</li>
                        </ul>
                    </li>
                ))}
            </ul>
    );
}

export default App;
