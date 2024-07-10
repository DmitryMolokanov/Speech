import React from 'react'
import { Grid, IconButton, } from '@mui/material';
import { List, Edit, Delete } from '@mui/icons-material';
import { ICollection } from '../types';

interface CollectionBtnGroupProps {
    item: ICollection
    showDetailsCollection: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ICollection) => void
    changeCollection: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ICollection) => void
    deleteCollection: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ICollection) => void
}

const CollectionBtnGroup = ({ item, showDetailsCollection, changeCollection, deleteCollection }: CollectionBtnGroupProps) => {
    return (
        <Grid sx={{ mt: 'auto' }}>
            <IconButton
                color="primary"
                sx={{ m: 1 }}
                onClick={(e) => { showDetailsCollection(e, item) }}
            >
                <List />
            </IconButton>
            <IconButton
                color="primary"
                onClick={(e) => changeCollection(e, item)}
            >
                <Edit />
            </IconButton>
            <IconButton
                color="error"
                sx={{ m: 1 }}
                onClick={(e) => {
                    deleteCollection(e, item);
                }}
            >
                <Delete />
            </IconButton>
        </Grid>
    )
};

export default CollectionBtnGroup
