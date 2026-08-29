'use client'

import { Input } from "@base-ui/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function SearchBox() {
    const [search, setsearch] = useState('')
    const [debouncedSearch, setdebouncedSearch] = useState('')
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            setdebouncedSearch(search)
        }, 500)
        return () => clearTimeout(timer)
    },[search])
    useEffect(()=>{
        if(debouncedSearch.trim()){
            router.push(`/?search=${debouncedSearch.trim()}`)
        }   else{
            router.push('/')
        }
    },[debouncedSearch,router])

    return (
        <>
            <input type="text"
                placeholder="記事を検索"
                className="w-200px lg:w-300px"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
            />
        </>
    )
}
