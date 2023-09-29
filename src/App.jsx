import './App.css'
import { BsFillCameraFill } from "react-icons/bs";
import { BiSearchAlt, BiSolidDownload } from "react-icons/bi";
import {FcLike} from 'react-icons/fc'
import useFetch from "./customHook/useFetch";
import Mode from "./components/mode/Mode";
import { useRef, useState } from 'react';

function App() {
  const [url, setUrl] = useState("https://api.unsplash.com/search/photos?client_id=_2cOsVSV-MphyTAOzmUVgK-Ncnw4zbjaz_KVDKD19lE&page=2&query=lion")
  const { data, error, loading } = useFetch(url);
  const input = useRef()
  const searchFetch = (value)=>{
    let newUrl = `https://api.unsplash.com/search/photos?client_id=_2cOsVSV-MphyTAOzmUVgK-Ncnw4zbjaz_KVDKD19lE&page=2&query=${value}`
      setUrl(newUrl)
      input.current.value = ''
  }
  const onSearch =  ()=>{
    const value = input.current.value
    if(value.trim() != ''){
      searchFetch(value)
    }
  }
  const onChange = (e)=>{
    if(e.key == 'Enter' && e.target.value.trim() !== ''){
      searchFetch(e.target.value)
    }
  }
  return (
    <div className="relative">
        <Mode/>
      <div className="container-ms flex justify-between items-center py-8 md:flex-col md:gap-6 sm:py-4">
        <h1 className="flex items-center text-4xl gap-2 md:text-5xl sm:text-3xl">
          <BsFillCameraFill className="text-warning text-4xl" />
          Unsplash Api Demo
        </h1>
        <div>
          <div className="flex gap-2">
            <div className="relative">
              <input
                ref={input}
                type="text"
                placeholder="Search ..."
                className="input input-bordered input-warning w-[270px] max-w-xs sm:input-sm sm:w-[200px]"
                onKeyDown={onChange}
              />
              <BiSearchAlt className="absolute right-3 top-4 text-xl text-warning sm:top-2" />
            </div>
            <button onClick={onSearch} className="btn btn-outline btn-warning sm:btn-sm">Warning</button>
          </div>
        </div>
      </div>
      <div className="w-full h-1 bg-warning rounded-md"></div>
      <div className="container-ms px-8 py-10">
        {loading && (
          <div className="absolute w-full min-h-[100vh] flex justify-center items-center top-0 left-0 bg-black opacity-70 z-50">
            <span className="loading loading-spinner text-warning w-[80px] h-[80px]"></span>
          </div>
        )}
        <ul className="flex flex-wrap justify-center gap-y-6 gap-4">
          {error && <li className='text-4xl mt-6 text-warning sm:text-2xl'>{error + ' Error'}</li>}
          {data &&
            data.results.map((item) => {
              const { urls, id, alt_description, user, likes, links} = item;
              return (
                <li className=" relative drop-shadow-lg rounded" key={id}>
                  <div>
                    <img
                      src={urls.raw}
                      alt={alt_description}
                      className="w-[390px] h-[300px] rounded object-cover"
                      title={alt_description}
                    />
                    <div className="bg-gradient-to-r  absolute top-0 left-0  w-full h-full rounded  transition-all duration-300">
                    </div>
                      <div className="user-info absolute hidden left-0 bottom-0 image-info w-full justify-between px-4 pb-2">
                        <div className="flex items-center gap-2">
                          <img className="w-[40px] h-[40px] object-cover rounded-[50%]" src={user.profile_image.medium} alt={user.name + 'image'}/>
                          <p className="text-white font-bold">{user.name}</p>
                        </div>
                        <p className="flex gap-2 items-center font-bold text-white"><FcLike/> {likes}</p>
                      </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
