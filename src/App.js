import './App.css';
import {useState,useEffect , useRef} from 'react'
import {createApi }from 'unsplash-js'
const unsplash = createApi({
  accessKey: 'k5wTgYPOjAtdefL11keDsHWNSjFl4dHCsvDBwOsZ8G0',
});
function App() {
  const [input,setInput]=useState('')
  const [photo,setPhoto]=useState([])
  const [isfetch,setFetching]=useState(false)
  const usePhoto = useRef(photo)
  const useInput = useRef(input)
  const useFetch = useRef(isfetch)
  function getUnsplashImage(query , page = 1) {
    setFetching(true)
    useFetch.current=true
    return new Promise((resolve, reject) => {
      unsplash.search.getPhotos(   {
        query,
        page ,
        perPage:20,
      }).then(result => {
      setFetching(false)
      useFetch.current=false


        resolve(result.response.results
          .map(result => result.urls.regular))
      })
    })
  }
  useEffect(() => {
    useInput.current=input;
    if(input !== ''){
      setTimeout(function(){
        setPhoto([]);
        getUnsplashImage(input , 1 )
        .then(photos => {
          setPhoto(photos)           
          usePhoto.current = photos
        }) 
        }, 3000);
      }
  },[input])
  // function handleScrooling(event){
  //   const {scroolHeight , scroolTop , clientHeight} = event.target.scrolligElement;
  //   const isBottom = scroolHeight - scroolTop <= clientHeight;
  //   if(isBottom && !isfetch.current){
  //     getUnsplashImage(useInput.current , usePhoto.current.length / 6  +1 )
  //     .then(newImages =>{
  //       usePhoto.current= [...usePhoto.current , ...newImages ]
  //       setPhoto(usePhoto.current)
  //     })  
  //   }
  // }
  // useEffect(() => {
  //     document.addEventListener('scroll', handleScrooling , {passive:true})
      
  //     return () =>  document.removeEventListener('scroll', handleScrooling)
  // },[])

  return (
    <div className="App">
      <h1>
      Search For Photos Here:<h1 />
    <input 
    type="text" 
    name="name" 
    placeholder='research '
    value={input} 
    onChange={e => setInput(e.target.value)}
    />
  </h1>
   <div>
   { photo.length > 0 && photo.map(image =>(
      <img  width="500px" height="500px" src={image} />
    ))}
   </div>

    <div>
    {isfetch && 'please wait ,fetching'}

    </div>
    </div>
  );
}

export default App;
