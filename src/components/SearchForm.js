import React, { useState } from 'react'
import { Button } from './Button';
import classes from './SearchForm.module.css'

export function SearchForm() {
    const [formData, setFormData] = useState({ search_term: '' });

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return { ...prevFormData, [name]: value }   // key is computed prop
        })
    }



    return (
        <form className={classes.headerCentre}>
            <input
                type="text"
                required
                placeholder="Album or Band name"
                onChange={handleChange}
                name="search_term"
                value={formData.search_term}
            />
            <Button>Search</Button>
        </form>)




}

