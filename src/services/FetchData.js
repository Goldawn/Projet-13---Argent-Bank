import {useState, useEffect} from 'react';

/**
 * Custom Hook to recover data
 * @param { String } url - the API url
 * @returns { Object | Boolean } data, isDataLoading, error
*/

const FetchData = (url, method, payload) => {

    console.log("entrée dans fetchData", url, method, payload)

    const baseURL = "http://localhost:3001/api/v1/"
    const requestURL = baseURL + url;
    console.log(requestURL)
    
    const [data, setData] = useState({});
    const [isDataLoading, setDataLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {	

        setDataLoading(true);
        async function fetchFonction() {
            setDataLoading(true);
            console.log("entrée dans le useEffect")
            try {
                const response = await fetch(requestURL, { method: method, body: payload});
                const data = await response.json();
                console.log(data)
                setData(data);
            } catch (err) {
                setError(true);
            } finally {
                setDataLoading(false);
            }
        }
        fetchFonction();
        
    }, [requestURL, method, payload]);

    return { data, isDataLoading, error };

};

export default FetchData;

