import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { IconButton, Menu, MenuItem, Grid, Button, Typography, Box } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { IDefinitions, IMeanings, IWord } from '../types';
import Details from '../components/Details';

interface DetailsCollectionProps {
    detailsCollection: string[]
}

const DetailsCollection = ({ detailsCollection }: DetailsCollectionProps) => {
    const [details, setDetails] = useState<IWord[]>()
    const [info, setInfo] = useState<IMeanings[]>()
    const [curWord, setCurWord] = useState<string>('')
    const [anchorEl, setAnchorEl] = useState<any | null>()
    const navigate = useNavigate()
    const open = Boolean(anchorEl)

    const handlMenuOpen = async (e: any) => {
        const word = e.currentTarget.textContent
        setAnchorEl(e.currentTarget)
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const result = await response.json()
        setDetails(result)
        setCurWord(word)
    }

    const handlMenuClose = () => {
        setAnchorEl(null)
    }

    const showDefinitions = () => {
        details && setInfo(details[0].meanings)
        console.log(info)
        handlMenuClose()
    }



    useEffect(() => {
        console.log(info

        )
    })


    return (
        <div>
            <Header />
            <IconButton sx={{ mt: 1, ml: 2 }} color={'primary'} onClick={() => navigate(-1)}>
                <ArrowBackIos />
            </IconButton>
            <Grid container gap={1} flexDirection={'row'} sx={{ p: 1 }} >
                <Grid container width={'40vw'} flexDirection={'column'} >
                    {detailsCollection.map((word) =>

                        <Button variant='outlined' onClick={(e) => handlMenuOpen(e)}
                            sx={{ maxWidth: '40vw', overflow: 'hidden' }}>{word}
                        </Button>)}

                    <Menu open={open} anchorEl={anchorEl} onClose={() => handlMenuClose()}>
                        <MenuItem onClick={() => showDefinitions()}>Definitions</MenuItem>
                        <MenuItem onClick={() => { }}>Synonyms</MenuItem>
                        <MenuItem >Phonetics</MenuItem>
                    </Menu>
                </Grid >
                <Details info={info} />
            </Grid>
        </div >

    )
};

export default DetailsCollection
