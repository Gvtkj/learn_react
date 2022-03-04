import {useState, useEffect} from 'react';

const useFetch = (url) => {
    const [data, setdata] = useState(null); // State
    const [isPending, setIsPending] = useState(true); // State while data is being retrieved
    const [error, setError] = useState(null); 

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal }) // fetches data url passed in
                .then(res => {  // .then executes after data is retrieved and turns the response into json format
                    if(!res.ok) {
                        throw Error('Could not fetch data for that resource');
                    }
                    return res.json();
                })
                .then(data => { // .then executes after previous and takes teh json data as argument and setBlogs inherits the data
                    console.log(data);
                    setdata(data);
                    setIsPending(false);
                    setError(null); // If there is a new request that is successful it gets rid of error mes
                })
                .catch((err) =>{
                    if(err.name === 'AbortError') {
                        console.log('fetch aborted')
                    } else {
                        setIsPending(false); // if error == true then loading component is not rendered
                        setError(err.message);
                    }
                    
                })
            }, 1000);     

            return () => abortCont.abort();

        },[url]) // causes re-render whenever url changes

        return{ data, isPending, error }
}
 
export default useFetch;