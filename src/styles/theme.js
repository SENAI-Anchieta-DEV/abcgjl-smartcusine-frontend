import {createTheme} from "@mui/material/styles"

const theme = createTheme(
    {
        palette:{
            primary: {
                main: "#7996b4",
            },
            secondary:{
                main: "#ff8c42",
            },
        },
    }
);
export default theme;

function App(){
    return(
        <ThemeProvider theme={theme}>
            <button color="secondary"> Botão personalizado </button>
        </ThemeProvider>
    )
}
