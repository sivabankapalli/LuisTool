import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Luis } from './Luis';

interface FetchDataExampleState {
    forecasts: LuisApp[];
    loading: boolean;
}

interface LuisApp {
    id: string;
    name: string;
    VersionsCount: number;
    EndpointHitsCount: number        
}

export class FetchData extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
    constructor() {
        super();
        this.state = { forecasts: [], loading: true };

        fetch('api/LuisAppService')
            .then(response => response.json() as Promise<LuisApp[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);

        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            { contents }
        </div>;
    }

    private static renderForecastsTable(forecasts: LuisApp[]) {
        return <div><table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>

            {forecasts.map((forecast,index) =>
                    <tr key={index}>
                        <td>{forecast.id}</td>
                        <td>{forecast.name}</td>
                </tr>
            )}
            </tbody>
        </table></div>;
    }
}

interface WeatherForecast {
    CreateddateTime: string;
    Culture: string;
    Description: string;
    Domain: string;
    EndPointHitsCount: number;
    id: string;
    name: string;
    UsageScenario: string;
    VersionCount: number;
}
