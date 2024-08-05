import { useEffect, useState } from "react";

export default function useLocalStorage() {
    const [backUp,setBackUp] = useState(null);
    const [timer,setTimer] = useState<any>(null);

    useEffect(() => {
        const localBackUp = localStorage.getItem('readme-backup');
        if(localBackUp){
            setBackUp(JSON.parse(localBackUp));
        }
    },[])

    const saveBackUp = (templates:any) => {
        try {
            if(timer){
                clearInterval(timer);
            }

            setTimer(
                setInterval(() => {
                    localStorage.setItem('readme-backup',JSON.stringify(templates));
                },1000)
            )
        } catch (error) {
            console.log('error in use-local-backup',error);
        }
    }

    const deleteBackUp = () => {
        try {
            localStorage.removeItem('readme-backup');
        } catch (error) {
            console.log('error in use-local-backup',error);
        }
    }

    return {
        saveBackUp,
        deleteBackUp,
        backUp
    };
}