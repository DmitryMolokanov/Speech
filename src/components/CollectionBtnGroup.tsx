import React from 'react'
import { Grid, IconButton, } from '@mui/material';
import { List, Edit, Delete } from '@mui/icons-material';

interface CollectionBtnGroupProps {
    item: string[]
    showDetailsCollection: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string[]) => void
    changeCollection: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string[]) => void
    deleteCollection: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string[]) => void
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
