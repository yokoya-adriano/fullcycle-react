import { Typography } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme'
import { Routes, Route, Link } from "react-router-dom"

const Home = () => {
    return (
        <Box>
            <Typography variant="h3" component="h1">
                Home
            </Typography>
        </Box>
    )
}

const About = () => {
    return (
        <Box>
            <Typography variant="h3" component="h1">
                About
            </Typography>
        </Box>
    )
}

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <Box
                component="main"
                sx={{
                    height: '100vh',
                    backgroundColor: (theme) => theme.palette.grey[900]
                }}
            >
                <Header />
                <Layout>
                    <h1>Welcome to react Router</h1>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Layout>
            </Box>
        </ThemeProvider>
    )
}

export default App;
