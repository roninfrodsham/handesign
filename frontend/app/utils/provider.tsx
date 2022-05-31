import React, {createContext} from 'react';

export const EnvContext = createContext({});

function EnvProvider(props: any) {

  return <EnvContext.Provider value={{apiHost: props.API_HOST}} {...props} />
}

export {EnvProvider};