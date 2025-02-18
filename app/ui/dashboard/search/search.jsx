"use client";

import { MdSearch } from "react-icons/md"
import styles from "./search.module.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({placeholder}) {
    //Step 1
    const searchParams = useSearchParams();

    //Step 2
    const pathname = usePathname();
    const { replace } = useRouter(); // !!! import should be from "next/navigation"
    
    const handleChangeSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParams);

        if(e.target.value) {
            e.target.value.length > 2 && params.set("q", e.target.value);
            e.target.value.length > 2 && params.set("page", 1);
        } else {
            params.delete("q")
        }
        replace(`${pathname}?${params}`);
    }, 300);

    return (
        <div className={styles.container}>
            <MdSearch />
            <input type="text" placeholder={placeholder} className={styles.input} onChange={handleChangeSearch} />
        </div>
    )
}
