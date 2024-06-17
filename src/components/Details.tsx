import React from 'react'
import { Grid, Typography, Box } from '@mui/material';
import { IMeanings } from '../types';

interface DetailsProps {
    info?: IMeanings[]
}


const Details = ({ info }: DetailsProps) => {
    return (
        <div>
            {info ? <Grid width={'50vw'} border={'1px solid'} borderRadius={5} borderColor={"lightGray"}>
                {
                    info.map((item: IMeanings) => {
                        return (
                            <Grid container display={'flex'} alignItems={'center'} flexDirection={'column'}>
                                <Typography color={'#363a40'}><strong>{item.partOfSpeech}</strong></Typography>
                                {item.definitions.map((definition) => {
                                    return (<Box padding={1} width={'91%'} sx={{ borderTop: '1px solid lightGray' }}>
                                        <Typography color={'#27292b'}>{definition.definition}</Typography>
                                    </Box>)
                                })}
                            </Grid>)
                    })
                }
            </Grid> : null}

        </div>)

};

export default Details
