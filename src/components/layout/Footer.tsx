import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import { Paper } from '@mui/material';
import useAppConfig from '@/hooks/useAppConfig';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
    const appConfig = useAppConfig();
  return  <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
  
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
          <Box sx={{pt:1}} className="signature">
                        <p>{`Francisco Aranda L. <farandal@gmail.com>`}</p>
                        <p>ABZeus Alfwet Model</p>
                        <p>https://abzeus.cl/</p>
                        <p> ver. {appConfig.version}</p> 
                    </Box>
      </BottomNavigation>
    
    </Paper>
}
