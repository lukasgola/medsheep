import * as React from 'react';

export const DataContext = React.createContext({
    data: {
        id: 'id',
        product: {}
    },
    setData: () => {}
});

export const DataProvider = (props) => {

    const [data, setData] = React.useState({})
    

    const dataObject = {
        data,
        setData: setData
    }

  return (
        <DataContext.Provider value={dataObject}>
            {props.children}
        </DataContext.Provider>
    );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useData = () => React.useContext(DataContext);