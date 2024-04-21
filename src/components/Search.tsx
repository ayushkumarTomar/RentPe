import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Search() {

    const navigator = useNavigate()

    const [search , setSearch] = useState("")
    

    const submitHandler = ()=>{
        navigator(`/search/${search}`)
    }


    return (<>
    <form
      onSubmit={submitHandler}
      className="flex items-center bg-black/[0.075] px-3 rounded-full text-sm transition"
    >
      <input
        className="w-full py-2 px-3 bg-transparent focus:outline-none"
        type="search"
        value={search}
        placeholder="Search Glasses"
        onChange={(e)=>setSearch(e.target.value)}
      />
      <button type="submit" className="cursor-pointer" onClick={submitHandler}>
        <CiSearch />
      </button>
    </form>
</>)
}

export default Search