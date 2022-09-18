import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

export function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}
