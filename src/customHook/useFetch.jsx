import React, { useCallback, useEffect, useState } from "react";

const initialValue = { data: null, error: false, loading: true };
function useFetch(url) {
  const [store, setStore] = useState(initialValue);
  const getTodo = useCallback(async () => {
    try {
      setStore({ data: null, error: false, loading: true });
      const req = await fetch(url);
      if(!req.ok){
        throw new Error(req.statusText + ' ' + req.status)
      }
      const data = await req.json();
      setStore({ data, error: false, loading: false });
    } catch (error) {
      setStore({ data:null, error: error.message, loading: false });
    }
  }, [url]);
  useEffect(() => {
    getTodo();
  }, [getTodo]);
  return store;
  <div className="bg-gradient-to-r  absolute top-0 left-0  w-full h-full rounded  transition-all duration-300">
  <div className="image-info w-full justify-between px-4 pb-2">
    <div className="flex  items-center gap-2">
      <img className="w-[40px] h-[40px] object-cover rounded-[50%]" src={user.profile_image.medium} alt={user.name + 'image'}/>
      <p className="text-white font-bold">{user.name}</p>
    </div>
    <p className="flex gap-2 items-center font-bold text-white"><FcLike/> {likes}</p>
  </div>
  <a className=" image-download   text-white text-3xl" href={links.download} download='true'><BiSolidDownload/></a>
</div>
}

export default useFetch;
