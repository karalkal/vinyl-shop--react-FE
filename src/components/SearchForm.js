import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from './Button';
import styles from './SearchForm.module.css'

export function SearchForm() {
    const [formData, setFormData] = useState({ search_term: '' });
    const navigate = useNavigate()

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return { ...prevFormData, [name]: value }   // key is computed prop
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        setFormData({ search_term: '' });
        navigate({
            pathname: '/search',
            search: `?term=${formData.search_term}`,
        });

    }



    return (
        <form onSubmit={handleSubmit} className={styles.headerCentre}>
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

