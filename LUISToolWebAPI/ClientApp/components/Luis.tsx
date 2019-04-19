import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface LuisExampleState {
    LuisApps: LuisApp[];
    loading: boolean;
    Data: Object
}

export class Luis extends React.Component<RouteComponentProps<{}>, LuisExampleState> {
    constructor() {
        super();
        this.state = { LuisApps: [], loading: true, Data: Object }; 
    }

    

    componentDidMount()
    {
        fetch('api/LuisAppService')
        .then(response => response.json() as Promise<LuisApp[]>)
        .then(data => {
            this.setState({
                Data: data
            })
        });
    }

    render() {


        return <div>
            <h1>LUIS Applications</h1>
            <p>This component demonstrates fetching data from the server.</p>
           
        </div>;
    }

    
}

interface LuisApp {
    Id: string;
    Name: string;
    VersionsCount: number;
    EndpointHitsCount: number        
}
