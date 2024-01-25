"use client";
import { Box, Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useRouter } from "next/navigation";
import { centralize } from "./login/page";

export default function App() {
    const router = useRouter();

    const handleGoLogin = () => {
        router.push("/login");
    };

    const handleGoCreateUser = () => {
        router.push("/create-user");
    };

    return (
        <Box>
            <Grid2 container spacing={2}>
                <Grid2
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={centralize()}
                >
                    <Typography variant="h1">Home</Typography>
                </Grid2>
                <Grid2
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={centralize()}
                >
                    <Button variant="contained" onClick={handleGoLogin}>
                        Entrar com minha conta
                    </Button>
                </Grid2>
                <Grid2
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={centralize()}
                >
                    <Button variant="contained" onClick={handleGoCreateUser}>
                        Criar uma conta
                    </Button>
                </Grid2>
            </Grid2>
        </Box>
    );
}
