import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ErrorIcon, SuccessIcon } from 'assets/images/icons';
import Chip from '@mui/material/Chip';
import { languagesList } from 'helpers/languages';

import style from './style.scss';
const iconSize = 15;

const MissingLanguages = ({ t, missingLanguages, onAdd }) => {
    return (
        <Box className={style.container}>
            {missingLanguages.length > 0 ? (
                <Box className={style.iconContainer}>
                    <ErrorIcon height={iconSize} width={iconSize} />
                </Box>
            ) : (
                <Box className={style.iconContainer}>
                    <SuccessIcon height={iconSize} width={iconSize} />
                </Box>
            )}
            <Typography className={style.label}>
                {t('translation.missing_translates')}:
            </Typography>
            <Typography className={style.items}>
                {missingLanguages.length > 0
                    ? missingLanguages.map((i) => {
                          return (
                              <Chip
                                  className={style.item}
                                  size="small"
                                  key={i}
                                  color="primary"
                                  label={
                                      <>
                                          <span>{i}</span>
                                          <span className={style.nativeName}>
                                              (
                                              {
                                                  languagesList.find(
                                                      (item) => item.id === i,
                                                  )?.nativeName
                                              }
                                              )
                                          </span>
                                      </>
                                  }
                                  onClick={() => onAdd({ language: i })}
                              ></Chip>
                          );
                      })
                    : t('translation.all_translated')}
            </Typography>
        </Box>
    );
};

export default MissingLanguages;
