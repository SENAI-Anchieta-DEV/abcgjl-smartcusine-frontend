import {createTheme} from "@mui/material/styles"

const theme = createTheme(
    {
        palette:{
            primary: {
                main: "#6e30be",
            },
            secondary:{
                main: "#d1afdf",
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
