import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import DashboardController from '../component/dashboard/Dashboard.controller'
import Header from '../component/layout/header/Header';

function notfound() {
    const router = useRouter();
    const [partner, setpartner] = useState(true);
    const [mentor, setmentor] = useState(false);
    const [pageload, setpageload] = useState(false)
    useRouter
    //useEffect

    useEffect(() => {
        const name = localStorage.getItem('user');
        if (name) {
            console.log('Name exists');
            setpageload(true)
        } else {
            console.log('Name is not found');
            router.push("/");
        }

    }, [])

    return (
        <>
            {pageload ?
                <>
                    <Header />
                </>
                : null}
        </>
    )

}

export default notfound